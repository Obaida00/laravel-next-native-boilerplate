"use client"
import { Button } from '@/components/ui/button';
import useAuthCheck from '@/hooks/useAuthCheck'
import { signOut, useSession } from 'next-auth/react';
import React from 'react'

export default function Homepage() {

    useAuthCheck({ when: "unauthenticated", redirectTo: "/" });
    const {data: session} = useSession();
    return (
        <div className="flex justify-center items-center min-h-screen">
            <h1 className='text-2xl'>Welcome, {session?.user?.name}</h1>
            <Button variant={"default"} onClick={() => signOut()}>Logout</Button>
        </div>
    )
}
