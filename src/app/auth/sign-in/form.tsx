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
    email: z.string().email(),
    password: z.string().min(8),
});

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
                                <FormLabel>
                                    <div className="flex w-full justify-between">
                                        <span>Password</span>
                                        <Link
                                            className="text-primary hover:text-primary/90"
                                            href="/auth/forgot-password"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                </FormLabel>
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
