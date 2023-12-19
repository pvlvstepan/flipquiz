"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
    BookCopyIcon,
    FolderIcon,
    PlusIcon,
    UsersRoundIcon,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Tooltip } from "@/components/ui/tooltip";

export function CreateMenu() {
    return (
        <TooltipProvider>
            <DropdownMenu>
                <Tooltip
                    content="Create"
                    contentProps={{
                        align: "end",
                    }}
                >
                    <DropdownMenu.Trigger asChild>
                        <Button
                            className="h-9 w-9 rounded-full"
                            size="icon"
                            type="button"
                        >
                            <PlusIcon size={20} />
                        </Button>
                    </DropdownMenu.Trigger>
                </Tooltip>
                <DropdownMenu.Content align="end">
                    <DropdownMenu.Item asChild>
                        <Link href="/study-set/create">
                            <BookCopyIcon size={20} />
                            <span>Study Set</span>
                        </Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item asChild>
                        <Link href="/folder/create">
                            <FolderIcon size={20} />
                            <span>Folder</span>
                        </Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item asChild>
                        <Link href="/class/create">
                            <UsersRoundIcon size={20} />
                            <span>Class</span>
                        </Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu>
        </TooltipProvider>
    );
}
