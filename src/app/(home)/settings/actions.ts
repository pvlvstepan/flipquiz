"use server";

import { revalidatePath } from "next/cache";

import type { Role } from "@prisma/client";

import { api } from "@/trpc/server";

export const changeAccountType = async (role: Role) => {
    return api.settings.updateRole.mutate({ role }).then(() => {
        revalidatePath("");
    });
};

export const changeEmail = async (email: string) => {
    return api.settings.updateEmail.mutate({ email }).then(() => {
        revalidatePath("");
    });
};

export const changePassword = async ({
    currentPassword,
    password,
}: {
    currentPassword: string;
    password: string;
}) => {
    return api.settings.updatePassword
        .mutate({ currentPassword, password })
        .then(() => {
            revalidatePath("");
        });
};

export const changeUsername = async (username: string) => {
    return api.settings.updateUsername.mutate({ username }).then(() => {
        revalidatePath("");
    });
};

export const deleteAccount = async (password: string) => {
    return api.settings.deleteAccount
        .mutate({
            password,
        })
        .then(() => {
            revalidatePath("");
        });
};
