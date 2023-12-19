import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const subjectRouter = createTRPCRouter({
    getSubjects: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.subject.findMany({
            select: {
                id: true,
                name: true,
                areaId: true,
            },
        });
    }),
});
