"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CollapsibleContent } from "@radix-ui/react-collapsible";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ChevronDown, SendIcon } from "lucide-react";
import { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";

import type { z } from "zod";

import type { Comment } from "./message";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { TextArea } from "@/components/ui/textarea";
import { Tooltip } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { addCommentInput } from "@/server/schemas/comment";

import { addComment } from "./actions";
import { Message } from "./message";

interface StudySetCommentsProps {
    comments: Comment[];
    studySetId: string;
    currentUserId: string;
    creatorId: string;
}

export function StudySetComments({
    comments = [],
    studySetId,
    currentUserId,
    creatorId,
}: StudySetCommentsProps) {
    const [isLoading, setIsLoading] = useTransition();

    const { toast } = useToast();

    const form = useForm<z.infer<typeof addCommentInput>>({
        resolver: zodResolver(addCommentInput),
        defaultValues: {
            studySetId,
            content: "",
        },
    });

    const isInvalid = Boolean(Object.keys(form.formState.errors).length);

    const onSubmit = form.handleSubmit((data) => {
        setIsLoading(() =>
            addComment(data)
                .then(() => {
                    toast({
                        title: "Comment added",
                    });
                    form.reset({
                        studySetId,
                        content: "",
                    });
                })
                .catch(() => {
                    toast({
                        title: "Something went wrong",
                        description: "Couldn't add comment",
                        variant: "destructive",
                    });
                }),
        );
    });

    const formRef = useRef<HTMLFormElement>(null);

    return (
        <TooltipProvider>
            <Collapsible
                className="flex flex-col gap-8"
                defaultOpen
                id="comments"
            >
                <CollapsibleTrigger className="group/terms flex w-full items-center justify-between transition-colors hover:text-primary">
                    <h2 className="text-xl sm:text-2xl">
                        Comments ({comments.length})
                    </h2>
                    <ChevronDown
                        className="group-aria-expanded/terms:rotate-180"
                        size={24}
                    />
                </CollapsibleTrigger>
                <CollapsibleContent className="flex flex-col gap-8 data-[state=closed]:hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0">
                    {comments.map((comment) => (
                        <Message
                            belongsToCurrentUser={
                                comment.user.id === currentUserId
                            }
                            key={comment.id}
                            userIsCreator={comment.user.id === creatorId}
                            {...comment}
                        />
                    ))}
                    <Form {...form}>
                        <form
                            className="flex items-start justify-between gap-2 sm:gap-4"
                            noValidate
                            onSubmit={onSubmit}
                            ref={formRef}
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
                                                    onKeyDown={(e) => {
                                                        if (
                                                            e.key === "Enter" &&
                                                            !e.shiftKey
                                                        ) {
                                                            e.preventDefault();
                                                            formRef.current?.requestSubmit();
                                                        }
                                                    }}
                                                    placeholder={
                                                        !comments.length
                                                            ? "Be the first to comment"
                                                            : "Add a comment"
                                                    }
                                                    rows={1}
                                                    {...field}
                                                />
                                                <Tooltip content="Send">
                                                    <Button
                                                        className="absolute bottom-2 right-2 shrink-0"
                                                        disabled={
                                                            isInvalid ||
                                                            isLoading
                                                        }
                                                        size="icon"
                                                        type="submit"
                                                    >
                                                        {isLoading ? (
                                                            <Spinner />
                                                        ) : (
                                                            <SendIcon
                                                                size={24}
                                                            />
                                                        )}
                                                    </Button>
                                                </Tooltip>
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
        </TooltipProvider>
    );
}
