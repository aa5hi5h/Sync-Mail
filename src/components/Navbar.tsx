"use client"
import Link from "next/link"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Session } from "next-auth"
import {signOut} from "next-auth/react"
import { Home, KeyRound } from "lucide-react"


const Navbar = () => {

    const {data:session} = useSession()
    const router = useRouter()
    return (
        <div className="p-3 ">
        <div className="flex items-center justify-between border-b border-zinc-500 pb-2">
            <Link className="text-4xl font-semibold" href={"/"}>Sync-Mail</Link>
            <div className="flex gap-x-6 items-center">
                <Button variant="ghost" onClick={() => router.push("/dashboard")} className="text-lg  flex gap-x-2">
                    <Home size={22} />
                    Home</Button>
                <Button variant={"ghost"} className="text-lg flex gap-x-2" onClick={() => router.push("/key")} >
                    <KeyRound size={20}/>
                    Key
                    </Button>
                <Link className="text-lg hover:underline-offset-4 hover:underline transition" href={"/about"}>About Me</Link>
                <div>
                    {
                        session ? (
                            <Button onClick={() => signOut()}  variant={"destructive"}>Logout</Button>
                        ) : (
                            <Button onClick={() => router.push("/sign-in")}>SignIn</Button>
                        )
                    }
                </div>
            </div>
        </div>
        </div>
    )
}

export default Navbar