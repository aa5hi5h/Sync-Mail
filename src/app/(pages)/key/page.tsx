"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"


const Page = () => {
    const [ inputKey,setInputKey] = useState<string | "" >("")

    const {toast} = useToast()


    const handleSubmit = (e:any) => {
        e.preventDefault()
        if(typeof window !== "undefined"){
            localStorage.setItem("OpenAi_key",inputKey)
        }
        toast({
            title:"Success",
            description:"Api keys updated"
        })
        
    }
    return (
        <div className="flex flex-col items-center  h-[70vh] w-full justify-center">
            <div className="w-[80vh] h-[20vh] flex flex-col space-y-2 p-6 rounded-md bg-emerald-100">
                <div className="flex gap-x-2 mt-[-4px]">
                <Input  value={inputKey} 
                onChange={(e) => setInputKey(e.target.value)} 
                placeholder="Enter your own OpenAi api key" 
                className="focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" />
                <Button onClick={handleSubmit} disabled={inputKey.length === 0}>Save</Button>
                </div>
                <h1 className="text-sm text-muted-foreground">Dont have one, no need to worry there is already a default one setup for you</h1>
            </div>
        </div>
    )
}

export default Page