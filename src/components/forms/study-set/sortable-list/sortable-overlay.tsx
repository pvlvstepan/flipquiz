"use client";

import { defaultDropAnimationSideEffects, DragOverlay } from "@dnd-kit/core";

import type { DropAnimation } from "@dnd-kit/core";

const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: "0.5",
            },
        },
    }),
};

interface SortableOverlayProps {
    children: React.ReactNode;
}

export function SortableOverlay({ children }: SortableOverlayProps) {
    return (
        <DragOverlay
            className="list-none [&_#card-form]:shadow-2xl"
            dropAnimation={dropAnimationConfig}
        >
            {children}
        </DragOverlay>
    );
}
