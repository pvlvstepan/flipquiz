import { getProviders } from "next-auth/react";

import {
    AuthLinks,
    AuthProviders,
    AuthSeparator,
} from "@/app/(auth)/components";

import { SignInForm } from "./form";

export default async function SignInPage() {
    const providers = await getProviders().then((p) =>
        p ? Object.values(p) : [],
    );

    return (
        <div className="flex flex-col">
            <AuthLinks current="sign-in" />
            <AuthProviders providers={providers} variant="sign-in" />
            <AuthSeparator />
            <SignInForm />
        </div>
    );
}
