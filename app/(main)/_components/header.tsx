"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react"

export const Header = () => {
    return (
        <header className="mx-auto flex h-16 max-w-screen items-center justify-between gap-8 px-4 sm:px-6 
                           lg:px-8
                           border-b"
        >
            <Button size="sm" variant="outline">
                <Menu />
            </Button>
            <h2 className="text-2xl font-bold">ShareHub</h2>
            <div className="flex items-center justify-around">
                <ModeToggle />
                <UserButton />
            </div>
        </header>
    )
}