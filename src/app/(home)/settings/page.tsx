import { redirect } from "next/navigation";

import { getServerAuthSession } from "@/server/auth";

export default async function SettingsPage() {
    const session = await getServerAuthSession();

    if (!session) {
        return redirect(
            `/auth/sign-in?callbackUrl=${encodeURIComponent("/settings")}`,
        );
    }

    return <div>Settings page</div>;
}
