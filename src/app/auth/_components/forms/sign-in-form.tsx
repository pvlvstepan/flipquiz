"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { signInInput } from "@/server/schemas/auth";

const formSchema = signInInput;

export function SignInForm() {
    const { toast } = useToast();
    const router = useRouter();

    const [isLoading, setIsLoading] = useTransition();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emailOrUsername: "",
            password: "",
        },
    });

    const params = useSearchParams();

    const callbackUrl = params.get("callbackUrl");

    const isInvalid = Boolean(Object.keys(form.formState.errors).length);

    const onSubmit = form.handleSubmit((data) => {
        setIsLoading(async () => {
            return signIn("credentials", {
                ...data,
                redirect: false,
            }).then((res) => {
                if (!res?.ok) {
                    toast({
                        title: "Username or password is incorrect",
                        variant: "destructive",
                    });
                } else {
                    router.replace(callbackUrl || "/latest");
                }
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
                        name="emailOrUsername"
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Label>Email or username</Form.Label>
                                <Form.Control>
                                    <Input
                                        {...field}
                                        disabled={isLoading}
                                        placeholder="Enter your email or username"
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
                </div>
                <div className="flex flex-col gap-4">
                    <Button
                        disabled={isInvalid || isLoading}
                        size="lg"
                        type="submit"
                    >
                        {isLoading ? <Spinner /> : "Log in"}
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
