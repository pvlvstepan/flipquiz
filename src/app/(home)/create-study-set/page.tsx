import { getServerAuthSession } from "@/server/auth";

import { CreateStudySetForm } from "./form";

export default async function CreateStudySetPage() {
    const session = await getServerAuthSession();

    if (!session) {
        // return redirect("/auth/sign-in");
    }

    return <CreateStudySetForm />;
}
