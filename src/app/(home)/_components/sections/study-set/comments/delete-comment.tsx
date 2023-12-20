"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";

interface DeleteCommentModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onDelete: () => Promise<void>;
}

export function DeleteCommentModal({
    open,
    onOpenChange,
    onDelete,
}: DeleteCommentModalProps) {
    const [isLoading, setIsLoading] = useTransition();

    const { toast } = useToast();

    const handleDelete = () => {
        setIsLoading(() =>
            onDelete()
                .then(() => {
                    toast({
                        title: "Comment deleted",
                    });
                    onOpenChange(false);
                })
                .catch(() => {
                    toast({
                        title: "Something went wrong",
                        description: "Failed to delete comment",
                        variant: "destructive",
                    });
                }),
        );
    };

    return (
        <Dialog
            onOpenChange={() => {
                onOpenChange(false);
            }}
            open={open}
        >
            <Dialog.Content className="max-w-full sm:max-w-lg">
                <Dialog.Header className="text-xl sm:text-2xl">
                    Are you sure you want to delete this comment?
                </Dialog.Header>
                <Dialog.Description>
                    This action cannot be undone. This will permanently delete
                    this comment from this study set.
                </Dialog.Description>
                <Dialog.Footer className="gap-y-2">
                    <Button
                        onClick={() => {
                            onOpenChange(false);
                        }}
                        variant="outline"
                    >
                        Cancel
                    </Button>
                    <Button
                        className="min-w-[85px]"
                        disabled={isLoading}
                        onClick={handleDelete}
                        variant="destructive"
                    >
                        {isLoading ? <Spinner /> : "Delete"}
                    </Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog>
    );
}
