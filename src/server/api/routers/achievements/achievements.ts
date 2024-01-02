import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const achievementsRouter = createTRPCRouter({
    getAchievements: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.userAchievement.findMany({
            where: {
                userId: ctx.session.user.id,
            },
        });
    }),
});
