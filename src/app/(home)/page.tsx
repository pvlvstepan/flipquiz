import { redirect, RedirectType } from "next/navigation";

import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
    const session = await getServerAuthSession();

    if (session) {
        return redirect("/latest", RedirectType.replace);
    }

    return <div>Home page for public users</div>;
}
