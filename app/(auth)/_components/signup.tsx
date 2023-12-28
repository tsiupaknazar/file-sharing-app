"use client";
import appwriteService from "@/utils/appwrite";
import useAuth from "@/context/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Signup = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    })
    const [error, setError] = useState("")

    const { setAuthStatus } = useAuth()

    const create = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const userData = await appwriteService.createUserAccount(formData);
            if (userData) {
                setAuthStatus(true)
                router.push("/")
            }
        } catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center text-white">
            <div className={`mx-auto w-full max-w-lgrounded-xl p-10`}>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={create} className="mt-8">
                    <div className="space-y-5">
                        <div>
                            <Label htmlFor="name">
                                Full Name
                            </Label>
                            <div className="mt-2">
                                <Input
                                    type="text"
                                    placeholder="Full Name"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="email">
                                Email address
                            </Label>
                            <div className="mt-2">
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                                    }
                                    placeholder="Email"
                                    id="email"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">
                                    Password
                                </Label>
                            </div>
                            <div className="mt-2">
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            password: e.target.value,
                                        }))
                                    }
                                    id="password"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <Button className={`${cn(buttonVariants())} w-full`}>
                                Create Your Account
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;