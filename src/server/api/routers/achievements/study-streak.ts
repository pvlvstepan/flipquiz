import { Achievement } from "@prisma/client";

import { createTRPCRouter, protectedProcedure } from "../../trpc";

const calculateCurrentStreak = (datesArray: string[]): number => {
    const timestamps = datesArray.map((date) => new Date(date).getTime());

    // Sort timestamps in ascending order
    timestamps.sort((a, b) => a - b);

    let streak = 1;

    const day = 86400000;

    for (let i = timestamps.length - 1; i > 0; i--) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know it's not null
        if ((timestamps[i]! - timestamps[i - 1]!) / day === 1) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
};

export const studyStreakRouter = createTRPCRouter({
    getStudyStreak: protectedProcedure.query(async ({ ctx }) => {
        const { user } = ctx.session;

        let streaks = await ctx.db.studyStreak.findMany({
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

        const parsed = streaks.map((streak) => {
            return new Date(streak.createdAt).toISOString().slice(0, 10);
        });

        const today = new Date().toISOString().slice(0, 10);

        if (!parsed.includes(today)) {
            await ctx.db.studyStreak
                .create({
                    data: {
                        createdAt: new Date(),
                        userId: user.id,
                    },
                })
                .then((s) => {
                    streaks = [
                        ...streaks,
                        {
                            createdAt: s.createdAt,
                        },
                    ];
                });
        }

        console.log(parsed);

        const streakCount = calculateCurrentStreak(parsed);

        console.log(streakCount);

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
