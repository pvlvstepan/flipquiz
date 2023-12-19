import { StudySetForm } from "@/components/forms/study-set";
import { getServerAuthSession } from "@/server/auth";

export default async function CreateStudySetPage() {
    const session = await getServerAuthSession();

    if (!session) {
        // return redirect("/auth/sign-in");
    }

    return (
        <>
            <h1 className="mb-8 text-2xl sm:text-3xl">Create new study set</h1>
            <StudySetForm mode="create" />
        </>
    );
}
