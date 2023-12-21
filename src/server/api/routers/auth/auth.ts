import { TRPCError } from "@trpc/server";
import { hash } from "argon2";

import { signUpInput } from "@/server/schemas/auth";

import { createTRPCRouter, publicProcedure } from "../../trpc";

export const authRouter = createTRPCRouter({
    signUp: publicProcedure
        .input(signUpInput)
        .mutation(async ({ ctx, input }) => {
            const { username, email, password } = input;

            const emailExists = await ctx.db.user.findFirst({
                where: { email },
            });

            const usernameExists = await ctx.db.user.findFirst({
                where: { username },
            });

            if (emailExists || usernameExists) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: emailExists
                        ? "Email is already in use"
                        : "Username is already in use",
                });
            }

            const hashedPassword = await hash(password);

            const result = await ctx.db.user.create({
                data: { username, email, password: hashedPassword },
            });

            return {
                message: "Account created successfully",
                result: result.email,
            };
        }),
});
