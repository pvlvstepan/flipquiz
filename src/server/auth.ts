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
                const user = await db.user.findUnique({
                    where: {
                        id: token.id,
                    },
                });

                if (user) {
                    session.user = {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        image: user.image,
                        role: user.role,
                    };
                } else {
                    // @ts-expect-error -- mutate session
                    // eslint-disable-next-line no-param-reassign -- mutate session
                    session = undefined;
                }
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
