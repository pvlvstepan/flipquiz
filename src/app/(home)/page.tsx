import { redirect } from "next/navigation";

import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
    const session = await getServerAuthSession();

    if (!session) {
        return redirect("/auth/sign-in");
    }

    return null;

    // return (
    //     <div className="flex flex-col gap-y-16">
    //         {recentStudySets.length ? (
    //             <div>
    //                 <h1 className="mb-4 text-xl sm:text-2xl">
    //                     Recently studied
    //                 </h1>
    //                 <CardSwiper>
    //                     {recentStudySets.map(({ studySet }) => (
    //                         <StudySetCard
    //                             createdBy={studySet.createdBy}
    //                             key={studySet.id}
    //                             name={studySet.name}
    //                             studySetId={studySet.id}
    //                             termsCount={studySet._count.cards}
    //                         />
    //                     ))}
    //                 </CardSwiper>
    //             </div>
    //         ) : null}
    //         {popularStudySets.length ? (
    //             <div>
    //                 <h1 className="mb-4 text-xl sm:text-2xl">
    //                     Popular study sets
    //                 </h1>
    //                 <CardSwiper>
    //                     {popularStudySets.map((studySet) => (
    //                         <StudySetCard
    //                             createdBy={studySet.createdBy}
    //                             key={studySet.id}
    //                             name={studySet.name}
    //                             studySetId={studySet.id}
    //                             viewsCount={studySet._count.views}
    //                         />
    //                     ))}
    //                 </CardSwiper>
    //             </div>
    //         ) : null}

    //         {topRatedStudySets.length ? (
    //             <div>
    //                 <h1 className="mb-4 text-xl sm:text-2xl">
    //                     Top reviewed sets
    //                 </h1>
    //                 <CardSwiper>
    //                     {topRatedStudySets.map((studySet) => (
    //                         <StudySetCard
    //                             createdBy={studySet.createdBy}
    //                             key={studySet.id}
    //                             name={studySet.name}
    //                             rating={{
    //                                 count: studySet.reviews.length,
    //                                 average:
    //                                     studySet.reviews.reduce(
    //                                         (acc, review) =>
    //                                             acc + review.rating,
    //                                         0,
    //                                     ) / studySet.reviews.length,
    //                             }}
    //                             studySetId={studySet.id}
    //                         />
    //                     ))}
    //                 </CardSwiper>
    //             </div>
    //         ) : null}
    //         <div>
    //             <h1 className="mb-4 text-xl sm:text-2xl">Top creators</h1>
    //             <CardSwiper>
    //                 {recentStudySets.map(({ studySet }) => (
    //                     <StudySetCard
    //                         createdBy={studySet.createdBy}
    //                         key={studySet.id}
    //                         name={studySet.name}
    //                         studySetId={studySet.id}
    //                         termsCount={studySet._count.cards}
    //                     />
    //                 ))}
    //             </CardSwiper>
    //         </div>
    //     </div>
    // );
}
