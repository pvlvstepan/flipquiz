import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/trpc/react";

interface DeleteCommentModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    commentId: number;
}

export function DeleteCommentModal({
    open,
    onOpenChange,
    commentId,
}: DeleteCommentModalProps) {
    const { mutateAsync, isLoading } = api.studySet.deleteComment.useMutation();

    const router = useRouter();

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
                    <p>
                        This action cannot be undone. This will permanently
                        delete this comment from this study set.
                    </p>
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
                        onClick={() => {
                            void mutateAsync({
                                id: commentId,
                            }).then(() => {
                                router.refresh();
                                onOpenChange(false);
                            });
                        }}
                        variant="destructive"
                    >
                        {isLoading ? <Spinner /> : "Delete"}
                    </Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog>
    );
}
