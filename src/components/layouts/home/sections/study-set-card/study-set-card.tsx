import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface StudySetCardProps {
    studySetId: string;
    termsCount: number;
    name: string;
    createdBy: {
        name?: string | null;
        image?: string | null;
    };
}

export function StudySetCard({
    studySetId,
    termsCount,
    name,
    createdBy,
}: StudySetCardProps) {
    return (
        <Link className="group/card" href={`/study-set/${studySetId}`}>
            <Card className="relative flex min-h-[180px] flex-col overflow-hidden border-2 shadow-none">
                <Card.Header className="p-4">
                    <Card.Title className="line-clamp-3 text-lg leading-tight">
                        {name}
                    </Card.Title>
                </Card.Header>
                <Card.Content className="flex flex-1 flex-col items-start justify-end p-4">
                    <Badge variant="secondary">
                        {termsCount} term{termsCount === 1 ? "" : "s"}
                    </Badge>
                    <button
                        className="group mt-4 flex w-full items-center gap-2 overflow-hidden transition-colors"
                        type="button"
                    >
                        <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full bg-muted-foreground/20">
                            {createdBy.image ? (
                                <Image
                                    alt={createdBy.name ?? "User avatar"}
                                    height={24}
                                    src={createdBy.image}
                                    width={24}
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                    <span className="text-2xl">
                                        {createdBy.name?.charAt(0) ?? "?"}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex w-full items-center overflow-hidden text-left">
                            <span className="w-full truncate text-sm">
                                {createdBy.name ?? "Unknown"}
                            </span>
                            <Badge className="pointer-events-none bg-primary/20 px-2 py-0 text-xs text-primary">
                                Teacher
                            </Badge>
                        </div>
                    </button>
                </Card.Content>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-primary opacity-0 transition-opacity group-hover/card:opacity-70" />
            </Card>
        </Link>
    );
}
