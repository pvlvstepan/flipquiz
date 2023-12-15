"use client";

import { LogOutIcon, SettingsIcon, User2Icon } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
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
                    <Image
                        alt={session?.user.name ?? "user profile picture"}
                        className="object-cover"
                        height={36}
                        src={session?.user.image ?? ""}
                        width={36}
                    />
                </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
                <DropdownMenu.Label>
                    <div className="flex items-center gap-2">
                        <div className="h-9 w-9 overflow-hidden rounded-full bg-muted">
                            <Image
                                alt={
                                    session?.user.name ?? "user profile picture"
                                }
                                className="object-cover"
                                height={36}
                                src={session?.user.image ?? ""}
                                width={36}
                            />
                        </div>
                        <div className="flex max-w-[150px] flex-col">
                            <h2 className="truncate text-sm font-medium text-primary">
                                {session?.user.name}
                            </h2>
                            <p className="truncate text-xs text-muted-foreground">
                                {session?.user.email}
                            </p>
                        </div>
                    </div>
                </DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                    <User2Icon size={16} />
                    <span>Profile</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                    <SettingsIcon size={16} />
                    <span>Settings</span>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                    className={!signOutLoading ? "hover:!text-destructive" : ""}
                    disabled={signOutLoading}
                    onClick={() => {
                        setSignOutLoading(true);
                        void signOut().finally(() => {
                            setSignOutLoading(false);
                        });
                    }}
                >
                    <LogOutIcon size={16} />
                    <span>Log out</span>
                    {signOutLoading ? <Spinner className="ml-auto" /> : null}
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu>
    );
}
