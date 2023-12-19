import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const areaRouter = createTRPCRouter({
    getAreas: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.area.findMany({
            select: {
                id: true,
                name: true,
            },
        });
    }),
});
