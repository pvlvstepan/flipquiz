import { getProviders } from "next-auth/react";

import { AuthLinks, AuthProviders, AuthSeparator } from "../_components";
import { SignInForm } from "../_components/forms";

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
