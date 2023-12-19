"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const TooltipContent = forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Content
        className={cn(
            "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
        )}
        ref={ref}
        sideOffset={sideOffset}
        {...props}
    />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface TooltipProps extends TooltipPrimitive.TooltipProps {
    contentProps?: React.ComponentPropsWithoutRef<typeof TooltipContent>;
    content?: React.ReactNode;
}

export function Tooltip({
    children,
    content,
    open,
    defaultOpen,
    onOpenChange,
    contentProps,
    ...props
}: TooltipProps) {
    return (
        <TooltipPrimitive.Root
            defaultOpen={defaultOpen}
            onOpenChange={onOpenChange}
            open={open}
            {...props}
        >
            <TooltipPrimitive.Trigger asChild>
                {children}
            </TooltipPrimitive.Trigger>
            <TooltipContent align="center" side="top" {...contentProps}>
                {content}
            </TooltipContent>
        </TooltipPrimitive.Root>
    );
}
