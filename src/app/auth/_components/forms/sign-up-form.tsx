"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import type { TRPCError } from "@trpc/server";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { signUpInput } from "@/server/schemas/auth";

import { singUp } from "./actions";

const formSchema = signUpInput
    .extend({
        repeatPassword: signUpInput.shape.password,
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: "Passwords don't match",
        path: ["repeatPassword"],
    });

export function SignUpForm() {
    const { toast } = useToast();
    const router = useRouter();

    const [isLoading, setIsLoading] = useTransition();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            repeatPassword: "",
        },
    });

    const isInvalid = Boolean(Object.keys(form.formState.errors).length);

    const onSubmit = form.handleSubmit((data) => {
        setIsLoading(async () => {
            return singUp(data)
                .then(() => {
                    toast({
                        title: "Account created",
                        description: "Please log in to continue",
                    });
                    router.push("/auth/sign-in");
                    form.reset();
                })
                .catch((err: TRPCError) => {
                    toast({
                        title: "Failed to create account",
                        description: err.message,
                        variant: "destructive",
                    });
                });
        });
    });

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-y-8"
                noValidate
                onSubmit={onSubmit}
            >
                <div className="flex flex-col gap-y-4">
                    <Form.Field
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Label>Username</Form.Label>
                                <Form.Control>
                                    <Input
                                        {...field}
                                        disabled={isLoading}
                                        placeholder="Enter your username"
                                    />
                                </Form.Control>
                                <Form.Message />
                            </Form.Item>
                        )}
                    />
                    <Form.Field
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Label>Email</Form.Label>
                                <Form.Control>
                                    <Input
                                        {...field}
                                        disabled={isLoading}
                                        placeholder="Enter your email"
                                    />
                                </Form.Control>
                                <Form.Message />
                            </Form.Item>
                        )}
                    />
                    <Form.Field
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Label>Password</Form.Label>
                                <Form.Control>
                                    <Input
                                        {...field}
                                        disabled={isLoading}
                                        placeholder="Password"
                                        type="password"
                                    />
                                </Form.Control>
                                <Form.Message />
                            </Form.Item>
                        )}
                    />
                    <Form.Field
                        control={form.control}
                        name="repeatPassword"
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Label>Repeat password</Form.Label>
                                <Form.Control>
                                    <Input
                                        {...field}
                                        disabled={isLoading}
                                        placeholder="Repeat password"
                                        type="password"
                                    />
                                </Form.Control>
                                <Form.Message />
                            </Form.Item>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <Button disabled={isInvalid || isLoading} size="lg">
                        {isLoading ? <Spinner /> : "Sign up"}
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <Link href="/auth/sign-in">
                            Already have an account? Log in
                        </Link>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
