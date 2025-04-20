"use client"
import { Button } from '@/components/ui/button';
import useAuthCheck from '@/hooks/useAuthCheck'
import { signOut, useSession } from 'next-auth/react';
import React, { useEffect } from 'react'

export default function Homepage() {

    useAuthCheck({ when: "unauthenticated", redirectTo: "/" });
    const { data: session, status } = useSession();
    useEffect(() => {
        console.log(session?.accessToken);
        const sendToLaravel = async () => {
            if (!session?.accessToken) {
                return;
            }
            const response = await fetch("http://localhost:8000/api/social/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "provider": "github",
                    "token": session.accessToken
                }),
            });

            const data = await response.json();
            if (data.token) {
                localStorage.setItem("laravel_token", data.token);
                console.log(data.token);
            }
        }
        if (status === "authenticated" && !localStorage.getItem("laravel_token")) {
            sendToLaravel();
        }
    }, [session, status])
    return (
        <div className="flex justify-center items-center min-h-screen">
            <h1 className='text-2xl'>Welcome, {session?.user?.name}</h1>
            <Button variant={"default"} onClick={() => signOut()}>Logout</Button>
        </div>
    )
}
