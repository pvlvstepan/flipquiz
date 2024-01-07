import { Achievement } from "@prisma/client";

import { createTRPCRouter, protectedProcedure } from "../../trpc";

const calculateConsecutiveDays = (datesArray: string[]): number => {
    // Convert dates to timestamp for easy comparison
    const timestamps = datesArray.map((date) => new Date(date).getTime());

    // Sort timestamps in descending order
    timestamps.sort((a, b) => b - a);

    // Calculate consecutive days using reduce
    const consecutiveDays = timestamps.reduce(
        (count, timestamp, index, array) => {
            // prettier-ignore
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- we know that array[index + 1] exists
            if (index < array.length - 1 && (timestamp - (array[index + 1]!)) / (24 * 60 * 60 * 1000) === 1) { 
            return count + 1; 
        }
            return count;
        },
        1,
    );

    return consecutiveDays;
};

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

        const parsed = streaks.map((streak) => {
            return new Date(streak.createdAt).toISOString().slice(0, 10);
        });

        const today = new Date().toISOString().slice(0, 10);

        if (!parsed.includes(today)) {
            await ctx.db.studyStreak.create({
                data: {
                    createdAt: new Date(),
                    userId: user.id,
                },
            });
        }

        const streakCount = calculateConsecutiveDays(parsed);

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
