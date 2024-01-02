import { Role } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { hash, verify } from "argon2";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const settingsRouter = createTRPCRouter({
    updateRole: protectedProcedure
        .input(
            z.object({
                role: z.nativeEnum(Role),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            return ctx.db.user.update({
                where: {
                    id: ctx.session.user.id,
                },
                data: {
                    role: input.role,
                },
            });
        }),
    updateEmail: protectedProcedure
        .input(
            z.object({
                email: z.string().email(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const emailExists = await ctx.db.user.findFirst({
                where: { email: input.email },
            });

            if (emailExists) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "Email is already in use",
                });
            }

            return ctx.db.user.update({
                where: {
                    id: ctx.session.user.id,
                },
                data: {
                    email: input.email,
                },
            });
        }),
    updatePassword: protectedProcedure
        .input(
            z.object({
                currentPassword: z.string().min(8),
                password: z.string().min(8),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
                where: {
                    id: ctx.session.user.id,
                },
            });

            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            const validPassword = await verify(
                user.password,
                input.currentPassword,
            );

            if (!validPassword) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Current password is incorrect",
                });
            }

            const hashedPassword = await hash(input.password);

            return ctx.db.user.update({
                where: {
                    id: ctx.session.user.id,
                },
                data: {
                    password: hashedPassword,
                },
            });
        }),
    updateUsername: protectedProcedure
        .input(
            z.object({
                username: z.string().min(3),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const usernameExists = await ctx.db.user.findFirst({
                where: { username: input.username },
            });

            if (usernameExists) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "Username is already in use",
                });
            }

            return ctx.db.user.update({
                where: {
                    id: ctx.session.user.id,
                },
                data: {
                    username: input.username,
                },
            });
        }),
    deleteAccount: protectedProcedure
        .input(
            z.object({
                password: z.string().min(8),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const user = await ctx.db.user.findUnique({
                where: {
                    id: ctx.session.user.id,
                },
            });

            if (!user) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });
            }

            const validPassword = await verify(user.password, input.password);

            if (!validPassword) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Password is incorrect",
                });
            }

            return ctx.db.user.delete({
                where: {
                    id: ctx.session.user.id,
                },
            });
        }),
});
