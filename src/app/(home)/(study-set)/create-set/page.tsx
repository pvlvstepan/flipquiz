import { redirect } from "next/navigation";

import type { Metadata } from "next";

import { getServerAuthSession } from "@/server/auth";

import { StudySetForm } from "../../_components/forms/study-set";
import { createStudySet } from "./actions";

export const metadata: Metadata = {
    title: "FlipQuiz | Create study set",
};

export default async function CreateSetPage() {
    const session = await getServerAuthSession();

    if (!session) {
        return redirect(
            `/auth/sign-in?callbackUrl=${encodeURIComponent("/create-set/")}`,
        );
    }

    return (
        <div className="container">
            <h1 className="mb-8 text-xl sm:text-2xl">Create a new study set</h1>
            <StudySetForm mode="create" onSubmit={createStudySet} />
        </div>
    );
}
