import { redirect, RedirectType } from "next/navigation";

import type { Metadata } from "next";

import { getServerAuthSession } from "@/server/auth";

import {
    CommunitySection,
    FeaturedSection,
    HeroSection,
    SubjectsSection,
} from "./_components/sections/home";

export const metadata: Metadata = {
    title: "FlipQuiz | Quiz smarter, not harder",
};

export default async function Home() {
    const session = await getServerAuthSession();

    if (session) {
        return redirect("/latest", RedirectType.replace);
    }

    return (
        <div>
            <HeroSection />
            <FeaturedSection />
            <SubjectsSection />
            <CommunitySection />
        </div>
    );
}
