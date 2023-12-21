"use client";

import { LogOutIcon, SettingsIcon, User2Icon } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { Session } from "next-auth";

import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";

interface UserMenuProps {
    session: Session | null;
}

export function UserMenu({ session }: UserMenuProps) {
    const [signOutLoading, setSignOutLoading] = useState(false);

    return (
        <DropdownMenu>
            <DropdownMenu.Trigger asChild>
                <button
                    className="h-9 w-9 cursor-pointer overflow-hidden rounded-full bg-muted ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    type="button"
                >
                    {session?.user.image ? (
                        <Image
                            alt={session.user.name ?? "User avatar"}
                            className="object-cover"
                            height={36}
                            src={session.user.image}
                            width={36}
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            <span className="text-2xl">
                                {session?.user.name?.charAt(0) ?? "?"}
                            </span>
                        </div>
                    )}
                </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
                <DropdownMenu.Label>
                    <div className="flex items-center gap-2">
                        <div className="h-9 w-9 overflow-hidden rounded-full bg-muted">
                            {session?.user.image ? (
                                <Image
                                    alt={session.user.name ?? "User avatar"}
                                    className="object-cover"
                                    height={36}
                                    src={session.user.image}
                                    width={36}
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                    <span className="text-2xl">
                                        {session?.user.name?.charAt(0) ?? "?"}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="flex max-w-[150px] flex-col">
                            <h2 className="truncate text-sm text-primary">
                                {session?.user.name}
                            </h2>
                            <p className="truncate text-xs text-muted-foreground">
                                {session?.user.email}
                            </p>
                        </div>
                    </div>
                </DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Item asChild>
                    <Link href="/profile">
                        <User2Icon size={20} />
                        <span>Profile</span>
                    </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                    <Link href="/settings">
                        <SettingsIcon size={20} />
                        <span>Settings</span>
                    </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                    className={!signOutLoading ? "focus:text-destructive" : ""}
                    disabled={signOutLoading}
                    onClick={() => {
                        setSignOutLoading(true);
                        void signOut().finally(() => {
                            setSignOutLoading(false);
                        });
                    }}
                >
                    <LogOutIcon size={20} />
                    <span>Log out</span>
                    {signOutLoading ? <Spinner className="ml-auto" /> : null}
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu>
    );
}
