"use client";

import { FlagIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import type { Role } from "@prisma/client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { deleteComment } from "./actions";
import { DeleteCommentModal } from "./delete-comment";

export interface Comment {
    user: {
        id: string;
        username: string | null;
        image: string | null;
        role: Role;
    };
    id: string;
    createdAt: Date;
    content: string;
}

export function Message({
    id,
    content,
    createdAt,
    user,
    belongsToCurrentUser,
    userIsCreator,
}: Comment & {
    belongsToCurrentUser: boolean;
    userIsCreator: boolean;
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
                                alt={user.username || "User avatar"}
                                height={32}
                                src={user.image}
                                width={32}
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                <span className="text-2xl uppercase">
                                    {user.username?.charAt(0) || "?"}
                                </span>
                            </div>
                        )}
                    </div>
                    <Tooltip
                        content={
                            belongsToCurrentUser
                                ? "Delete comment"
                                : "Report comment"
                        }
                        contentProps={{
                            side: belongsToCurrentUser ? "left" : "right",
                        }}
                    >
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
                    </Tooltip>
                </div>
                <div className="flex flex-col gap-2">
                    <div
                        className={cn(
                            "flex max-w-md flex-col items-start space-y-1 overflow-hidden rounded-2xl border-2 bg-white px-3 py-2 text-left",
                        )}
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-primary">
                                {user.username || "Unknown"}
                            </span>

                            {userIsCreator ? (
                                <Badge className="pointer-events-none px-2 py-0 text-xs">
                                    Creator
                                </Badge>
                            ) : null}
                            {user.role === "TEACHER" ? (
                                <Badge className="pointer-events-none bg-primary/20 px-2 py-0 text-xs text-primary">
                                    Teacher
                                </Badge>
                            ) : null}
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
                onDelete={() =>
                    deleteComment({
                        commentId: id,
                    })
                }
                onOpenChange={setDeleteOpen}
                open={deleteOpen}
            />
        </>
    );
}
