"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

import type { ClientSafeProvider } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { DiscordIcon } from "./icons/discord";
import { GoogleIcon } from "./icons/google";

const providersIconMap: Record<string, React.ReactNode> = {
    google: <GoogleIcon />,
    discord: <DiscordIcon />,
};

interface AuthProvidersProps {
    variant?: "sign-in" | "sign-up";
    providers?: ClientSafeProvider[];
}

export function AuthProviders({
    variant = "sign-in",
    providers = [],
}: AuthProvidersProps) {
    const [isLoading, setIsLoading] = useState<string>();

    return (
        <div className="flex flex-col gap-4">
            {providers.map((provider) => (
                <Button
                    className="relative"
                    disabled={isLoading === provider.id}
                    key={provider.name}
                    onClick={async () => {
                        setIsLoading(provider.id);
                        await signIn(provider.id);
                    }}
                    size="lg"
                    variant="outline"
                >
                    <div className="mr-2 [&>svg]:h-6 [&>svg]:w-6">
                        {providersIconMap[provider.id]}
                    </div>
                    <span>
                        {variant === "sign-in" ? "Log in" : "Continue"} with{" "}
                        {provider.name}
                    </span>
                    {isLoading === provider.id && (
                        <Spinner className="absolute right-3" />
                    )}
                </Button>
            ))}
        </div>
    );
}
