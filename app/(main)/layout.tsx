"use client";
import appwriteService from "@/utils/appwrite";
import { AuthProvider } from "@/context/authContext";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation"

import { Header } from "./(dashboard)/_components/header";
import SideNav from "./(dashboard)/_components/sidenav";

const MainLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {

    const [authStatus, setAuthStatus] = useState(false);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        appwriteService.isLoggedIn()
            .then(setAuthStatus)
            .finally(() => setLoader(false));
        console.log(authStatus);
    }, [authStatus]);

    return <AuthProvider value={{ authStatus, setAuthStatus }}>
        {!loader && (
            <div className="h-screen flex dark:bg-[#1F1F1F]">
                <SideNav />
                <main className="flex-1 h-full overflow-y-auto">
                    <Header />
                    {children}
                </main>
            </div>
        )}
    </AuthProvider>

}

export default MainLayout;