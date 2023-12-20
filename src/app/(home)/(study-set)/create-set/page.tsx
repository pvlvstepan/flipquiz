import { redirect } from "next/navigation";

import { getServerAuthSession } from "@/server/auth";

import { StudySetForm } from "../../_components/forms/study-set";
import { createStudySet } from "./actions";

export default async function CreateSetPage() {
    const session = await getServerAuthSession();

    if (!session) {
        return redirect("/auth/sign-in");
    }

    return (
        <div>
            <h1 className="mb-8 text-xl sm:text-2xl">Create a new study set</h1>
            <StudySetForm mode="create" onSubmit={createStudySet} />
        </div>
    );
}
