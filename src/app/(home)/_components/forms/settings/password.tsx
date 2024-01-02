"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRoundIcon } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { TRPCError } from "@trpc/server";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    currentPassword: z
        .string()
        .min(8, "Password must be at least 8 characters long"),
});

const formSchemaExtended = formSchema
    .extend({
        repeatPassword: z
            .string()
            .min(8, "Password must be at least 8 characters long"),
    })
    .refine((data) => data.password === data.repeatPassword, {
        message: "Passwords do not match",
        path: ["repeatPassword"],
    });

interface ChangePasswordProps {
    onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>;
}

export function ChangePassword({
    onSubmit: handleSubmit,
}: ChangePasswordProps) {
    const [isLoading, setIsLoading] = useTransition();

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchemaExtended>>({
        resolver: zodResolver(formSchemaExtended),
        defaultValues: {
            currentPassword: "",
            password: "",
            repeatPassword: "",
        },
    });

    const onSubmit = form.handleSubmit(async (data) => {
        setIsLoading(() =>
            handleSubmit({
                currentPassword: data.currentPassword,
                password: data.password,
            })
                .then(() => {
                    toast({
                        title: "Password changed",
                    });
                    form.reset({
                        currentPassword: "",
                        password: "",
                        repeatPassword: "",
                    });
                })
                .catch((err: TRPCError) => {
                    toast({
                        title: "Failed to change password",
                        description: err.message,
                        variant: "destructive",
                    });
                }),
        );
    });

    const hasErrors = Object.keys(form.formState.errors).length > 0;
    const hasChanges = form.formState.isDirty;

    return (
        <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex w-40 shrink-0 flex-col gap-4 whitespace-nowrap sm:mt-4 sm:items-center">
                <KeyRoundIcon className="max-sm:hidden" size={32} />
                <span className="text-xl">Password</span>
            </div>
            <Card className="col-span-3 w-full">
                <Form {...form}>
                    <form onSubmit={onSubmit}>
                        <Card.Header>
                            <Card.Title className="text-lg">
                                Change your Password
                            </Card.Title>
                        </Card.Header>
                        <Card.Content className="flex flex-col gap-8">
                            <Form.Field
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <Form.Item>
                                        <Form.Control>
                                            <Input
                                                {...field}
                                                disabled={isLoading}
                                                placeholder="Enter your current password"
                                                type="password"
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
                                        <Form.Control>
                                            <Input
                                                {...field}
                                                disabled={isLoading}
                                                placeholder="Enter your new password"
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
                                        <Form.Control>
                                            <Input
                                                {...field}
                                                disabled={isLoading}
                                                placeholder="Repeat new password"
                                                type="password"
                                            />
                                        </Form.Control>
                                        <Form.Message />
                                    </Form.Item>
                                )}
                            />
                        </Card.Content>
                        <Card.Footer>
                            <Button
                                className="min-w-[84px]"
                                disabled={isLoading || hasErrors || !hasChanges}
                            >
                                {isLoading ? <Spinner /> : "Submit"}
                            </Button>
                        </Card.Footer>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
