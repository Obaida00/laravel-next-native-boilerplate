"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { EyeOff, Eye } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import myToast from './toast';

export default function LoginForm() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const formSchema = z.object({
        email: z.string().email({ message: "Please enter a valid email" }),
        password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const handleLogin = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password,
                }),

            });

            const data = await response.json();
            console.log(response.status);

            if (!response.ok) {
                myToast({ title: data.message, state: "error" });
                console.log("Login error:", data.message);
            }

        } catch (error) {
            myToast({ title: `${error}`, state: "error", });
        }
    }


    return (
        <>
            <div className="font-[family-name:var(--font-geist-sans)]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl><Input {...field} type="email" /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="flex gap-1">
                                            <Input {...field} type={passwordVisible ? "text" : "password"} />
                                            <Button size="icon" type="button" className="cursor-pointer" onClick={togglePasswordVisibility}>{passwordVisible ? <EyeOff /> : <Eye />}</Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />

                        <Button type="submit" variant={"default"} className="w-full mt-4 cursor-pointer">Sign up</Button>
                    </form>
                </Form>
            </div>

        </>
    )
}
