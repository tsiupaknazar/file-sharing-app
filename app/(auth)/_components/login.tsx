"use client";

import appwriteService from "@/utils/appwrite";
import useAuth from "@/context/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const router = useRouter();
  const { setAuthStatus } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const session = await appwriteService.login(formData);
      if (session) {
        setAuthStatus(true);
        router.push("/");
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full text-white">
      <div className={`mx-auto w-full max-w-lg rounded-xl p-10`}>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={login} className="mt-8">
          <div className="space-y-5">
            <div>
              <Label htmlFor="email">Email address</Label>
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
                <Label htmlFor="password">Password</Label>
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
              <Button
                type="submit"
                variant="default"
                className="inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7"
              >
                Sign in
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
