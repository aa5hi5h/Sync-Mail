import { Session } from "next-auth"
import Image from "next/image"
import { notFound } from "next/navigation"

interface AvatarProp{
    session: Session
}

const Avatar :React.FC<AvatarProp> = ({session}) => {
    if(!session.user || !session.user.image ) {
        return null
    }
    return (
        <div className="flex items-center gap-x-2">
            <div className="relative w-10 h-10">
            < Image className="rounded-full" alt="Profile image" fill src={session.user.image} />
            </div>
            <div className="flex flex-col  gap-y-1">
                <h1 className="text-lg font-medium">{session.user.name}</h1>
                <h2 className="text-sm ">{session.user.email}</h2>
                </div> 
        </div>
    )
}

export default Avatar