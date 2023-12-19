import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { studySetSchema } from "@/server/schemas/study-set";

export const studySetRouter = createTRPCRouter({
    create: protectedProcedure
        .input(studySetSchema)
        .mutation(async ({ ctx, input }) => {
            // simulate a slow db call
            await new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });

            return ctx.db.studySet.create({
                data: {
                    name: input.name,
                    description: input.description,
                    createdBy: { connect: { id: ctx.session.user.id } },
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
        .input(studySetSchema)
        .mutation(async ({ ctx, input }) => {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });

            console.log(input.cards);

            return ctx.db.studySet.update({
                where: { id: input.id, createdById: ctx.session.user.id },
                data: {
                    name: input.name,
                    description: input.description,
                    cards: {
                        deleteMany: {
                            studySetId: input.id,
                            NOT: input.cards.map((card) => ({ id: card.id })),
                        },
                        upsert: input.cards.map((card, i) => ({
                            where: { id: card.id || -1 },
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
    getOwnList: protectedProcedure.query(async ({ ctx }) => {
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });

        return ctx.db.studySet.findMany({
            where: { createdBy: { id: ctx.session.user.id } },
        });
    }),
    getStudySet: protectedProcedure
        .input(z.number())
        .query(async ({ ctx, input }) => {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });

            return ctx.db.studySet.findUnique({
                where: { id: input },
                include: {
                    cards: {
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
