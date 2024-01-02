import { Achievement } from "@prisma/client";

import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const studyStreakRouter = createTRPCRouter({
    getStudyStreak: protectedProcedure.query(async ({ ctx }) => {
        const { user } = ctx.session;

        const streaks = await ctx.db.studyStreak.findMany({
            where: {
                userId: user.id,
            },
            select: {
                createdAt: true,
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        // record today's study streak if it doesn't exist

        const today = new Date();
        const todayString = today.toISOString().slice(0, 10);

        const streaksString = streaks.map((streak) => {
            const streakDate = new Date(streak.createdAt);
            return streakDate.toISOString().slice(0, 10);
        });

        if (!streaksString.includes(todayString)) {
            await ctx.db.studyStreak.create({
                data: {
                    createdAt: today,
                    userId: user.id,
                },
            });
        }

        // calculate number of consecutive days studied

        const streakCount = streaks.reduce((acc, curr, index, str) => {
            if (index === 0) {
                return 1;
            }

            const prev = str[index - 1];

            if (prev) {
                const currDate = new Date(curr.createdAt);
                const prevDate = new Date(prev.createdAt);

                const diff = currDate.getTime() - prevDate.getTime();
                const diffInDays = diff / (1000 * 3600 * 24);

                if (diffInDays === 1) {
                    return acc + 1;
                }
            } else {
                return acc;
            }

            return acc;
        }, 0);

        console.log(streaks);

        if (streakCount >= 30) {
            await ctx.db.userAchievement.upsert({
                where: {
                    userId_achievement: {
                        userId: user.id,
                        achievement: Achievement.THIRTY_DAY_STREAK,
                    },
                },
                create: {
                    achievement: Achievement.THIRTY_DAY_STREAK,
                    userId: user.id,
                },
                update: {},
            });
        } else if (streakCount >= 14) {
            await ctx.db.userAchievement.upsert({
                where: {
                    userId_achievement: {
                        userId: user.id,
                        achievement: Achievement.FOURTEEN_DAY_STREAK,
                    },
                },
                create: {
                    achievement: Achievement.FOURTEEN_DAY_STREAK,
                    userId: user.id,
                },
                update: {},
            });
        } else if (streakCount >= 7) {
            await ctx.db.userAchievement.upsert({
                where: {
                    userId_achievement: {
                        userId: user.id,
                        achievement: Achievement.SEVEN_DAY_STREAK,
                    },
                },
                create: {
                    achievement: Achievement.SEVEN_DAY_STREAK,
                    userId: user.id,
                },
                update: {},
            });
        } else if (streakCount >= 3) {
            await ctx.db.userAchievement.upsert({
                where: {
                    userId_achievement: {
                        userId: user.id,
                        achievement: Achievement.THREE_DAY_STREAK,
                    },
                },
                create: {
                    achievement: Achievement.THREE_DAY_STREAK,
                    userId: user.id,
                },
                update: {},
            });
        }

        return { streaks, streakCount };
    }),
});
