"use client"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import {Github } from "lucide-react"

const TryButton = () => {
    const router = useRouter()
    return (
        <Button className="gap-x-2" onClick={() => router.push("https://github.com/aa5hi5h/Sync-Mail")}>
            <Github size={22} /> Github </Button>
    )
}

export default TryButton