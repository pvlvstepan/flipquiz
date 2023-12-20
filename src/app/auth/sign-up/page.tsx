import { getProviders } from "next-auth/react";

import { AuthLinks, AuthProviders, AuthSeparator } from "../_components";
import { SignUpForm } from "../_components/forms";

export default async function SignUpPage() {
    const providers = await getProviders().then((p) =>
        p ? Object.values(p) : [],
    );

    return (
        <div className="flex flex-col">
            <AuthLinks current="sign-up" />
            <AuthProviders providers={providers} variant="sign-up" />
            <AuthSeparator />
            <SignUpForm />
        </div>
    );
}
