"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { CopyIcon, PencilIcon, Share2Icon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import QRCode from "react-qr-code";

import type { Role } from "@prisma/client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Tooltip } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

interface StudySetCreatorInfoProps {
    createdBy: {
        username: string | null;
        id: string;
        image: string | null;
        role: Role;
    };
    studySetId: string;
    belongsToCurrentUser: boolean;
    onDelete: () => Promise<void>;
}

export function StudySetCreatorInfo({
    createdBy,
    studySetId,
    belongsToCurrentUser,
    onDelete,
}: StudySetCreatorInfoProps) {
    const [isLoading, setIsLoading] = useTransition();

    const [deleteOpen, setDeleteOpen] = useState(false);

    const { toast } = useToast();

    const handleDelete = () => {
        setIsLoading(() =>
            onDelete()
                .then(() => {
                    setDeleteOpen(false);
                    toast({
                        title: "Study set deleted",
                    });
                })
                .catch(() => {
                    toast({
                        title: "Failed to delete study set",
                        variant: "destructive",
                    });
                }),
        );
    };

    const studySetUrl = useMemo(
        () =>
            typeof window !== "undefined"
                ? `${window.location.origin}/study-set/${studySetId}`
                : "",
        [studySetId],
    );

    return (
        <TooltipProvider>
            <div className="flex flex-wrap items-start justify-between gap-8 sm:gap-4">
                <Link
                    className="group flex items-center gap-4 overflow-hidden transition-colors"
                    href={`/profile/${createdBy.id}`}
                >
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted-foreground/20">
                        {createdBy.image ? (
                            <Image
                                alt={createdBy.username || "User avatar"}
                                height={48}
                                src={createdBy.image}
                                width={48}
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                <span className="text-2xl uppercase">
                                    {createdBy.username?.charAt(0) ?? "?"}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="group flex flex-col items-start gap-1 overflow-hidden text-left">
                        <span className="text-xs text-muted-foreground">
                            Created by
                        </span>
                        <div className="flex items-center gap-4">
                            <span className="w-full truncate text-sm group-hover:text-primary group-hover:underline">
                                {createdBy.username || "Unknown"}
                            </span>
                            {createdBy.role === "TEACHER" ? (
                                <Badge className="pointer-events-none bg-primary/20 px-2 py-0 text-xs text-primary">
                                    Teacher
                                </Badge>
                            ) : null}
                        </div>
                    </div>
                </Link>
                <div className="flex gap-2">
                    <Dialog>
                        <Dialog.Trigger asChild>
                            <Button
                                className="shrink-0 max-sm:ml-auto"
                                variant="outline"
                            >
                                <Share2Icon size={24} />
                                <span>Share</span>
                            </Button>
                        </Dialog.Trigger>
                        <Dialog.Content>
                            <Dialog.Header className="text-xl sm:text-2xl">
                                Share this study set with others!
                            </Dialog.Header>
                            <div className="flex flex-col gap-4">
                                <QRCode
                                    className="mx-auto"
                                    value={studySetUrl}
                                />
                                <div className="flex flex-row items-center gap-2">
                                    <Separator
                                        className="flex-1"
                                        orientation="horizontal"
                                    />
                                    <span className="text-muted-foreground">
                                        or copy the link below
                                    </span>
                                    <Separator
                                        className="flex-1"
                                        orientation="horizontal"
                                    />
                                </div>
                                <div className="flex w-full items-center gap-2">
                                    <Input
                                        className="w-full"
                                        readOnly
                                        value={studySetUrl}
                                    />

                                    <Button
                                        className="h-12 w-12 shrink-0"
                                        onClick={() => {
                                            navigator.clipboard
                                                .writeText(studySetUrl)
                                                .then(() => {
                                                    toast({
                                                        title: "Copied to clipboard",
                                                    });
                                                })
                                                .catch(() => undefined);
                                        }}
                                        size="icon"
                                        variant="outline"
                                    >
                                        <CopyIcon size={24} />
                                    </Button>
                                </div>
                            </div>
                            <Dialog.Footer className="gap-y-2">
                                <Dialog.Close asChild>
                                    <Button variant="outline">Done</Button>
                                </Dialog.Close>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog>
                    {belongsToCurrentUser ? (
                        <Tooltip content="Edit">
                            <Button
                                asChild
                                className="shrink-0"
                                size="icon"
                                variant="outline"
                            >
                                <Link href={`/edit-set/${studySetId}`}>
                                    <PencilIcon size={24} />
                                    <span className="sr-only">
                                        Edit study set
                                    </span>
                                </Link>
                            </Button>
                        </Tooltip>
                    ) : null}
                    {belongsToCurrentUser ? (
                        <>
                            <Tooltip content="Delete">
                                <Button
                                    className="shrink-0"
                                    onClick={() => {
                                        setDeleteOpen(true);
                                    }}
                                    size="icon"
                                    variant="outline"
                                >
                                    <Trash2Icon size={24} />
                                    <span className="sr-only">
                                        Delete study set
                                    </span>
                                </Button>
                            </Tooltip>
                            <Dialog
                                onOpenChange={setDeleteOpen}
                                open={deleteOpen}
                            >
                                <Dialog.Content className="max-w-full sm:max-w-lg">
                                    <Dialog.Header className="text-xl sm:text-2xl">
                                        Are you sure you want to delete this
                                        study set?
                                    </Dialog.Header>
                                    <Dialog.Description>
                                        This action cannot be undone. This will
                                        permanently delete this study set.
                                    </Dialog.Description>
                                    <Dialog.Footer className="gap-y-2">
                                        <Button
                                            onClick={() => {
                                                handleDelete();
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
                        </>
                    ) : null}
                </div>
            </div>
        </TooltipProvider>
    );
}
