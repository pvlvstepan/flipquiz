import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import type { Metadata } from "next";

import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

import { StudySetForm } from "../../../_components/forms/study-set";
import { editStudySet } from "./actions";

export const metadata: Metadata = {
    title: "FlipQuiz | Edit study set",
};

interface EditStudySetPageProps {
    params: {
        id: string;
    };
}

export default async function EditStudySetPage({
    params,
}: EditStudySetPageProps) {
    const session = await getServerAuthSession();

    if (!session) {
        return redirect(
            `/auth/sign-in?callbackUrl=${encodeURIComponent(
                `/edit-set/${params.id}`,
            )}`,
        );
    }

    const studySet = await api.studySet.get.base.query({
        studySetId: params.id,
        userId: session.user.id,
    });

    if (!studySet) {
        return notFound();
    }

    return (
        <div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <Link
                    className="flex items-center gap-2 text-primary hover:underline"
                    href={`/study-set/${studySet.id}`}
                >
                    <ArrowLeftIcon size={16} />
                    <span>Back to study set</span>
                </Link>
            </div>
            <StudySetForm
                defaultValues={studySet}
                mode="update"
                onSubmit={editStudySet}
            />
        </div>
    );
}
