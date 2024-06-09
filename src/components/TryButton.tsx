"use client"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"


const TryButton = () => {
    const router = useRouter()
    return (
        <Button onClick={() => router.push("/sign-in")}>Try free</Button>
    )
}

export default TryButton