import { redirect } from "next/navigation";

import type { Metadata } from "next";

import { getServerAuthSession } from "@/server/auth";

import {
    ChangeAccountType,
    ChangeEmail,
    ChangePassword,
    ChangeUsername,
    DeleteAccount,
} from "../_components/forms/settings";
import {
    changeAccountType,
    changeEmail,
    changePassword,
    changeUsername,
    deleteAccount,
} from "./actions";

export const metadata: Metadata = {
    title: "FlipQuiz | Settings",
};

export default async function SettingsPage() {
    const session = await getServerAuthSession();

    if (!session) {
        return redirect(
            `/auth/sign-in?callbackUrl=${encodeURIComponent("/settings")}`,
        );
    }

    return (
        <div className="container flex flex-col gap-8">
            <ChangeAccountType
                defaultRole={session.user.role}
                onSubmit={changeAccountType}
            />
            <ChangeEmail
                defaultEmail={session.user.email}
                onSubmit={changeEmail}
            />
            <ChangePassword onSubmit={changePassword} />
            <ChangeUsername
                defaultUsername={session.user.username}
                onSubmit={changeUsername}
            />
            <DeleteAccount onSubmit={deleteAccount} />
        </div>
    );
}
