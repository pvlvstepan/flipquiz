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
        <div className="flex flex-col gap-8">
            <ChangeAccountType />
            <ChangeEmail />
            <ChangePassword />
            <ChangeUsername />
            <DeleteAccount />
        </div>
    );
}
