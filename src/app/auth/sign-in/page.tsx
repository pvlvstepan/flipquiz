import type { Metadata } from "next";

import { AuthLinks } from "../_components";
import { SignInForm } from "../_components/forms";

export const metadata: Metadata = {
    title: "FlipQuiz | Log In",
};

export default async function SignInPage() {
    return (
        <div className="flex flex-1 flex-col">
            <AuthLinks current="sign-in" />
            <div className="my-auto">
                <SignInForm />
            </div>
        </div>
    );
}
