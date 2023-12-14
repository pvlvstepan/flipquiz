import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getServerAuthSession } from "@/server/auth";

import { AuthProviders } from "../auth-providers";
import { SignInForm } from "./form";

export default async function SignInPage() {
    const providers = await getProviders().then((p) =>
        p ? Object.values(p) : [],
    );

    const session = await getServerAuthSession();

    if (session) {
        return redirect("/");
    }

    return (
        <Card className="w-full sm:max-w-lg">
            <CardHeader>
                <CardTitle>Welcome back</CardTitle>
            </CardHeader>
            <CardContent>
                {providers.length ? (
                    <>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <AuthProviders
                                mode="sign-in"
                                providers={providers}
                            />
                        </div>
                        <div className="inline-flex w-full items-center gap-4 py-3">
                            <Separator className="flex-1" />
                            <span className="text-lg">or</span>
                            <Separator className="flex-1" />
                        </div>
                    </>
                ) : null}

                <SignInForm />
            </CardContent>
        </Card>
    );
}
