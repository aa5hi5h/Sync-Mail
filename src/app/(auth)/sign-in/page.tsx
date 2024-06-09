"use client"
import { Button } from "@/components/ui/button"
import Google from "../../../../public/Google.svg"
import Image from "next/image"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"


const page = () => {

    const [isLoading,setIsLoading] = useState<boolean>(false)

    const router = useRouter()

    const handleLogin = async() => {
        try{
            setIsLoading(true)
            await signIn("google",{callbackUrl:"http://localhost:3000/dashboard"})

        }catch(error){
            setIsLoading(false)
            console.log(`Error while loggingin -: ${error}`)
        }finally{
            setIsLoading(false)
        }

    }
    return (
        <div className="w-full h-80 pt-20 flex  justify-center items-center">
            <Button disabled={isLoading} onClick={handleLogin} className="flex  gap-x-2 ">
                {isLoading && (
                    <Loader2 className="animate-spin h-4 w-4" />
                )}
                <Image 
                src={Google} 
                alt="Google logo" 
                width={16} 
                height={16} 
                className="object-contain" />SignIn with Google</Button>
        </div>
    )
}

export default page