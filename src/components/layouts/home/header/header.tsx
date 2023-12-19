import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";

import { CreateMenu } from "./create-menu";
import { UserMenu } from "./user-menu";

export async function Header() {
    const session = await getServerAuthSession();

    return (
        <header className="h-14 shrink-0 border-b bg-background">
            <div className="container h-full">
                <div className="flex h-full items-center justify-between">
                    <Link className="text-3xl text-primary" href="/">
                        FlipQuiz
                    </Link>
                    <div className="flex items-center gap-3">
                        <CreateMenu />
                        {!session ? (
                            <>
                                <Button asChild variant="ghost">
                                    <Link href="/auth/sign-in">Log in</Link>
                                </Button>
                                <Button asChild>
                                    <Link href="/auth/sign-up">Sign up</Link>
                                </Button>
                            </>
                        ) : (
                            <UserMenu session={session} />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
