"use client";

import { Spinner } from "@/components/spinner";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from 'next/navigation'
import { getPageName } from "@/utils/getPageName";
import { SearchBar } from "@/components/searchbar";
import ThemeButton from "@/components/theme-change-button";

export const Header = () => {
    const pathname = usePathname()

    const [isLoading, setIsLoading] = useState(false);
    return (
        <div
            className="mx-auto flex h-16 max-w-screen items-center justify-between gap-8 px-4 sm:px-6
                           lg:px-8
                           border-b"
        >
            <Link href="/" className="text-2xl font-bold">
                {getPageName(pathname)}
            </Link>
            <SearchBar />
            <div className="flex items-center justify-between w-24">
                <ThemeButton />
                {isLoading && (
                    <Spinner size="lg" />
                )}
                {!isLoading && (
                    <UserButton afterSignOutUrl="/" />
                )}
            </div>
        </div>
    );
};
