"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation"

import { Header } from "./(routes)/dashboard/_components/header";
import SideNav from "./(routes)/dashboard/_components/sidenav";

const MainLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-screen flex dark:bg-[#1F1F1F]">
            <SideNav />
            <main className="flex-1 h-full overflow-y-auto">
                <Header />
                {children}
            </main>
        </div>
    )
}

export default MainLayout;