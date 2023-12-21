import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface StudySetCardProps {
    user: {
        id: string;
        name?: string | null;
        image?: string | null;
    };
    studySetsCount: number;
}

export function CreatorCard({ studySetsCount, user }: StudySetCardProps) {
    return (
        <Link className="group/card" href={`/profile/${user.id}`}>
            <Card className="relative flex min-h-[180px] flex-col overflow-hidden border-2 shadow-none">
                <Card.Header className="p-4">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full bg-muted-foreground/20">
                        {user.image ? (
                            <Image
                                alt={user.name ?? "User avatar"}
                                height={56}
                                src={user.image}
                                width={56}
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                <span className="text-2xl">
                                    {user.name?.charAt(0) ?? "?"}
                                </span>
                            </div>
                        )}
                    </div>
                </Card.Header>
                <Card.Content className="flex flex-1 flex-col items-start justify-end p-4">
                    <div className="group flex w-full items-center gap-2 overflow-hidden transition-colors">
                        <div className="flex w-full items-center overflow-hidden text-left">
                            <Card.Title className="w-full truncate text-lg leading-tight">
                                {user.name ?? "Unknown"}
                            </Card.Title>
                            <Badge className="pointer-events-none bg-primary/20 px-2 py-0 text-xs text-primary">
                                Teacher
                            </Badge>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                        {studySetsCount ? (
                            <Badge variant="secondary">
                                {studySetsCount} study set
                                {studySetsCount === 1 ? "" : "s"}
                            </Badge>
                        ) : null}
                    </div>
                </Card.Content>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-primary opacity-0 transition-opacity group-hover/card:opacity-70" />
            </Card>
        </Link>
    );
}
