"use client"
import { ChevronDown, MailCheck } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import { Slider } from "./ui/slider"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useToast } from "./ui/use-toast"
import { ClassifyEmails } from "@/app/utils/EmailClassifier"
import { ClassifyEmailsGemini } from "@/app/utils/Gemini-EmailClassifier"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"

type email = {
    id: string
    subject: string
    from: string
    body: {
        text: string
        html : string
    }
}

type labelEmails = {
    id: string
    subject: string
    from: string
    body: {
        text: string,
        html:string
    }
    label: string
}

const MainSection = () => {

    const [isOpen,setIsOpen] = useState<boolean>(false)
    const [input,setInput] = useState<number[]>([15])
    const [emails,setEmails] = useState<email[]>([])
    const [labeledEmails,setLabeledEmails] = useState<labelEmails[]>([])

    const router = useRouter()
    const {toast} = useToast()

    const InputToggle = () => {
        return setIsOpen((current) => !current)
    }
    const handleSliderChange = (value:number[]) => {
        setInput(value)
    }

    const {mutate:GetMails,isPending} = useMutation({
        mutationFn : async() => {
            const {data} = await axios.get("/api/getMails")
            console.log(data)
            return data
        },
        onError: (error) =>{
            console.log(error)
            toast({
                variant:"destructive",
                title:"Error",
                description:"Please SignOut and login again"
            })
        },
        onSuccess: (data) => {
            setEmails(data)
            setIsOpen(false)
            router.refresh()
            toast({
                title:"Sucess"
            })
        }
    })

    const handleClassified = async (emails: email[]) => {
        const maxRetries = 7;
        let retries = 0;
        let data = null;
      // so that it can handle multiple request its currently throwing 429 error 
        while (retries < maxRetries) {
            try {
                data = await ClassifyEmailsGemini(emails);
                setLabeledEmails(data);
                router.refresh();
                console.log(emails);
                console.log(data.map((item) => item.label));
                break;
            } catch (error) {
                console.error(`Attempt ${retries + 1} failed:`, error);
                retries += 1;
                if (retries >= maxRetries) {
                   return   toast({
                    variant:"destructive",
                    title:"Error",
                    description:"To many request"
                })
                }
            }
        }
    }
    
    return (
        <div className="flex relative flex-col space-y-6">
            <div className="flex justify-between w-full">
                <Button onClick={InputToggle} className="flex space-x-1" variant={"outline"}>
                    <ChevronDown size={18} />
                    Input
                    </Button>
                <Button onClick={() => handleClassified(emails)} disabled={emails.length === 0} className="flex gap-x-2">
                    <MailCheck size={22}/>
                    Classify
                    </Button>
            </div>
            <div className="absolute top-[42px] z-10">
            {
                isOpen ? (
                    <div className="w-[55vh] z-10 mt-[-1rem] bg-slate-100 h-[25vh] rounded-md space-y-6 shadow-md p-3">
                    <div className="w-[50vh] mt-[4px] h-[10vh] bg-emerald-100 flex  rounded-lg shadow-sm items-center">
                        <Slider className="w-[90%] px-4" defaultValue={[33]} max={100} step={1} value={input} onValueChange={handleSliderChange} />
                        <h1 className="text-md font-medium">{input[0]}</h1>
                    </div>
                    <Button onClick={() => GetMails()} className="ml-[13rem]">Get mails</Button>
                    </div>
                ) : (null)
            }
            </div>
            <div className="absolute w-full top-[4rem] space-y-6 p-2 mb-8 z-5">
        {emails.length > 0 &&
          emails.map((email, index) => {
            const label = labeledEmails.find((labeledEmail) => labeledEmail.id === email.id)?.label;

            return (
                <Sheet key={index}>
                    <SheetTrigger asChild>
              <div
                key={index}
                className="flex bg-emerald-100 rounded-md shadow-sm hover:cursor-pointer border-1 border-emerald-200 p-6 flex-col w-[70%] mx-auto space-y-6"
              >
                <div className="flex text-xl font-medium justify-between">
                  <h1>{email.from}</h1>
                  <div>{label && <h1>{label}</h1>}</div>
                </div>
                <div>
                  <h1>{email.subject}</h1>
                </div>
              </div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                    <SheetTitle className="flex mt-[1rem] justify-between">
                        
                        <div>{email.from}</div>
                        <div>{label && <h1>{label}</h1>}</div>
                    </SheetTitle>
                    <SheetDescription className="flex flex-col space-y-4">
                        <div>Subject- {email.subject}</div>
                        <div>{email.body.text}</div>
                    </SheetDescription>
                </SheetHeader>
              </SheetContent>
              </Sheet>
            );
          })}
      </div>
            </div>
    
    )
}

export default MainSection