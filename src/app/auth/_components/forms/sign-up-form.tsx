"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpInput } from "@/server/schemas/auth";

const formSchema = signUpInput;

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
                className="flex flex-col gap-y-8"
                noValidate
                onSubmit={onSubmit}
            >
                <div className="flex flex-col gap-y-4">
                    <Form.Field
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Label>Your name</Form.Label>
                                <Form.Control>
                                    <Input
                                        placeholder="Enter your name"
                                        {...field}
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
                                <Form.Label>Password</Form.Label>
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
                    <Form.Field
                        control={form.control}
                        name="repeatPassword"
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Label>Repeat password</Form.Label>
                                <Form.Control>
                                    <Input
                                        placeholder="Repeat password"
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
                    <Button disabled={isInvalid} size="lg">
                        Sign up
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
