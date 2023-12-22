import { redirect } from "next/navigation";

import type { Metadata } from "next";

import { getServerAuthSession } from "@/server/auth";

import {
    PopularStudySets,
    RecentStudySets,
    TopCreators,
    TopRatedStudySets,
} from "../_components/sections/home";

export const metadata: Metadata = {
    title: "FlipQuiz | Latest",
};

export default async function LatestPage() {
    const session = await getServerAuthSession();

    if (!session) {
        return redirect(
            `/auth/sign-in?callbackUrl=${encodeURIComponent("/latest")}`,
        );
    }

    return (
        <div className="flex flex-col gap-y-8 sm:gap-y-16">
            <RecentStudySets />
            <PopularStudySets />
            <TopRatedStudySets />
            <TopCreators />
        </div>
    );
}
