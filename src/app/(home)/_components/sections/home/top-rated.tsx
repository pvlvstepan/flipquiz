import { CardSwiper, StudySetCard } from "@/app/(home)/_components/cards";
import { api } from "@/trpc/server";

export async function TopRatedStudySets() {
    const topRatedStudySets = await api.studySet.get.topRated.query();

    return topRatedStudySets.length ? (
        <div>
            <h1 className="mb-8 text-xl sm:text-2xl">Top rated study sets</h1>
            <CardSwiper>
                {topRatedStudySets.map((studySet) => (
                    <StudySetCard
                        createdBy={studySet.createdBy}
                        key={studySet.id}
                        name={studySet.name}
                        rating={{
                            average: studySet.rating.average,
                            count: studySet.rating.count,
                        }}
                        studySetId={studySet.id}
                    />
                ))}
            </CardSwiper>
        </div>
    ) : null;
}
