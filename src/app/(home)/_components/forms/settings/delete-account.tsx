"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2Icon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { TRPCError } from "@trpc/server";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
    currentPassword: z
        .string()
        .min(8, "Password must be at least 8 characters long"),
});

interface DeleteAccountProps {
    onSubmit: (
        currentPassword: z.infer<typeof formSchema>["currentPassword"],
    ) => Promise<void>;
}

export function DeleteAccount({ onSubmit: handleSubmit }: DeleteAccountProps) {
    const [deleteOpen, setDeleteOpen] = useState(false);

    const { toast } = useToast();

    const [isLoading, setIsLoading] = useTransition();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            currentPassword: "",
        },
    });

    const onSubmit = form.handleSubmit((data) => {
        setIsLoading(async () => {
            return handleSubmit(data.currentPassword)
                .then(() => {
                    void signOut();
                    window.location.reload();
                })
                .catch((err: TRPCError) => {
                    toast({
                        title: "Could not delete account",
                        description: err.message,
                        variant: "destructive",
                    });
                });
        });
    });

    return (
        <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex w-40 shrink-0 flex-col gap-4 whitespace-nowrap sm:mt-4 sm:items-center">
                <Trash2Icon className="max-sm:hidden" size={32} />
                <span className="text-xl">Delete account</span>
            </div>
            <Card className="col-span-3 w-full">
                <Card.Header>
                    <Card.Title className="text-lg">
                        Permanently delete your account
                    </Card.Title>
                </Card.Header>
                <Card.Content>
                    <p className="text-muted-foreground">
                        This action is irreversible and will delete all your
                        data.
                    </p>
                </Card.Content>
                <Card.Footer>
                    <Button
                        onClick={() => {
                            setDeleteOpen(true);
                        }}
                        variant="destructive"
                    >
                        Delete account
                    </Button>
                </Card.Footer>
            </Card>
            <Dialog onOpenChange={setDeleteOpen} open={deleteOpen}>
                <Dialog.Content className="max-w-full sm:max-w-lg">
                    <Dialog.Header className="text-xl sm:text-2xl">
                        Are you sure you want to delete your account?
                    </Dialog.Header>
                    <Dialog.Description>
                        This action cannot be undone. This will permanently
                        delete your account and all your data.
                    </Dialog.Description>
                    <Form {...form}>
                        <form onSubmit={onSubmit}>
                            <Form.Field
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <Form.Item className="mb-8">
                                        <Form.Control>
                                            <Input
                                                {...field}
                                                disabled={isLoading}
                                                placeholder="Enter your current password"
                                                type="password"
                                            />
                                        </Form.Control>
                                        <Form.Message />
                                        <Form.Description>
                                            We need your current password to
                                            confirm that you want to delete your
                                            account.
                                        </Form.Description>
                                    </Form.Item>
                                )}
                            />
                            <Dialog.Footer className="gap-y-2">
                                <Button
                                    onClick={() => {
                                        setDeleteOpen(false);
                                    }}
                                    variant="outline"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="min-w-[85px]"
                                    disabled={isLoading}
                                    variant="destructive"
                                >
                                    {isLoading ? <Spinner /> : "Delete"}
                                </Button>
                            </Dialog.Footer>
                        </form>
                    </Form>
                </Dialog.Content>
            </Dialog>
        </div>
    );
}
