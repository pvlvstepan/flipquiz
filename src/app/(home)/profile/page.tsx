import { redirect } from "next/navigation";

import type { Metadata } from "next";

import { getServerAuthSession } from "@/server/auth";

export const metadata: Metadata = {
    title: "FlipQuiz | Profile",
};

export default async function UserProfile() {
    const session = await getServerAuthSession();

    if (!session) {
        return redirect(
            `/auth/sign-in?callbackUrl=${encodeURIComponent("/profile")}`,
        );
    }

    return <h1>Current user profile</h1>;
}
