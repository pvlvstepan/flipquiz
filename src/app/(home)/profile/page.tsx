import Image from "next/image";
import { redirect } from "next/navigation";

import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

import { StudySetCard } from "../_components/cards";
import { RecentStudySets } from "../_components/sections/home";

export async function generateMetadata(): Promise<Metadata> {
    const session = await getServerAuthSession();

    return {
        title: `${session?.user.username} | FlipQuiz`,
    };
}

export default async function UserProfile() {
    const session = await getServerAuthSession();

    if (!session) {
        return redirect(
            `/auth/sign-in?callbackUrl=${encodeURIComponent("/profile")}`,
        );
    }

    const { user } = session;

    const myStudySets = await api.studySet.get.filtered.query({
        userId: user.id,
    });

    return (
        <div className="flex flex-col gap-8">
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
            <RecentStudySets />
            {myStudySets.length ? (
                <>
                    <h1 className="text-xl sm:text-2xl">My study sets</h1>
                    <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {myStudySets.map((studySet) => (
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
