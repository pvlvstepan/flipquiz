"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { MailIcon } from "lucide-react";
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
    username: z.string().min(2, "Username must be at least 2 characters long"),
});

interface ChangeUsernameProps {
    defaultUsername?: string | null;
    onSubmit: (
        username: z.infer<typeof formSchema>["username"],
    ) => Promise<void>;
}

export function ChangeUsername({
    onSubmit: handleSubmit,
    defaultUsername,
}: ChangeUsernameProps) {
    const [isLoading, setIsLoading] = useTransition();

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    });

    const onSubmit = form.handleSubmit(async (data) => {
        setIsLoading(() =>
            handleSubmit(data.username)
                .then(() => {
                    toast({
                        title: "Username changed",
                    });
                    form.reset({
                        username: "",
                    });
                })
                .catch((err: TRPCError) => {
                    toast({
                        title: "Failed to change username",
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
                <MailIcon className="max-sm:hidden" size={32} />
                <span className="text-xl">Username</span>
            </div>
            <Card className="col-span-3 w-full">
                <Form {...form}>
                    <form onSubmit={onSubmit}>
                        <Card.Header>
                            <Card.Title className="text-lg">
                                Change your username
                            </Card.Title>
                        </Card.Header>
                        <Card.Content>
                            <Form.Field
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <Form.Item>
                                        <Form.Control>
                                            <Input
                                                {...field}
                                                disabled={isLoading}
                                                placeholder="Enter your new username"
                                            />
                                        </Form.Control>
                                        <Form.Message />
                                        <Form.Description>
                                            Your current username is{" "}
                                            <span className="text-primary">
                                                {defaultUsername}
                                            </span>
                                        </Form.Description>
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
