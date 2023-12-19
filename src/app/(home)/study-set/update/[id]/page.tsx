import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { StudySetForm } from "@/components/forms/study-set";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

interface UpdateStudySetPageProps {
    params: {
        id: string;
    };
}

export default async function UpdateStudySetPage({
    params,
}: UpdateStudySetPageProps) {
    const session = await getServerAuthSession();

    if (!session) {
        // return redirect("/auth/sign-in");
    }

    const studySet = await api.studySet.getStudySet.query(parseInt(params.id));

    if (!studySet) {
        return notFound();
    }

    return (
        <>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-2xl sm:text-3xl">Update study set</h1>
                <Link
                    className="flex items-center gap-2 text-primary hover:underline"
                    href={`/study-set/${studySet.id}`}
                >
                    <ArrowLeft size={16} />
                    <span>Back to study set</span>
                </Link>
            </div>
            <StudySetForm
                defaultValues={{
                    id: studySet.id,
                    description: studySet.description ?? "",
                    name: studySet.name,
                    cards: studySet.cards.map((card) => ({
                        id: card.id,
                        term: card.term,
                        definition: card.definition,
                    })),
                }}
                mode="update"
            />
        </>
    );
}
