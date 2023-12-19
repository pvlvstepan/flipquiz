import { redirect } from "next/navigation";

import { CardSwiper } from "@/components/layouts/home/sections/card-swiper";
import { StudySetCard } from "@/components/layouts/home/sections/study-set-card";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function Home() {
    const session = await getServerAuthSession();

    if (!session) {
        return redirect("/auth/sign-in");
    }

    const studySets = await api.studySet.getRecentList.query();

    console.log(studySets);

    return (
        <div className="flex flex-col gap-y-8">
            <div>
                <h1 className="mb-4 text-xl sm:text-2xl">Recently studied</h1>
                <CardSwiper>
                    {studySets.map(({ studySet }) => (
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
        </div>
    );
}
