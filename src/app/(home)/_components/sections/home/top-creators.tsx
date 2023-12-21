import { CardSwiper, CreatorCard } from "@/app/(home)/_components/cards";
import { api } from "@/trpc/server";

export async function TopCreators() {
    const topCreators = await api.studySet.get.topCreators.query();

    return topCreators.length ? (
        <div>
            <h1 className="mb-8 text-xl sm:text-2xl">Top creators</h1>
            <CardSwiper>
                {topCreators.map((creator) => (
                    <CreatorCard
                        key={creator.id}
                        studySetsCount={creator._count.studySets}
                        user={{
                            id: creator.id,
                            image: creator.image,
                            name: creator.name,
                        }}
                    />
                ))}
            </CardSwiper>
        </div>
    ) : null;
}
