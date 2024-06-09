
import  OpenAI  from "openai"

export interface ClassifyEmailsProp{
    id: string
    subject: string
    from: string
    body: {
      text: string,
      html: string
    }
}

export interface classifyLabelsProp extends ClassifyEmailsProp{
    label: string
}[]

let localApiKeys

if(typeof window !== "undefined"){
     localApiKeys = localStorage.getItem("OpenAi_key")
     console.log("MY Local api key",localApiKeys)
}


const openai = new OpenAI({
    apiKey: localApiKeys ?? process.env.NEXT_PUBLIC_OPENAI_KEY,
    dangerouslyAllowBrowser: true
})

console.log("acess toekn",process.env.NEXT_PUBLIC_OPENAI_KEY)

export async function ClassifyEmails(emails:ClassifyEmailsProp[]){

    const classifyLabels: classifyLabelsProp[] = []

    console.log(emails)

    await Promise.all(
        emails.map(async(email:ClassifyEmailsProp) => {
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                  {
                    role: "user",
                    content: `Judging from the subject line and the body of this email, classify this email:\n\n${email.subject}\n\n${email.body.text}\n\nGive answer labeled as:\n\n
                    "Important: Emails that are personal or work-related and require immediate attention."\n\n
                    "Promotion: Emails related to sales, discounts, and marketing campaigns."\n\n
                    "Social: Emails from social networks, friends, and family."\n\n
                    "Marketing: Emails related to marketing, newsletters, and notifications."\n\n
                    "Spam: Unwanted or unsolicited emails."\n\n
                    "General: If none of the above are matched, use General"\n\n
                    Give one word (important, promotion, social, marketing, spam, or general) answer from these options only and ignore the dash lines in the body.`,
                  },
                ],
                max_tokens: 1,
                temperature: 1,
                stop: ["\n"],
              })
              const label = response.choices[0].message.content
              console.log(label)
              
              
                classifyLabels.push({label: label ?? "General",subject:email.subject,id:email.id,from:email.from,body:email.body})
              
            })
        )

        return classifyLabels
}