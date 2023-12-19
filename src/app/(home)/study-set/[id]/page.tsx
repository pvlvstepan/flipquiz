import {
    BookOpenCheckIcon,
    BrainCircuitIcon,
    CopyIcon,
    LayoutGridIcon,
    MessageSquareIcon,
    StarIcon,
    UsersIcon,
} from "lucide-react";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

import { StudySetCreatorInfo } from "./creator-info";
import { CardSwiper } from "./swiper";
import { StudySetTerms } from "./terms";

interface StudySetPageProps {
    params: {
        id: string;
    };
}

export default async function StudySetPage({ params }: StudySetPageProps) {
    const session = await getServerAuthSession();

    if (!session) {
        // TODO: auth redirect
    }

    const studySet = await api.studySet.getStudySet.query(parseInt(params.id));

    if (!studySet) {
        return notFound();
    }

    const belongsToCurrentUser = session?.user.id === studySet.createdBy.id;

    return (
        <div className="container max-w-3xl p-0">
            <div className="mb-8 flex flex-col gap-y-2 sm:gap-y-4">
                <h1 className="text-2xl sm:text-3xl">{studySet.name}</h1>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <UsersIcon size={16} />
                        <span>1111 people studied this</span>
                    </div>
                    <Button
                        className="h-auto p-0 text-muted-foreground hover:text-primary"
                        size="sm"
                        variant="link"
                    >
                        <StarIcon
                            className="fill-yellow-500 text-yellow-500"
                            size={16}
                        />
                        <span>2.6 (388 reviews)</span>
                    </Button>
                    <Button
                        className="h-auto p-0 text-muted-foreground hover:text-primary"
                        size="sm"
                        variant="link"
                    >
                        <MessageSquareIcon
                            className="fill-primary text-primary"
                            size={16}
                        />
                        <span>30 comments</span>
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
        </div>
    );
}
