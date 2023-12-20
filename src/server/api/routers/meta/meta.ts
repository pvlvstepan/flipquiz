import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getAreaInput, getSubjectInput } from "@/server/schemas/meta";

export const metaRouter = createTRPCRouter({
    getAreas: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.area.findMany({
            select: {
                id: true,
                name: true,
            },
        });
    }),
    getArea: publicProcedure
        .input(getAreaInput)
        .query(async ({ ctx, input }) => {
            return ctx.db.area.findUnique({
                where: {
                    id: input.areaId,
                },
                select: {
                    id: true,
                    name: true,
                },
            });
        }),
    getSubjects: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.subject.findMany({
            select: {
                id: true,
                name: true,
                areaId: true,
            },
        });
    }),
    getSubject: publicProcedure
        .input(getSubjectInput)
        .query(async ({ ctx, input }) => {
            return ctx.db.subject.findUnique({
                where: {
                    id: input.subjectId,
                },
                select: {
                    id: true,
                    name: true,
                    areaId: true,
                },
            });
        }),
});
