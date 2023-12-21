import { CardSwiper, StudySetCard } from "@/app/(home)/_components/cards";
import { api } from "@/trpc/server";

export async function RecentStudySets() {
    const recentStudySets = await api.studySet.get.recent.query();

    return recentStudySets.length ? (
        <div>
            <h1 className="mb-8 text-xl sm:text-2xl">Recently studied</h1>
            <CardSwiper>
                {recentStudySets.map(({ studySet }) => (
                    <StudySetCard
                        createdBy={studySet.createdBy}
                        key={studySet.id}
                        name={studySet.name}
                        studySetId={studySet.id}
                        termsCount={studySet._count.cards}
                    />
                ))}
            </CardSwiper>
        </div>
    ) : null;
}
