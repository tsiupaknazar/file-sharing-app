"use client";
import React from "react";
import useAuth from "@/context/useAuth"
import { useRouter } from "next/navigation"

import SideNav from "./_components/sidenav";
import { Header } from "./_components/header";

const MainLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const { authStatus } = useAuth();

  if (!authStatus) {
    router.replace("/login");
    return <></>;
  }

  return (
    <div className="h-screen flex dark:bg-[#1F1F1F]">
      <SideNav />
      <main className="flex-1 h-full overflow-y-auto">
        <Header />
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
