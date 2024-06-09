import { authOptions } from "@/app/utils/auth"
import Avatar from "@/components/Avatar"
import MainSection from "@/components/MainSection"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"
import { notFound } from "next/navigation"


const Page = async() => {

    const session = await getServerSession(authOptions)

    if(!session){
        return <div>Please login</div>
    }
    return (
        <div className="p-3 gap-x-2 w-full flex h-full">
            <div className="flex flex-col h-60 w-[15rem] mt-[-1rem]">
             <Avatar session={session} />
             <hr className="border-[1px] mt-4 border-gray-500" />
             </div>
             <div className="h-[84vh] mt-[-2rem] flex items-center">
              <hr className="border-l-2  border-zinc-600 h-full" />
             </div>
            <div className="max-w-[55rem] w-full mx-auto p-3">
                <MainSection />                
            </div>
        </div>
    )
}

export default Page