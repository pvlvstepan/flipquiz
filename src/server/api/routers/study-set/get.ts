import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";
import {
    getFilteredStudySetsInput,
    getStudySetInput,
} from "@/server/schemas/study-set";

interface SortItem {
    rating: number;
    ratingsCount: number;
}

const weightedSort = (
    a: SortItem,
    b: SortItem,
    weightAverage: number,
    weightCount: number,
) => {
    const weightedScoreA =
        a.rating * weightAverage + a.ratingsCount * weightCount;
    const weightedScoreB =
        b.rating * weightAverage + b.ratingsCount * weightCount;

    return weightedScoreB - weightedScoreA;
};

const weightAverage = 0.8; // Adjust this value based on the importance of average rating
const weightCount = 0.2; // Adjust this value based on the importance of count

export const getStudySetRouter = createTRPCRouter({
    base: publicProcedure
        .input(getStudySetInput)
        .query(async ({ ctx, input }) => {
            return ctx.db.studySet.findUnique({
                where: {
                    id: input.studySetId,
                    createdById: input.userId,
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
                studySet: {},
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
            where: {},
            select: {
                id: true,
                name: true,
                viewsCount: true,
                createdBy: {
                    select: {
                        username: true,
                        role: true,
                        image: true,
                    },
                },
            },
            orderBy: {
                viewsCount: "desc",
            },
            take: 10,
        });
    }),
    topRated: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.studySet
            .findMany({
                select: {
                    id: true,
                    name: true,
                    createdBy: {
                        select: {
                            username: true,
                            role: true,
                            image: true,
                        },
                    },
                    rating: true,
                    ratingsCount: true,
                },
            })
            .then((studySets) =>
                studySets
                    .sort((a, b) =>
                        weightedSort(a, b, weightAverage, weightCount),
                    )
                    .slice(0, 10),
            );
    }),
    topCreators: protectedProcedure.query(async ({ ctx }) => {
        const topCreators = await ctx.db.studySet.groupBy({
            by: ["createdById"],
            where: {},
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
    filtered: publicProcedure
        .input(getFilteredStudySetsInput)
        .query(async ({ ctx, input }) => {
            return ctx.db.studySet.findMany({
                where: {
                    areaId: input.areaId,
                    subjectId: input.subjectId,
                    createdById: input.userId,
                },
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
            });
        }),
});
