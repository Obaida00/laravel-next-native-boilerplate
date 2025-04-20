"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { useState } from "react";
import { Button } from "./button";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "The name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords doesn't match",
    path: ["confirmPassword"],
  });

function RegisterForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConfirmVisibility = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleRegister = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <>
      <div className="font-[family-name:var(--font-geist-sans)]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleRegister)}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="flex gap-1">
                      <Input
                        {...field}
                        type={passwordVisible ? "text" : "password"}
                      />
                      <Button
                        size="icon"
                        type="button"
                        className="cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        {passwordVisible ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <div className="flex gap-1">
                      <Input
                        {...field}
                        type={confirmPasswordVisible ? "text" : "password"}
                      />
                      <Button
                        size="icon"
                        className="cursor-pointer"
                        type="button"
                        onClick={toggleConfirmVisibility}
                      >
                        {confirmPasswordVisible ? <EyeOff /> : <Eye />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant={"default"}
              className="w-full mt-4 cursor-pointer"
            >
              Sign up
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default RegisterForm;
