import { XIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AuthLinksProps {
    current?: "sign-up" | "sign-in";
}

export function AuthLinks({ current }: AuthLinksProps) {
    return (
        <div className="relative mb-8 flex items-center gap-8">
            <Link
                className={cn(
                    "border-b-4 text-2xl",
                    current === "sign-up"
                        ? "border-primary"
                        : "border-transparent",
                )}
                href="/auth/sign-up"
            >
                Sign up
            </Link>
            <Link
                className={cn(
                    "border-b-4 text-2xl",
                    current === "sign-in"
                        ? "border-primary"
                        : "border-transparent",
                )}
                href="/auth/sign-in"
            >
                Log in
            </Link>
            <Button
                asChild
                className="ml-auto h-8 w-8"
                size="icon"
                variant="ghost"
            >
                <Link href="/">
                    <XIcon size={24} />
                </Link>
            </Button>
        </div>
    );
}
