import { Outfit } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";

import "@/styles/globals.css";

const fontOutfit = Outfit({
    variable: "--font-outfit",
    subsets: ["latin"],
});

export const metadata = {
    title: "FlipQuiz",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
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
                </TRPCReactProvider>
            </body>
        </html>
    );
}
