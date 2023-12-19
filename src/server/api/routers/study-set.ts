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
                    subject: { connect: { id: input.subjectId } },
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
                    subject: { connect: { id: input.subjectId } },
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
        .input(
            z.object({
                id: z.number(),
            }),
        )
        .query(async ({ ctx, input }) => {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });

            const reviews = await ctx.db.studySetReview.aggregate({
                where: { studySetId: input.id },
                _avg: { rating: true },
                _count: true,
            });

            const views = await ctx.db.studySetView.count({
                where: { studySetId: input.id },
            });

            return ctx.db.studySet
                .findUnique({
                    where: { id: input.id },
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
                        subject: {
                            select: {
                                id: true,
                                name: true,
                                area: {
                                    select: {
                                        id: true,
                                        name: true,
                                    },
                                },
                            },
                        },
                        comments: {
                            include: {
                                user: true,
                            },
                            where: {
                                deleted: false,
                            },
                        },
                    },
                })
                .then((studySet) => {
                    return studySet
                        ? {
                              ...studySet,
                              reviews: {
                                  average: reviews._avg.rating?.toFixed(1),
                                  count: reviews._count,
                              },
                              views,
                          }
                        : undefined;
                });
        }),
    incrementViews: protectedProcedure
        .input(
            z.object({
                id: z.number(),
            }),
        )
        .query(async ({ ctx, input }) => {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });

            return ctx.db.studySetView.upsert({
                create: {
                    studySetId: input.id,
                    userId: ctx.session.user.id,
                },
                update: {
                    createdAt: new Date(),
                },
                where: {
                    userId_studySetId: {
                        studySetId: input.id,
                        userId: ctx.session.user.id,
                    },
                },
            });
        }),
    addReview: protectedProcedure
        .input(
            z.object({
                id: z.number(),
                rating: z.number(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });

            return ctx.db.studySetReview.upsert({
                create: {
                    studySetId: input.id,
                    userId: ctx.session.user.id,
                    rating: input.rating,
                },
                update: {
                    rating: input.rating,
                },
                where: {
                    userId_studySetId: {
                        studySetId: input.id,
                        userId: ctx.session.user.id,
                    },
                },
            });
        }),
    addComment: protectedProcedure
        .input(
            z.object({
                id: z.number(),
                text: z.string().min(1).max(500),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });

            return ctx.db.studySetComment.create({
                data: {
                    studySetId: input.id,
                    userId: ctx.session.user.id,
                    content: input.text,
                },
            });
        }),
    deleteComment: protectedProcedure
        .input(
            z.object({
                id: z.number(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            await new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });

            return ctx.db.studySetComment.update({
                where: { id: input.id, userId: ctx.session.user.id },
                data: {
                    deleted: true,
                    deletedAt: new Date(),
                },
            });
        }),
});
