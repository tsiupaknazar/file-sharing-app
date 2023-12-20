"use client";

import { ModeToggle } from "@/components/mode-toggle";

import appwriteService from "@/utils/appwrite";
import { Models } from "appwrite";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Header = () => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);

    const logout = () => {
        return appwriteService.logout()
    }

    useEffect(() => {
        (async () => {
            const userData = await appwriteService.getCurrentUser()
            if (userData) {
                setUser(userData)
            }
        })()
    }, [])
    return (
        <header className="mx-auto flex h-16 max-w-screen items-center justify-between gap-8 px-4 sm:px-6 
                           lg:px-8
                           border-b"
        >
            <Link href="/" className="text-2xl font-bold">ShareHub</Link>
            <div className="flex items-center justify-between w-28">
                <ModeToggle />
                {/* <Link href="/profile" className="font-bold">{user?.name}</Link> */}
                <span onClick={logout} className="font-bold cursor-pointer">{user?.name}</span>
            </div>
        </header>
    )
}