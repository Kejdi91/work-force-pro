import React from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useNavigate } from 'react-router-dom'

const formSchema = z
.object({
    username: z.string().min(2,{
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address."
    }),
    password: z.string().min(6,{
        message: "Password must be at least 6 characters."
    }),
    confirmPassword: z.string().min(6,{
        message: "Confirm password must be at least 6 characters."
    }),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password don`t match",
        path: ["confirmPassword"],
    });

const RegisterForm = () => {
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(formSchema),
    });
    
    const onSubmit = async (values) =>{
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/register`,
                {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );

            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.message || "Registration failed.");
            }
 
            toast.success("Account created",{
                description:"You have been registered succesfully. Please login.",
                action:{
                    label:"Login",
                    onClick:() => navigate("/login"),
                },
            })

        } catch (error) {
            toast.error("Registration failed",{
                description: error.message,
            })
        }
        }
    
        return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-96">
            <div className='text-center'>
                <h1 className='text-primary font-bold text-2xl mb-1'>
                    Create an account
                </h1>
                <p className='text-xs font-normal text-muted-foreground mb-8'>Enter your email below to create your account</p>
            </div>

            <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                    <Input placeholder="Your username" {...field} />
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
                    <Input placeholder="you@example.com" {...field} />
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
                    <Input type="password" placeholder="*********" {...field} />
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
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                    <Input type="password" placeholder="*********" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <Button type="submit">Submit</Button>
        </form>
        </Form>
    )
}

export default RegisterForm