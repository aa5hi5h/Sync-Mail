"use client"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

interface ProviderProp{
    children : ReactNode
}


const Provider : React.FC<ProviderProp> = ({children}) => {
    return <SessionProvider>{children}</SessionProvider>
}

export default Provider