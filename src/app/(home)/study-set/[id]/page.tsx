import {
    BookOpenCheckIcon,
    BrainCircuitIcon,
    CopyIcon,
    LayoutGridIcon,
    MessageSquareIcon,
    UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

import {
    CardSwiper,
    RatingControl,
    StudySetComments,
    StudySetCreatorInfo,
    StudySetTerms,
} from "./components";

interface StudySetPageProps {
    params: {
        id: string;
    };
}

export default async function StudySetPage({ params }: StudySetPageProps) {
    const session = await getServerAuthSession();

    if (!session) {
        return null; // TODO: auth redirect
    }

    const studySet = await api.studySet.getStudySet.query({
        id: parseInt(params.id),
    });

    if (!studySet) {
        return notFound();
    }

    await api.studySet.incrementViews.query({ id: studySet.id });

    const belongsToCurrentUser = session.user.id === studySet.createdBy.id;

    return (
        <div className="container max-w-3xl p-0">
            <div className="mb-8 flex flex-col gap-y-2 sm:gap-y-4">
                <h1 className="text-2xl sm:text-3xl">{studySet.name}</h1>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <UsersIcon size={16} />
                        <span>{studySet.views} people studied this</span>
                    </div>
                    <RatingControl
                        belongsToCurrentUser={belongsToCurrentUser}
                        rating={studySet.reviews.average}
                        reviewsCount={studySet.reviews.count}
                        studySetId={studySet.id}
                    />
                    <Button
                        asChild
                        className="h-auto p-0 text-muted-foreground hover:text-primary"
                        size="sm"
                        variant="link"
                    >
                        <Link href="#comments" prefetch={false}>
                            <MessageSquareIcon
                                className="fill-primary text-primary"
                                size={16}
                            />
                            <span>({studySet.comments.length}) comments</span>
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="flex flex-col-reverse gap-8 md:flex-col">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                    <Button
                        className="justify-start px-3 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                        size="lg"
                        variant="outline"
                    >
                        <CopyIcon size={24} />
                        <span>Flashcards</span>
                    </Button>
                    <Button
                        className="justify-start px-3 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                        size="lg"
                        variant="outline"
                    >
                        <BrainCircuitIcon size={24} />
                        <span>Learn</span>
                    </Button>
                    <Button
                        className="justify-start px-3 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                        size="lg"
                        variant="outline"
                    >
                        <BookOpenCheckIcon size={24} />
                        <span>Test</span>
                    </Button>
                    <Button
                        className="justify-start px-3 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                        size="lg"
                        variant="outline"
                    >
                        <LayoutGridIcon size={24} />
                        <span>Match</span>
                    </Button>
                </div>
                <CardSwiper cards={studySet.cards} />
            </div>
            <StudySetCreatorInfo
                belongsToCurrentUser={belongsToCurrentUser}
                createdBy={studySet.createdBy}
                studySetId={studySet.id}
            />
            <StudySetTerms
                belongsToCurrentUser={belongsToCurrentUser}
                cards={studySet.cards}
                studySetId={studySet.id}
            />
            <Separator className="mb-8 h-0.5" />
            <StudySetComments
                comments={studySet.comments}
                currentUserId={session.user.id}
                studySetId={studySet.id}
            />
        </div>
    );
}
