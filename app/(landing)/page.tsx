"use client";
import { Button } from "@/components/ui/button";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from "@clerk/nextjs";

const AuthPage = () => {
    return (
        <div className="mt-4 mx-auto w-[95%]">
            <h1 className="font-bold">Welcome to EasyShare</h1>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                {/* Signed out users get sign in button */}
                <SignInButton mode="modal" afterSignInUrl="/dashboard">
                    <Button variant="ghost" size="sm">
                        Log in
                    </Button>
                </SignInButton>
            </SignedOut>
        </div>
    );
};

export default AuthPage;