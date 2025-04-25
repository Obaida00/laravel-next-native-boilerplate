"use client"

import { Button } from '@/components/ui/button';
import useUser from '@/hooks/useUser';
import router  from 'next/navigation';
// import { useEffect, useState } from 'react';

// import useAuthCheck from '@/hooks/useAuthCheck'


export default function Homepage() {
    const { user, loading } = useUser();

    const handleLogout = async () => {
        const res = await fetch("/api/logout", {
            method: "POST",
        });

        if (res.ok) {
            // رجّع المستخدم للصفحة الرئيسية أو صفحة تسجيل الدخول
            router.redirect("/");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>Not logged in</p>;
    return (
        <>
            <p>Welcome {user.name}</p>
            <p>your email is : {user.email}</p>
            <Button onClick={handleLogout}>Logout</Button>
        </>
    );
}
