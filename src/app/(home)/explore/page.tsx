import Image from "next/image";

import type { Metadata } from "next";

import { Separator } from "@/components/ui/separator";
import { api } from "@/trpc/server";

import { StudySetCard } from "../_components/cards";
import { StudySetFilters } from "../_components/forms/study-set-filter";

interface ExplorePageProps {
    searchParams: Record<string, string | undefined>;
}

export async function generateMetadata(
    { searchParams }: ExplorePageProps,
    // parent: ResolvingMetadata,
): Promise<Metadata> {
    const { area: areaId, subject: subjectId } = searchParams;

    const area = areaId ? await api.meta.getArea.query({ areaId }) : undefined;
    const subject = subjectId
        ? await api.meta.getSubject.query({ subjectId })
        : undefined;

    const title = subjectId ? subject?.name : area?.name;

    return {
        title: `${
            title ? `${title} study sets` : "Explore study sets"
        } | FlipQuiz`,
    };
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
    const { area: areaId, subject: subjectId } = searchParams;

    const studySets = await api.studySet.get.filtered.query({
        areaId,
        subjectId,
    });

    const areas = await api.meta.getAreas.query();
    const subjects = await api.meta.getSubjects.query();

    const title = subjectId
        ? subjects.find((s) => s.id === subjectId)?.name
        : areas.find((a) => a.id === areaId)?.name;

    return (
        <div className="container flex h-full flex-col">
            <h1 className="mb-8 text-xl sm:text-2xl">
                {title ? `${title} study sets` : "Explore study sets"}
            </h1>
            <StudySetFilters
                selectedArea={areaId}
                selectedSubject={subjectId}
            />
            <Separator className="my-8 h-0.5" />
            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {studySets.length ? (
                    studySets.map((studySet) => (
                        <StudySetCard
                            createdBy={studySet.createdBy}
                            key={studySet.id}
                            name={studySet.name}
                            studySetId={studySet.id}
                            termsCount={studySet._count.cards}
                        />
                    ))
                ) : (
                    <div className="col-span-3 flex h-full items-center justify-center text-xl">
                        <div className="flex flex-1 flex-col items-center justify-center gap-8">
                            <Image
                                alt="Empty"
                                height={300}
                                src="/images/empty.svg"
                                width={300}
                            />
                            <h1 className="text-lg sm:text-xl">
                                No study sets found
                            </h1>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
