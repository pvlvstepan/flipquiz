import { Achievement } from "@prisma/client";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { incrementViewInput } from "@/server/schemas/view";

export const studySetViewsRouter = createTRPCRouter({
    incrementViews: protectedProcedure
        .input(incrementViewInput)
        .mutation(async ({ ctx, input }) => {
            return ctx.db.view
                .upsert({
                    where: {
                        userId_studySetId: {
                            studySetId: input.studySetId,
                            userId: ctx.session.user.id,
                        },
                    },
                    update: {
                        createdAt: new Date(),
                    },
                    create: {
                        userId: ctx.session.user.id,
                        studySetId: input.studySetId,
                        createdAt: new Date(),
                    },
                })
                .then(async () => {
                    const studySetsCount = await ctx.db.view.count({
                        where: {
                            userId: ctx.session.user.id,
                        },
                    });

                    if (studySetsCount >= 100) {
                        await ctx.db.userAchievement.upsert({
                            where: {
                                userId_achievement: {
                                    userId: ctx.session.user.id,
                                    achievement: Achievement.HUNDRED_STUDY_SETS,
                                },
                            },
                            create: {
                                achievement: Achievement.HUNDRED_STUDY_SETS,
                                userId: ctx.session.user.id,
                            },
                            update: {},
                        });
                    } else if (studySetsCount >= 50) {
                        await ctx.db.userAchievement.upsert({
                            where: {
                                userId_achievement: {
                                    userId: ctx.session.user.id,
                                    achievement: Achievement.FIFTY_STUDY_SETS,
                                },
                            },
                            create: {
                                achievement: Achievement.FIFTY_STUDY_SETS,
                                userId: ctx.session.user.id,
                            },
                            update: {},
                        });
                    } else if (studySetsCount >= 25) {
                        await ctx.db.userAchievement.upsert({
                            where: {
                                userId_achievement: {
                                    userId: ctx.session.user.id,
                                    achievement:
                                        Achievement.TWENTY_FIVE_STUDY_SETS,
                                },
                            },
                            create: {
                                achievement: Achievement.TWENTY_FIVE_STUDY_SETS,
                                userId: ctx.session.user.id,
                            },
                            update: {},
                        });
                    } else if (studySetsCount >= 5) {
                        await ctx.db.userAchievement.upsert({
                            where: {
                                userId_achievement: {
                                    userId: ctx.session.user.id,
                                    achievement: Achievement.FIVE_STUDY_SETS,
                                },
                            },
                            create: {
                                achievement: Achievement.FIVE_STUDY_SETS,
                                userId: ctx.session.user.id,
                            },
                            update: {},
                        });
                    }
                });
        }),
});
