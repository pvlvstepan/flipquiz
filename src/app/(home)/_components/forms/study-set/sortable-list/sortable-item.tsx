"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React, { createContext, useContext, useMemo } from "react";

import type {
    DraggableAttributes,
    DraggableSyntheticListeners,
    UniqueIdentifier,
} from "@dnd-kit/core";
import type { HTMLAttributes } from "react";

type DragHandleRef = HTMLElement | null;

interface SortableItemProps extends Omit<HTMLAttributes<HTMLLIElement>, "id"> {
    id: UniqueIdentifier;
    children: React.ReactNode;
}

interface Context {
    attributes?: DraggableAttributes;
    listeners: DraggableSyntheticListeners;
    ref: (node: DragHandleRef) => void;
}

const SortableItemContext = createContext<Context>({
    attributes: undefined,
    listeners: undefined,
    ref: () => undefined,
});

export function SortableItem({ children, id, ...rest }: SortableItemProps) {
    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const context = useMemo<Context>(
        () => ({
            isDragging,
            attributes,
            listeners,
            ref: setActivatorNodeRef,
        }),
        [attributes, isDragging, listeners, setActivatorNodeRef],
    );

    const style: React.CSSProperties = {
        opacity: isDragging ? 0.5 : undefined,
        transform: CSS.Translate.toString(transform),
        transition,
        userSelect: "none",
    };

    return (
        <SortableItemContext.Provider value={context}>
            <li ref={setNodeRef} style={style} {...rest}>
                {children}
            </li>
        </SortableItemContext.Provider>
    );
}

export function DragHandle(props: HTMLAttributes<HTMLElement>) {
    const { attributes, listeners, ref } = useContext(SortableItemContext);

    return <div {...props} {...attributes} {...listeners} ref={ref} />;
}

DragHandle.displayName = "DragHandle";
