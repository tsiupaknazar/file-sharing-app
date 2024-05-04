"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BanIcon } from "lucide-react";

export default function NotFound () {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center space-y-4 dark:bg-[#1F1F1F]">
            <BanIcon className="h-32 w-32 text-gray-500 dark:text-gray-400" />
            <h2 className="text-3xl font-medium">Something went wrong</h2>
            <Button asChild>
                <Link href="/dashboard">Go back</Link>
            </Button>
        </div>
    );
};