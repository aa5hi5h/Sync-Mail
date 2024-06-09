import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/utils/auth";
import {google} from "googleapis"
import { threadId } from "worker_threads";

async function getMessageDetails(gmail:any,messageId:string) {
    try{
        const message = await gmail.users.messages.get({userId:"me",id:messageId})
        const {payload} = message.data

        const header = payload.headers
        const subjectHeader = header.find((header:any) => header.name === "Subject")
        const fromHeader = header.find((header:any) => header.name === "From")

        const subject = subjectHeader ? subjectHeader.value : "Nill"
        const from = fromHeader ? fromHeader.value : "Gmail User"

        const body = getBody(payload)
        const {text,html} = separateHTMLandText(body)
        const content = formatEmail(text)

        return {
            id:messageId,
            subject,
            from,
            body:{
                text:content,
                html
            }
        }
    }catch(error){
        console.log(`failed to fetch message details for the ${messageId}`,error)
        return null
    }
    
}

function getBody(payload: any): string {
    if (!payload) return ''; 

    if (payload.parts) {
      return payload.parts.reduce((accumulatedBody: string, part: any) => {
        if (part.parts) {
          return accumulatedBody + getBody(part);
        }
        if (part.mimeType === 'text/plain' || part.mimeType === 'text/html') {
          return accumulatedBody + decodeBase64(part.body.data);
        }
        return accumulatedBody;
      }, '');
    }
  
    if (payload.body && payload.body.data) {
      return decodeBase64(payload.body.data);
    }
  
    return '';
  }
  
  // Helper function to decode base64
  function decodeBase64(data: string): string {
    return Buffer.from(data, 'base64').toString('utf-8');
  }

  //separates the html and text part 

  function separateHTMLandText(body: string): { text: string, html: string } {
    const htmlIndex = body.indexOf('<!DOCTYPE html PUBLIC');
    const text = htmlIndex !== -1 ? body.slice(0, htmlIndex) : body;
    const html = htmlIndex !== -1 ? body.slice(htmlIndex) : '';
    return { text, html };
}

//format the email so to maintain the readability

function formatEmail(content: string): string {
    const removeConsecutiveEmptyLines = content.replace(/\n{2,}/g, '\n');
    const normalizeLineBreaks = removeConsecutiveEmptyLines.replace(/\r\n|\r|\n/g, '\n');
    const addLineBreaks = normalizeLineBreaks.replace(/(.{12,})/g, '$1\n');
    return addLineBreaks;
}


export async function GET(req:any){
    try{
    
    const session = await getServerSession(authOptions)

    if(!session?.user || !session.user.email){
        return new Response("Unauthorized",{status:400})
    }
    const email = session.user.email

    const {accessToken,refreshToken} = session.user

    console.log("Accesstoken",accessToken)
    console.log("RefreshTOken",refreshToken)

    const OAuth2Client = new google.auth.OAuth2()
    OAuth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken
    })


    const now = Date.now() 

    const expiryTimestamp = OAuth2Client.credentials.expiry_date

    if(expiryTimestamp){
    const isAccessTokenExpired = now >= expiryTimestamp

    if (isAccessTokenExpired) {
        const tokens = await OAuth2Client.refreshAccessToken();
        OAuth2Client.setCredentials(tokens.credentials);
    }
    }


    const gmail = google.gmail({version:"v1",auth:OAuth2Client})

    const limit = 15

    const response = await gmail.users.messages.list({
        userId:"me",
        maxResults: limit
    }) 
    console.log(response)
    console.log(response.data)

    const emails = response.data.messages || []

    console.log("emails list",emails)
    const messageIds = emails.map((msg:any) => msg.id)
    const message = await Promise.all(messageIds.map((id:string) => getMessageDetails(gmail,id)))

    return new Response(JSON.stringify(message.filter((msg:any) => msg !== null )),{status:200})

}catch(error){
    console.log(error)
    console.log("BetIchod")
    
    return new Response("SOMETHING WENT WRONG",{status:500})

}   
}