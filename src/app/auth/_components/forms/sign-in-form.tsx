"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInInput } from "@/server/schemas/auth";

const formSchema = signInInput;

export function SignInForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const isInvalid = Boolean(Object.keys(form.formState.errors).length);

    const onSubmit = form.handleSubmit((data) => {
        console.log(data);
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
                        name="email"
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Label>Email</Form.Label>
                                <Form.Control>
                                    <Input
                                        placeholder="Enter your email"
                                        {...field}
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
                                <Form.Label>
                                    <div className="flex w-full justify-between">
                                        <span>Password</span>
                                        <Link
                                            className="text-primary hover:text-primary/90"
                                            href="/auth/forgot-password"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                </Form.Label>
                                <Form.Control>
                                    <Input
                                        placeholder="Password"
                                        type="password"
                                        {...field}
                                    />
                                </Form.Control>
                                <Form.Message />
                            </Form.Item>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <Button disabled={isInvalid} size="lg" type="submit">
                        Log in
                    </Button>
                    <Button asChild size="lg" type="button" variant="outline">
                        <Link href="/auth/sign-up">
                            New to FlipQuiz? Create an account
                        </Link>
                    </Button>
                </div>
            </form>
        </Form>
    );
}
