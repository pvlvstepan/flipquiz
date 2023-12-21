import { verify } from "argon2";
import { getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import type { Role } from "@prisma/client";
import type { NextAuthOptions } from "next-auth";

import { env } from "@/env";

import { db } from "./db";
import { signInInput } from "./schemas/auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username: string;
            email?: string | null;
            image?: string | null;
            role: Role;
        };
    }

    interface User {
        id: string;
        username: string;
        email?: string | null;
        image?: string | null;
        role: Role;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        username: string;
        role: Role;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                emailOrUsername: {
                    type: "text",
                },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    const { emailOrUsername, password } =
                        await signInInput.parseAsync(credentials);

                    const result = await db.user.findFirst({
                        where: {
                            OR: [
                                { email: emailOrUsername },
                                { username: emailOrUsername },
                            ],
                        },
                    });

                    console.log(result);

                    if (!result) return null;

                    const isValidPassword = await verify(
                        result.password,
                        password,
                    );

                    if (!isValidPassword) return null;

                    return {
                        id: result.id,
                        email: result.email,
                        username: result.username,
                        image: result.image,
                        role: result.role,
                    };
                } catch {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- might be undefined
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.username = user.username;
                token.picture = user.image;
                token.role = user.role;
            }

            return token;
        },
        session: async ({ session, token }) => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- might be undefined
            if (token) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.username = token.username;
                session.user.image = token.picture;
                session.user.role = token.role;
            }

            return session;
        },
    },
    jwt: {
        maxAge: 15 * 24 * 30 * 60, // 15 days
    },
    session: {
        strategy: "jwt",
        maxAge: 15 * 24 * 30 * 60, // 15 days
    },
    secret: env.JWT_SECRET,
    pages: {
        signIn: "/auth/sign-in",
        newUser: "/auth/sign-up",
    },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
