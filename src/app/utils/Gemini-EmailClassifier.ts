import axios from "axios";
import {GoogleGenerativeAI} from "@google/generative-ai"

export interface ClassifyEmailsProp {
    id: string;
    subject: string;
    from: string;
    body: {
        text:string,
        html:string
    }
}

export interface classifyLabelsProp extends ClassifyEmailsProp {
    label: string;
}

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? "";

const genAI = new GoogleGenerativeAI(apiKey);

if (!apiKey) {
    throw new Error("Google API key is missing");
}

const geminiEndpoint = "https://genai.googleapis.com/v1/models/text-bison-001:generateText";

export async function ClassifyEmailsGemini(emails: ClassifyEmailsProp[]) {
    const classifyLabels: classifyLabelsProp[] = [];

    await Promise.all(
        emails.map(async (email: ClassifyEmailsProp) => {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

            const prompt = `Judging from the subject line of the  email, classify this email:\n\n${email.subject}\n\nGive answer labeled as:\n\n
                        "Important: Emails that are personal or work-related and require immediate attention."\n\n
                        "Promotion: Emails related to sales, discounts, and marketing campaigns."\n\n
                        "Social: Emails from social networks, friends, and family."\n\n
                        "Marketing: Emails related to marketing, newsletters, and notifications."\n\n
                        "Spam: Unwanted or unsolicited emails."\n\n
                        "General: If none of the above are matched, use General"\n\n
                        Give one word (important, promotion, social, marketing, spam, or general) answer from these options only and ignore the dash lines in the body.`
               
                        const result = await model.generateContent(prompt);
                        const text =  result.response.text()
                        console.log(text);
            

            const label = text
            classifyLabels.push({ label: label ?? "General", subject: email.subject, id: email.id, from: email.from, body: email.body });
        })
    );

    return classifyLabels;
}