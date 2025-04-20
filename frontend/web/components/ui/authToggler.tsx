"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import LoginForm from './loginForm'
import RegisterForm from './registerForm'
import useAuthCheck from "@/hooks/useAuthCheck";


export default function AuthToggler() {
    useAuthCheck({ when: "authenticated", redirectTo: "/home" })

    return (
        <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Card>
                    <CardHeader>
                        <CardTitle className='text-xl'>Sign In</CardTitle>

                    </CardHeader>
                    <CardContent className="space-y-2">
                        <LoginForm></LoginForm>
                    </CardContent>

                </Card>
            </TabsContent>
            <TabsContent value="register">
                <Card>
                    <CardHeader>
                        <CardTitle className='text-xl'>Sign Up</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <RegisterForm></RegisterForm>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
