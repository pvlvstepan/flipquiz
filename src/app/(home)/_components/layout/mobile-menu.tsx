"use client";

import {
    BookCopyIcon,
    HomeIcon,
    LibraryBigIcon,
    LogOutIcon,
    MenuIcon,
    SettingsIcon,
    User2Icon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { Session } from "next-auth";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";

interface MobileMenu {
    session: Session | null;
}

export function MobileMenu({ session }: MobileMenu) {
    const [signOutLoading, setSignOutLoading] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Sheet onOpenChange={setMenuOpen} open={menuOpen}>
            <SheetTrigger asChild>
                <Button className="sm:hidden" size="icon" variant="ghost">
                    <MenuIcon size={24} />
                </Button>
            </SheetTrigger>
            <SheetContent className="border-l-2 shadow-none" side="top">
                <SheetHeader>
                    <SheetTitle className="mb-8">
                        <Link
                            className="text-3xl text-primary"
                            href={session ? "/latest" : "/"}
                            onClick={() => {
                                setMenuOpen(false);
                            }}
                        >
                            FlipQuiz
                        </Link>
                    </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4">
                    <Link
                        className="flex items-center gap-2 py-2 text-xl text-muted-foreground"
                        href={session ? "/latest" : "/"}
                        onClick={() => {
                            setMenuOpen(false);
                        }}
                    >
                        <HomeIcon size={24} />
                        <span>Home</span>
                    </Link>
                    <Link
                        className="flex items-center gap-2 py-2 text-xl text-muted-foreground"
                        href="/profile"
                        onClick={() => {
                            setMenuOpen(false);
                        }}
                    >
                        <LibraryBigIcon size={24} />
                        <span>Your library</span>
                    </Link>
                    <Link
                        className="flex items-center gap-2 py-2 text-xl text-muted-foreground"
                        href="/explore"
                        onClick={() => {
                            setMenuOpen(false);
                        }}
                    >
                        <BookCopyIcon size={24} />
                        <span>Explore</span>
                    </Link>
                </div>
                <Separator className="my-8 h-0.5" />
                <div className="flex flex-col">
                    {session ? (
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-muted">
                                    {session.user.image ? (
                                        <Image
                                            alt={
                                                session.user.username ||
                                                "User avatar"
                                            }
                                            className="object-cover"
                                            height={48}
                                            src={session.user.image}
                                            width={48}
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                            <span className="text-2xl uppercase">
                                                {session.user.username.charAt(
                                                    0,
                                                ) || "?"}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-1 flex-col overflow-hidden">
                                    <h2 className="truncate text-lg text-primary">
                                        {session.user.username}
                                    </h2>
                                    <p className="truncate text-muted-foreground">
                                        {session.user.email}
                                    </p>
                                </div>
                            </div>
                            <Link
                                className="flex items-center gap-2 py-2 text-xl text-muted-foreground"
                                href="/profile"
                                onClick={() => {
                                    setMenuOpen(false);
                                }}
                            >
                                <User2Icon size={24} />
                                <span>Profile</span>
                            </Link>
                            <Link
                                className="flex items-center gap-2 py-2 text-xl text-muted-foreground"
                                href="/settings"
                                onClick={() => {
                                    setMenuOpen(false);
                                }}
                            >
                                <SettingsIcon size={24} />
                                <span>Settings</span>
                            </Link>
                            <Button
                                className={
                                    !signOutLoading
                                        ? "hover:text-destructive"
                                        : ""
                                }
                                disabled={signOutLoading}
                                onClick={() => {
                                    setSignOutLoading(true);
                                    void signOut().finally(() => {
                                        setSignOutLoading(false);
                                        setMenuOpen(false);
                                    });
                                }}
                                size="lg"
                                variant="outline"
                            >
                                <LogOutIcon size={24} />
                                <span>Log out</span>
                                {signOutLoading ? (
                                    <Spinner className="ml-auto" />
                                ) : null}
                            </Button>
                        </div>
                    ) : (
                        <div className="flex w-full gap-4">
                            <Button
                                asChild
                                className="flex-1"
                                variant="outline"
                            >
                                <Link href="/auth/sign-in">Log in</Link>
                            </Button>
                            <Button asChild className="flex-1">
                                <Link href="/auth/sign-up">Sign up</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
