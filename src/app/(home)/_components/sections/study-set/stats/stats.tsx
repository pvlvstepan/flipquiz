import { MessageSquareIcon, UsersIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
import Link from "next/link";

import { api } from "@/trpc/server";

import { StudySetRatingControl } from "./rating-control";

interface StudySetStatsProps {
    studySetId: string;
}

export async function StudySetStats({ studySetId }: StudySetStatsProps) {
    const stats = await api.studySet.stats.query({
        studySetId,
    });

    if (!stats) {
        return null;
    }

    const handleRatingSubmit = async (rating: number) => {
        "use server";

        return api.studySet.rating.addRating
            .mutate({
                rating,
                studySetId,
            })
            .then(() => {
                revalidatePath(`/study-set/${studySetId}`);
            });
    };

    return (
        <div className="flex flex-wrap gap-x-4 gap-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
                <UsersIcon size={16} />
                <span>
                    {stats.views} {stats.views === 1 ? "person" : "people"}{" "}
                    studied this
                </span>
            </div>
            <StudySetRatingControl
                averageRating={stats.averageRating}
                onSubmit={handleRatingSubmit}
                ratings={stats.ratings}
            />
            <Link
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary hover:underline"
                href="#comments"
                prefetch={false}
            >
                <MessageSquareIcon
                    className="fill-primary text-primary"
                    size={16}
                />
                <span>({stats.comments}) comments</span>
            </Link>
        </div>
    );
}
