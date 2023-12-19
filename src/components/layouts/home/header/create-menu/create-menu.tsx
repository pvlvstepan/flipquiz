"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Tooltip } from "@/components/ui/tooltip";

export function CreateMenu() {
    return (
        <TooltipProvider>
            <Tooltip
                content="Create study set"
                contentProps={{
                    align: "end",
                }}
            >
                <Button
                    asChild
                    className="h-9 w-9 rounded-full"
                    size="icon"
                    type="button"
                >
                    <Link href="/study-set/create">
                        <PlusIcon size={20} />
                    </Link>
                </Button>
            </Tooltip>
        </TooltipProvider>
    );
}
