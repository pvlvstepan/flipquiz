import { redirect } from "next/navigation";

import type { Metadata } from "next";

import { getServerAuthSession } from "@/server/auth";

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

    return <div>Settings page</div>;
}
