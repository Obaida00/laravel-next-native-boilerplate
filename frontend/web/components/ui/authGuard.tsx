import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const {data: session, status} = useSession();
    const router = useRouter();

    useEffect(()=> {
        if (status === "unauthenticated") {
            router.replace("/loginOrRegister");
        }
    }, [status, router])
    return (
        <>
            {children}
        </>
    )
}
