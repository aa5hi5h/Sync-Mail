"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"



const QueryProvider = ({children}:{children:ReactNode}) => {
    const queryClinet = new QueryClient()

    return <QueryClientProvider client={queryClinet}>{children}</QueryClientProvider>
}

export default QueryProvider