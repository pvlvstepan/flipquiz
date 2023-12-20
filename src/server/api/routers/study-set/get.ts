import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getStudySetInput } from "@/server/schemas/study-set";

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
                            name: true,
                            image: true,
                        },
                    },
                },
            });
        }),
});
