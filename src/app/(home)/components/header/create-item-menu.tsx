"use client";

import {
    BookCopyIcon,
    FolderIcon,
    PlusIcon,
    UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

export function CreateItemMenu() {
    return (
        <DropdownMenu>
            <DropdownMenu.Trigger asChild>
                <Button
                    className="h-9 w-9 rounded-full"
                    size="icon"
                    type="button"
                >
                    <PlusIcon size={20} />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
                <DropdownMenu.Item asChild>
                    <Link href="/create-study-set">
                        <BookCopyIcon size={16} />
                        <span>Study Set</span>
                    </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                    <Link href="/create-folder">
                        <FolderIcon size={16} />
                        <span>Folder</span>
                    </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item asChild>
                    <Link href="/create-class">
                        <UsersRoundIcon size={16} />
                        <span>Class</span>
                    </Link>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu>
    );
}
