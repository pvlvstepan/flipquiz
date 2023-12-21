import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

import {
    CardSwiper,
    StudySetBreadcrumbs,
    StudySetCreatorInfo,
    StudySetModes,
    StudySetStats,
    StudySetTerms,
} from "@/app/(home)/_components/sections/study-set";
import { StudySetComments } from "@/app/(home)/_components/sections/study-set/comments";
import { Separator } from "@/components/ui/separator";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

interface StudySetPageProps {
    params: {
        id: string;
    };
}

export default async function StudySetPage({ params }: StudySetPageProps) {
    const session = await getServerAuthSession();

    if (!session) {
        return redirect(
            `/auth/sign-in?callbackUrl=${encodeURIComponent(
                `/study-set/${params.id}`,
            )}`,
        );
    }

    const studySet = await api.studySet.get.base.query({
        studySetId: params.id,
    });

    if (!studySet) {
        return notFound();
    }

    const incrementViews = async () => {
        "use server";

        return api.studySet.views.incrementViews
            .mutate({
                studySetId: studySet.id,
            })
            .then(() => {
                revalidatePath(`/study-set/${studySet.id}`);
                revalidatePath("/latest");
            });
    };

    const comments = await api.studySet.comment.getStudySetComments.query({
        studySetId: params.id,
    });

    const belongsToCurrentUser = studySet.createdBy.id === session.user.id;

    return (
        <div className="container max-w-3xl p-0">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <StudySetBreadcrumbs
                        areaId={studySet.areaId}
                        subjectId={studySet.subjectId}
                    />
                    <h1 className="text-2xl sm:text-3xl">{studySet.name}</h1>
                    <StudySetStats studySetId={studySet.id} />
                </div>
                <div className="flex flex-col-reverse gap-8 md:flex-col">
                    <StudySetModes studySetId={studySet.id} />
                    <CardSwiper
                        cards={studySet.cards}
                        onViewsIncrement={incrementViews}
                        studySetId={studySet.id}
                    />
                </div>
                <StudySetCreatorInfo
                    belongsToCurrentUser={belongsToCurrentUser}
                    createdBy={studySet.createdBy}
                    studySetId={studySet.id}
                />
                {studySet.description ? (
                    <p className="whitespace-pre-line text-base font-normal text-muted-foreground">
                        {studySet.description}
                    </p>
                ) : null}
                <StudySetTerms
                    belongsToCurrentUser={belongsToCurrentUser}
                    cards={studySet.cards}
                    studySetId={studySet.id}
                />
                <Separator className="h-0.5" />
                <StudySetComments
                    comments={comments.map((comment) => ({
                        content: comment.content,
                        createdAt: comment.createdAt,
                        id: comment.id,
                        user: comment.user,
                    }))}
                    creatorId={studySet.createdBy.id}
                    currentUserId={session.user.id}
                    studySetId={studySet.id}
                />
            </div>
        </div>
    );
}
