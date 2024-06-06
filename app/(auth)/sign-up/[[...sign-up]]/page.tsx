import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react"
import Image from "next/image";
export default function Page() {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="h-full lg:flex flex-col items-center justify-center px-4">
                <div className="text-center space-y-4 pt-16">
                    <h1 className="font-bold text-[#2E2A47] text-3xl text-muted-foreground">
                        Welcome back!
                    </h1>
                    <p className="text-base text-[#7E8CA0]">
                        Login or create account to get back to your dashboard
                    </p>
                </div>
                <div className="flex items-center justify-center mt-8">
                    <ClerkLoaded>
                        <SignUp path="/sign-up" />
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 className="animate-spin text-muted-foreground" />
                    </ClerkLoading>
                </div>
            </div>
            <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    height={100}
                    width={100}
                />
            </div>
        </div>
    )

}