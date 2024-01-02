"use client";
import { Button } from "@/components/ui/button"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { InfinityIcon, ShareIcon, LockIcon, GaugeIcon } from "lucide-react"
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from "@clerk/nextjs";
import Image from "next/image";

const AuthPage = () => {
    return (
        <>
            <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
                <p className="mr-6">
                    <ShareIcon className="h-6 w-6" />
                    <span className="sr-only">EasyShare</span>
                </p>
                <div className="ml-auto">
                    <SignedOut>
                        <SignInButton mode="modal" afterSignInUrl="/dashboard">
                            <Button variant="ghost" size="sm">
                                Log in
                            </Button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </header>
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-12 xl:grid-cols-[1fr_1fr]">
                        <Image
                            alt="Hero"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                            height="550"
                            src="/hero-picture.jpg"
                            width="310"
                        />
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                                    EasyShare: File Sharing Made Easy
                                </h1>
                                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Enjoy secure and fast file transfers, unlimited storage, and easy sharing with EasyShare. Start
                                    sharing with friends and colleagues today.
                                </p>
                            </div>
                            <div className="w-full max-w-sm space-y-2">
                                <Button type="button">Get Started</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    <div className="grid items-center gap-6 lg:grid-cols-[1fr_1fr_1fr] lg:gap-12 xl:grid-cols-[1fr_1fr_1fr]">
                        <Card>
                            <CardHeader>
                                <LockIcon className="w-4 h-4" />
                                <h2 className="text-2xl font-bold tracking-tighter">Secure Transfers</h2>
                            </CardHeader>
                            <CardContent>Your files are encrypted and secure during transfer.</CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <GaugeIcon className="w-4 h-4" />
                                <h2 className="text-2xl font-bold tracking-tighter">Fast Transfers</h2>
                            </CardHeader>
                            <CardContent>Transfer files quickly, no matter the size.</CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <InfinityIcon className="w-4 h-4" />
                                <h2 className="text-2xl font-bold tracking-tighter">Unlimited Storage</h2>
                            </CardHeader>
                            <CardContent>Don&apos;t worry about running out of space with our unlimited storage.</CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AuthPage;