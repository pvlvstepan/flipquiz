import { notFound } from "next/navigation";

import { StudySetForm } from "@/components/forms/study-set";
import { Button } from "@/components/ui/button";
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
        <main>
            <h1 className="mb-8 text-2xl sm:text-3xl">Update study set</h1>
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
        </main>
    );
}
