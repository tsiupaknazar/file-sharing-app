"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/spinner";
import appwriteService from "@/utils/appwrite";
import { Models } from "appwrite";
import Link from "next/link";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";

export const Header = () => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
        null
    );
    const [isLoading, setIsLoading] = useState(true);

    const getInitials = (username: string | undefined): string => {
        if (username === undefined) {
            return "";
        }

        const words = username.split(" ");
        const initials = words.map((word) => word.charAt(0).toUpperCase());

        return initials.length === 1 ? initials[0] : initials.slice(0, 2).join("");
    };

    useEffect(() => {
        (async () => {
            const userData = await appwriteService.getCurrentUser();
            if (userData) {
                setUser(userData);
            }
            setIsLoading(false);
        })();
    }, []);

    return (
        <div
            className="mx-auto flex h-16 max-w-screen items-center justify-between gap-8 px-4 sm:px-6
                           lg:px-8
                           border-b"
        >
            <Link href="/" className="text-2xl font-bold">
                EasyShare
            </Link>
            <div className="flex items-center justify-between w-28">
                <ModeToggle />
                {isLoading && (
                    <Spinner size="lg" />
                )}
                {!isLoading && (
                    <Avatar>
                        <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                    </Avatar>
                )}
            </div>
        </div>
    );
};
