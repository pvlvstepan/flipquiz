import { Outfit } from "next/font/google";
import { cookies } from "next/headers";

import type { Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";

import "@/styles/globals.css";

import { Toaster } from "@/components/ui/toaster";

const fontOutfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "FlipQuiz",
    icons: [
        { rel: "icon", url: "/favicon.ico" },
        {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            url: "/favicon-32x32.png",
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            url: "/favicon-16x16.png",
        },
        {
            rel: "apple-touch-icon",
            sizes: "180x180",
            url: "/apple-touch-icon.png",
        },
    ],
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={fontOutfit.variable}>
                <TRPCReactProvider cookies={cookies().toString()}>
                    {children}
                    <Toaster />
                </TRPCReactProvider>
            </body>
        </html>
    );
}
