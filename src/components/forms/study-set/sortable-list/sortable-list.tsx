"use client";

import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Fragment, useMemo, useState } from "react";

import type { Active, UniqueIdentifier } from "@dnd-kit/core";

import { cn } from "@/lib/utils";

import { DragHandle, SortableItem } from "./sortable-item";
import { SortableOverlay } from "./sortable-overlay";

interface BaseItem {
    id: UniqueIdentifier;
}

interface SortableListProps<T extends BaseItem> {
    items: T[];
    onChange?: (items: T[]) => void;
    onMove?: (from: number, to: number) => void;
    renderItem: (item: T, index: number) => React.ReactNode;
    className?: string;
}

export function SortableList<T extends BaseItem>({
    items,
    onChange = () => undefined,
    onMove = () => undefined,
    renderItem,
    className,
}: SortableListProps<T>) {
    const [active, setActive] = useState<Active | null>(null);
    const activeItem = useMemo(
        () => items.find((item) => item.id === active?.id),
        [active, items],
    );
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    return (
        <DndContext
            id="sortable-list"
            onDragCancel={() => {
                setActive(null);
            }}
            onDragEnd={({ active: dragged, over }) => {
                if (over && dragged.id !== over.id) {
                    const activeIndex = items.findIndex(
                        ({ id }) => id === dragged.id,
                    );
                    const overIndex = items.findIndex(
                        ({ id }) => id === over.id,
                    );

                    onMove(activeIndex, overIndex);
                    onChange(arrayMove(items, activeIndex, overIndex));
                }
                setActive(null);
            }}
            onDragStart={({ active: dragged }) => {
                setActive(dragged);
            }}
            sensors={sensors}
        >
            <SortableContext items={items}>
                <ul className={cn("list-none", className)} role="application">
                    {items.map((item, i) => (
                        <Fragment key={item.id}>{renderItem(item, i)}</Fragment>
                    ))}
                </ul>
            </SortableContext>
            <SortableOverlay>
                {activeItem
                    ? renderItem(
                          activeItem,
                          items.findIndex((item) => item.id === activeItem.id),
                      )
                    : null}
            </SortableOverlay>
        </DndContext>
    );
}

SortableList.Item = SortableItem;
SortableList.DragHandle = DragHandle;
