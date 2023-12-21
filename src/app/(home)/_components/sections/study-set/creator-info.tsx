"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
    CopyIcon,
    FlagIcon,
    PencilIcon,
    Share2Icon,
    Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import QRCode from "react-qr-code";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tooltip } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

interface StudySetCreatorInfoProps {
    createdBy: {
        username: string | null;
        id: string;
        image: string | null;
    };
    studySetId: string;
    belongsToCurrentUser: boolean;
}

export function StudySetCreatorInfo({
    createdBy,
    studySetId,
    belongsToCurrentUser,
}: StudySetCreatorInfoProps) {
    const { toast } = useToast();

    const studySetUrl = useMemo(
        () =>
            typeof window !== "undefined"
                ? `${window.location.origin}/study-set/${studySetId}`
                : "",
        [studySetId],
    );

    return (
        <TooltipProvider>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <button
                    className="group flex w-full items-center gap-4 overflow-hidden transition-colors"
                    type="button"
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
                    <div className="flex flex-col items-start overflow-hidden text-left">
                        <span className="text-xs text-muted-foreground">
                            Created by
                        </span>
                        <span className="w-full truncate text-sm group-hover:text-primary group-hover:underline">
                            {createdBy.username || "Unknown"}
                        </span>
                    </div>
                </button>
                <div className="flex gap-2 max-sm:w-full max-sm:flex-row-reverse">
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
                    {!belongsToCurrentUser ? (
                        <Tooltip content="Report">
                            <Button
                                className="shrink-0"
                                size="icon"
                                variant="outline"
                            >
                                <FlagIcon size={24} />
                                <span className="sr-only">
                                    Report study set
                                </span>
                            </Button>
                        </Tooltip>
                    ) : (
                        <Tooltip content="Delete">
                            <Button
                                className="shrink-0"
                                size="icon"
                                variant="outline"
                            >
                                <Trash2Icon size={24} />
                                <span className="sr-only">
                                    Delete study set
                                </span>
                            </Button>
                        </Tooltip>
                    )}
                </div>
            </div>
        </TooltipProvider>
    );
}
