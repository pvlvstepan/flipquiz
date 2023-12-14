"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    repeatPassword: z.string().min(8),
});

export function SignUpForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(
            formSchema.refine((data) => data.password === data.repeatPassword, {
                message: "Passwords don't match",
                path: ["repeatPassword"],
            }),
        ),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            repeatPassword: "",
        },
    });

    const isInvalid = Boolean(Object.keys(form.formState.errors).length);

    const onSubmit = form.handleSubmit((data) => {
        console.log(data);
    });

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-y-4"
                noValidate
                onSubmit={onSubmit}
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your name"
                                    {...field}
                                />
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
                                <Input
                                    placeholder="Enter your email"
                                    {...field}
                                />
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
                                <Input
                                    placeholder="Password"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="repeatPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Repeat password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Repeat password"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="mt-6" disabled={isInvalid} type="submit">
                    Create your account
                </Button>
                <p className="text-sm font-light text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        className="font-bold text-primary hover:underline"
                        href="/auth/sign-in"
                    >
                        Log in here
                    </Link>
                </p>
            </form>
        </Form>
    );
}
