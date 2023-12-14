"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    unstable_httpBatchStreamLink as httpBatchStreamLink,
    loggerLink,
} from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { useMemo } from "react";

import type { AppRouter } from "@/server/api/root";

import { getUrl, transformer } from "./shared";

export const api = createTRPCReact<AppRouter>();

interface TRPCReactProviderProps {
    children: React.ReactNode;
    cookies: string;
}

export function TRPCReactProvider({
    children,
    cookies,
}: TRPCReactProviderProps) {
    const queryClient = useMemo(() => new QueryClient(), []);

    const trpcClient = useMemo(
        () =>
            api.createClient({
                transformer,
                links: [
                    loggerLink({
                        enabled: (op) =>
                            process.env.NODE_ENV === "development" ||
                            (op.direction === "down" &&
                                op.result instanceof Error),
                    }),
                    httpBatchStreamLink({
                        url: getUrl(),
                        headers() {
                            return {
                                "cookie": cookies,
                                "x-trpc-source": "react",
                            };
                        },
                    }),
                ],
            }),
        [cookies],
    );

    return (
        <QueryClientProvider client={queryClient}>
            <api.Provider client={trpcClient} queryClient={queryClient}>
                {children}
            </api.Provider>
        </QueryClientProvider>
    );
}
