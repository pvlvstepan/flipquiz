import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getStudySetInput } from "@/server/schemas/study-set";

interface SortItem {
    rating: {
        average: number;
        count: number;
    };
}

const weightedSort = (
    a: SortItem,
    b: SortItem,
    weightAverage: number,
    weightCount: number,
) => {
    const weightedScoreA =
        a.rating.average * weightAverage + a.rating.count * weightCount;
    const weightedScoreB =
        b.rating.average * weightAverage + b.rating.count * weightCount;

    return weightedScoreB - weightedScoreA;
};

const weightAverage = 0.8; // Adjust this value based on the importance of average rating
const weightCount = 0.2; // Adjust this value based on the importance of count

export const getStudySetRouter = createTRPCRouter({
    base: protectedProcedure
        .input(getStudySetInput)
        .query(async ({ ctx, input }) => {
            return ctx.db.studySet.findUnique({
                where: {
                    id: input.studySetId,
                    createdById: input.userId,
                    deleted: false,
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    subjectId: true,
                    areaId: true,
                    cards: {
                        select: {
                            id: true,
                            term: true,
                            definition: true,
                        },
                        orderBy: {
                            order: "asc",
                        },
                    },
                    createdBy: {
                        select: {
                            id: true,
                            username: true,
                            role: true,
                            image: true,
                        },
                    },
                },
            });
        }),
    recent: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.view.findMany({
            where: {
                userId: ctx.session.user.id,
                studySet: {
                    deleted: false,
                },
            },
            select: {
                studySet: {
                    select: {
                        id: true,
                        name: true,
                        _count: {
                            select: {
                                cards: true,
                            },
                        },
                        createdBy: {
                            select: {
                                username: true,
                                role: true,
                                image: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
        });
    }),
    popular: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.studySet.findMany({
            where: {
                deleted: false,
            },
            select: {
                id: true,
                name: true,
                _count: {
                    select: {
                        views: true,
                    },
                },
                createdBy: {
                    select: {
                        username: true,
                        role: true,
                        image: true,
                    },
                },
            },
            orderBy: {
                views: {
                    _count: "desc",
                },
            },
            take: 10,
        });
    }),
    topRated: protectedProcedure.query(async ({ ctx }) => {
        const topRated = await ctx.db.rating.groupBy({
            by: ["studySetId"],
            where: {
                studySet: {
                    deleted: false,
                },
            },
            orderBy: {
                _avg: {
                    rating: "desc",
                },
            },
        });

        return ctx.db.studySet
            .findMany({
                where: {
                    id: {
                        in: topRated.map((rating) => rating.studySetId),
                    },
                    deleted: false,
                },
                select: {
                    id: true,
                    name: true,
                    ratings: {
                        select: {
                            rating: true,
                        },
                    },
                    createdBy: {
                        select: {
                            username: true,
                            role: true,
                            image: true,
                        },
                    },
                },
            })
            .then((studySets) =>
                studySets
                    .map((studySet) => {
                        const avg =
                            studySet.ratings.reduce(
                                (sum, rating) => sum + rating.rating,
                                0,
                            ) / studySet.ratings.length;

                        return {
                            ...studySet,
                            rating: {
                                average: avg,
                                count: studySet.ratings.length,
                            },
                        };
                    })
                    .sort((a, b) =>
                        weightedSort(a, b, weightAverage, weightCount),
                    )
                    .slice(0, 10),
            );
    }),
    topCreators: protectedProcedure.query(async ({ ctx }) => {
        const topCreators = await ctx.db.studySet.groupBy({
            by: ["createdById"],
            where: {
                deleted: false,
            },
            orderBy: {
                _count: {
                    createdById: "desc",
                },
            },
        });

        return ctx.db.user.findMany({
            where: {
                id: {
                    in: topCreators.map((studySet) => studySet.createdById),
                },
            },
            take: 10,
            select: {
                id: true,
                username: true,
                role: true,
                image: true,
                _count: {
                    select: {
                        studySets: true,
                    },
                },
            },
            orderBy: {
                studySets: {
                    _count: "desc",
                },
            },
        });
    }),
});
