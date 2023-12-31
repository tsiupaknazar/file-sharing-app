"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import appwriteService from "@/utils/appwrite";
import { Models } from "appwrite";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react"
import { useRouter } from "next/navigation";

export const Header = () => {
    const router = useRouter()
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

    const logOut = () => {
        router.push("/login");
        appwriteService.logout();
        setUser(null);
    }

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
                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="cursor-pointer">
                                <AvatarFallback>
                                    <span className="text-xl">
                                        {user?.name.charAt(0).toUpperCase()}
                                    </span>
                                </AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col items-center justify-center gap-4 mr-4">
                            <div className="relative">
                                <Avatar className="w-20 h-20 ">
                                    <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                                </Avatar>
                                <Button
                                    size={"icon"}
                                    variant={"outline"}
                                    className="absolute -bottom-1 -right-1 rounded-full p-0 w-8 h-8"
                                >
                                    {/* <Pencil size={16} onClick={} /> */}
                                </Button>
                            </div>
                            <div className="text-center">
                                <h5 className="font-medium text-2xl">{user?.name}</h5>
                                <h6 className="">{user?.email}</h6>
                            </div>
                            <Button onClick={logOut}>Log out</Button>
                        </PopoverContent>
                    </Popover>
                )}
            </div>
        </div>
    );
};
