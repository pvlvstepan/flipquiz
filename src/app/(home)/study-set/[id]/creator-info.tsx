import { MoreHorizontalIcon, PencilIcon, Share2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface StudySetCreatorInfoProps {
    createdBy: {
        name: string | null;
        id: string;
        image: string | null;
    };
    studySetId: number;
    belongsToCurrentUser: boolean;
}

export function StudySetCreatorInfo({
    createdBy,
    studySetId,
    belongsToCurrentUser,
}: StudySetCreatorInfoProps) {
    return (
        <div className="my-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <button
                className="group flex w-full items-center gap-4 overflow-hidden transition-colors"
                type="button"
            >
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted-foreground/20">
                    {createdBy.image ? (
                        <Image
                            alt={createdBy.name ?? "User avatar"}
                            height={48}
                            src={createdBy.image}
                            width={48}
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            <span className="text-2xl">?</span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-start overflow-hidden text-left">
                    <span className="text-xs text-muted-foreground">
                        Created by
                    </span>
                    <span className="w-full truncate text-sm group-hover:text-primary group-hover:underline">
                        {createdBy.name ?? "Unknown"}
                    </span>
                </div>
            </button>
            <div className="flex gap-2">
                <Button className="shrink-0" variant="outline">
                    <Share2Icon size={24} />
                    <span>Share</span>
                </Button>
                {belongsToCurrentUser ? (
                    <Button
                        asChild
                        className="shrink-0"
                        size="icon"
                        variant="outline"
                    >
                        <Link href={`/study-set/update/${studySetId}`}>
                            <PencilIcon size={24} />
                            <span className="sr-only">Edit study set</span>
                        </Link>
                    </Button>
                ) : null}
                <Button className="shrink-0" size="icon" variant="outline">
                    <MoreHorizontalIcon size={24} />
                    <span className="sr-only">More options</span>
                </Button>
            </div>
        </div>
    );
}
