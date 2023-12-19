"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronDown, FlagIcon, SendIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { TextArea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

import { DeleteCommentModal } from "./modals";

interface Comment {
    user: {
        id: string;
        name: string | null;
        image: string | null;
    };
    id: number;
    createdAt: Date;
    content: string;
}

function Message({
    id,
    content,
    createdAt,
    user,
    belongsToCurrentUser,
}: Comment & {
    belongsToCurrentUser: boolean;
}) {
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <>
            <div
                className={cn(
                    "flex gap-2",
                    belongsToCurrentUser ? "flex-row-reverse" : "flex-row",
                )}
            >
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-muted-foreground/20">
                        {user.image ? (
                            <Image
                                alt={user.name ?? "User avatar"}
                                height={32}
                                src={user.image}
                                width={32}
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                <span className="text-2xl">?</span>
                            </div>
                        )}
                    </div>
                    <Button
                        className="h-6 w-6 text-muted-foreground hover:text-destructive"
                        onClick={() => {
                            if (belongsToCurrentUser) {
                                setDeleteOpen(true);
                            }
                        }}
                        size="icon"
                        variant="ghost"
                    >
                        {belongsToCurrentUser ? (
                            <Trash2Icon size={16} />
                        ) : (
                            <FlagIcon size={16} />
                        )}
                    </Button>
                </div>
                <div className="flex flex-col gap-2">
                    <div
                        className={cn(
                            "flex max-w-md flex-col items-start space-y-1 overflow-hidden rounded-2xl border-2 bg-white px-3 py-2 text-left",
                        )}
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-primary">
                                {user.name ?? "Unknown"}
                            </span>
                            {/* <Badge className="pointer-events-none px-2 py-0 text-xs">
                                Creator
                            </Badge>
                            <Badge className="pointer-events-none bg-primary/20 px-2 py-0 text-xs text-primary">
                                Teacher
                            </Badge> */}
                        </div>
                        <div className="w-full overflow-hidden whitespace-pre-line break-words text-sm font-normal">
                            {content}
                        </div>
                    </div>
                    <span
                        className={cn(
                            "text-xs text-muted-foreground",
                            belongsToCurrentUser ? "ml-auto" : "mr-auto",
                        )}
                    >
                        {createdAt.toLocaleString("en-US", {
                            day: "numeric",
                            month: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        })}
                    </span>
                </div>
            </div>
            <DeleteCommentModal
                commentId={id}
                onOpenChange={setDeleteOpen}
                open={deleteOpen}
            />
        </>
    );
}

interface StudySetCommentsProps {
    comments: Comment[];
    studySetId: number;
    currentUserId: string;
}

const formSchema = z.object({
    content: z
        .string()
        .min(1, "Comment can't be empty")
        .max(500, "Your comment is too long :("),
});

export function StudySetComments({
    comments = [],
    studySetId,
    currentUserId,
}: StudySetCommentsProps) {
    const { mutateAsync, isLoading } = api.studySet.addComment.useMutation();

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    });

    const isInvalid = Boolean(Object.keys(form.formState.errors).length);

    const onSubmit = form.handleSubmit((data) => {
        mutateAsync({
            id: studySetId,
            text: data.content.replace(/\n{2,}/g, "\n"),
        })
            .then(() => {
                form.reset({
                    content: "",
                });
                router.refresh();
            })
            .catch((err) => {
                console.error(err);
            });
    });

    return (
        <Collapsible defaultOpen={!comments.length} id="comments">
            <CollapsibleTrigger className="group/terms flex w-full items-center justify-between transition-colors hover:text-primary">
                <h2 className="text-xl sm:text-2xl">
                    Comments ({comments.length})
                </h2>
                <ChevronDown
                    className="group-aria-expanded/terms:rotate-180"
                    size={24}
                />
            </CollapsibleTrigger>
            <CollapsibleContent className="my-4 flex flex-col gap-8 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                {comments.map((comment) => (
                    <Message
                        belongsToCurrentUser={comment.user.id === currentUserId}
                        key={comment.id}
                        {...comment}
                    />
                ))}
                <Form {...form}>
                    <form
                        className="flex items-start justify-between gap-2 sm:gap-4"
                        noValidate
                        onSubmit={onSubmit}
                    >
                        <Form.Field
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <Form.Item className="w-full">
                                    <Form.Control>
                                        <div className="relative w-full">
                                            <TextArea
                                                className="min-h-[56px] bg-white py-3.5 pr-14"
                                                disabled={isLoading}
                                                placeholder={
                                                    !comments.length
                                                        ? "Be the first to comment"
                                                        : "Add a comment"
                                                }
                                                rows={1}
                                                {...field}
                                            />
                                            <Button
                                                className="absolute bottom-2 right-2 shrink-0"
                                                disabled={
                                                    isInvalid || isLoading
                                                }
                                                size="icon"
                                                type="submit"
                                            >
                                                {isLoading ? (
                                                    <Spinner />
                                                ) : (
                                                    <SendIcon size={24} />
                                                )}
                                            </Button>
                                        </div>
                                    </Form.Control>
                                    <Form.Message />
                                </Form.Item>
                            )}
                        />
                    </form>
                </Form>
            </CollapsibleContent>
        </Collapsible>
    );
}
