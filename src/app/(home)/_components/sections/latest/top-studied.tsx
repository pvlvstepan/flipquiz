import { CardSwiper, StudySetCard } from "@/app/(home)/_components/cards";
import { api } from "@/trpc/server";

export async function PopularStudySets() {
    const popularStudySets = await api.studySet.get.popular.query();

    return popularStudySets.length ? (
        <div>
            <h1 className="mb-8 text-xl sm:text-2xl">Popular study sets</h1>
            <CardSwiper>
                {popularStudySets.map((studySet) => (
                    <StudySetCard
                        createdBy={studySet.createdBy}
                        key={studySet.id}
                        name={studySet.name}
                        studySetId={studySet.id}
                        viewsCount={studySet._count.views}
                    />
                ))}
            </CardSwiper>
        </div>
    ) : null;
}
