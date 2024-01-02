import Image from "next/image";
import { notFound, redirect } from "next/navigation";

import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { api } from "@/trpc/server";

import { StudySetCard } from "../../_components/cards";

interface UserProfilePageProps {
    params: {
        id: string;
    };
}

export async function generateMetadata({
    params,
}: UserProfilePageProps): Promise<Metadata> {
    const user = await db.user.findUnique({
        where: {
            id: params.id,
        },
        select: {
            id: true,
            username: true,
            image: true,
            role: true,
        },
    });

    if (!user) {
        return notFound();
    }

    return {
        title: `${user.username} | FlipQuiz`,
    };
}

export default async function UserProfile({ params }: UserProfilePageProps) {
    const session = await getServerAuthSession();

    if (!session) {
        return redirect(
            `/auth/sign-in?callbackUrl=${encodeURIComponent("/profile")}`,
        );
    }

    if (params.id === session.user.id) {
        return redirect("/profile");
    }

    const user = await db.user.findUnique({
        where: {
            id: params.id,
        },
        select: {
            id: true,
            username: true,
            image: true,
            role: true,
        },
    });

    if (!user) {
        return notFound();
    }

    const userStudySets = await api.studySet.get.filtered.query({
        userId: user.id,
    });

    return (
        <div className="container flex flex-col gap-8">
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:gap-4">
                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full bg-muted-foreground/20 sm:h-16 sm:w-16">
                    {user.image ? (
                        <Image
                            alt={user.username}
                            layout="fill"
                            src={user.image}
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            <span className="text-2xl uppercase">
                                {user.username.charAt(0)}
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-center gap-4 sm:items-start sm:gap-2">
                    <h1 className="text-2xl">{user.username}</h1>
                    {user.role === "TEACHER" ? (
                        <Badge className="pointer-events-none bg-primary/20 px-2 py-0 text-xs text-primary">
                            Teacher
                        </Badge>
                    ) : null}
                </div>
            </div>
            <Separator className="h-0.5" />
            {userStudySets.length ? (
                <>
                    <h1 className="text-xl sm:text-2xl">Study sets</h1>
                    <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {userStudySets.map((studySet) => (
                            <StudySetCard
                                key={studySet.id}
                                name={studySet.name}
                                studySetId={studySet.id}
                                termsCount={studySet._count.views}
                            />
                        ))}
                    </div>
                </>
            ) : null}
        </div>
    );
}
