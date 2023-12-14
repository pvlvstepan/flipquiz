"use client";

import { signIn } from "next-auth/react";

import type { ClientSafeProvider } from "next-auth/react";

import { DiscordIcon } from "@/components/icons/discord";
import { GoogleIcon } from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const providersIconMap: Record<string, React.ReactNode> = {
    google: <GoogleIcon />,
    discord: <DiscordIcon />,
};

interface AuthProvidersProps {
    providers: ClientSafeProvider[];
    mode?: "sign-in" | "sign-up";
}

export const AuthProviders = ({ providers, mode }: AuthProvidersProps) => {
    return providers.map((provider) => (
        <Button
            className={cn(
                "border",
                providers.length % 2 !== 0 ? "last:col-span-2" : "",
            )}
            key={provider.name}
            onClick={() => signIn(provider.id)}
            size="sm"
            variant="secondary"
        >
            <div className="mr-2 [&>svg]:h-4 [&>svg]:w-4">
                {providersIconMap[provider.id]}
            </div>
            <span>
                {mode === "sign-in" ? "Log in" : "Sign up"} with {provider.name}
            </span>
        </Button>
    ));
};
