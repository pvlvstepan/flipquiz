import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import {
    createStudySetInput,
    deleteStudySetInput,
    updateStudySetInput,
} from "@/server/schemas/study-set";

export const studySetManageRouter = createTRPCRouter({
    create: protectedProcedure
        .input(createStudySetInput)
        .mutation(async ({ ctx, input }) => {
            return ctx.db.studySet.create({
                data: {
                    name: input.name,
                    description: input.description,
                    createdBy: { connect: { id: ctx.session.user.id } },
                    subject: { connect: { id: input.subjectId } },
                    area: { connect: { id: input.areaId } },
                    cards: {
                        create: input.cards.map((card, i) => ({
                            term: card.term,
                            definition: card.definition,
                            order: i,
                        })),
                    },
                },
            });
        }),
    update: protectedProcedure
        .input(updateStudySetInput)
        .mutation(async ({ ctx, input }) => {
            return ctx.db.studySet.update({
                where: { id: input.id, createdById: ctx.session.user.id },
                data: {
                    name: input.name,
                    description: input.description,
                    subject: { connect: { id: input.subjectId } },
                    cards: {
                        upsert: input.cards.map((card, i) => ({
                            where: { id: card.id },
                            update: {
                                term: card.term,
                                definition: card.definition,
                                order: i,
                            },
                            create: {
                                term: card.term,
                                definition: card.definition,
                                order: i,
                            },
                        })),
                    },
                },
            });
        }),
    delete: protectedProcedure
        .input(deleteStudySetInput)
        .mutation(async ({ ctx, input }) => {
            return ctx.db.studySet.update({
                where: {
                    id: input.studySetId,
                    createdById: ctx.session.user.id,
                },
                data: {
                    deleted: true,
                    deletedAt: new Date(),
                },
            });
        }),
});
