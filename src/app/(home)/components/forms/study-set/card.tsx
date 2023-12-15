"use client";

import { SeparatorHorizontalIcon, Trash2Icon } from "lucide-react";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

import type { Identifier } from "dnd-core";
import type { Control } from "react-hook-form";

import type { DragItem } from "./types";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { TextArea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface DraggableCardProps {
    id: string;
    index: number;
    onRemove?: () => void;
    disableRemove?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- // TODO: fix this to be more specific
    control: Control<any>;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
}

export function DraggableCard({
    id,
    index,
    onRemove,
    disableRemove,
    control,
    moveCard,
}: DraggableCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<
        DragItem,
        () => void,
        { handlerId: Identifier | null }
    >({
        accept: "card",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current.getBoundingClientRect();

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

            const clientOffset = monitor.getClientOffset();

            const hoverClientY = (clientOffset?.y || 0) - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveCard(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag, preview] = useDrag({
        type: "card",
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drop(preview(ref));

    return (
        <Card
            className={cn(
                "translate-x-0 translate-y-0 select-none",
                isDragging &&
                    "pointer-events-none border-dashed border-primary/50 bg-primary/10 opacity-50",
            )}
            data-handler-id={handlerId}
            ref={ref}
        >
            <Card.Header
                className={cn(
                    "flex-row items-center justify-between border-b-2 px-6 py-2",
                    isDragging && "opacity-0",
                )}
            >
                <Card.Description>Card {index + 1}</Card.Description>
                <div className="flex gap-3">
                    <Button
                        className="hover:text-destructive"
                        disabled={disableRemove}
                        onClick={onRemove}
                        size="icon"
                        type="button"
                        variant="outline"
                    >
                        <Trash2Icon size={16} />
                    </Button>
                    <Button
                        ref={drag}
                        size="icon"
                        type="button"
                        variant="outline"
                    >
                        <SeparatorHorizontalIcon size={16} />
                    </Button>
                </div>
            </Card.Header>
            <Card.Content className={cn("p-6", isDragging && "opacity-0")}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Form.Field
                        control={control}
                        name={`cards.${index}.term`}
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Label>Term</Form.Label>
                                <Form.Control>
                                    <TextArea
                                        className="min-h-[48px] bg-background"
                                        placeholder="Enter term..."
                                        {...field}
                                    />
                                </Form.Control>
                                <Form.Message />
                            </Form.Item>
                        )}
                    />
                    <div className="flex gap-6">
                        <Form.Field
                            control={control}
                            name={`cards.${index}.definition`}
                            render={({ field }) => (
                                <Form.Item className="flex-1">
                                    <Form.Label>Definition</Form.Label>
                                    <Form.Control>
                                        <TextArea
                                            className="min-h-[48px] bg-background"
                                            placeholder="Enter definition..."
                                            {...field}
                                        />
                                    </Form.Control>
                                    <Form.Message />
                                </Form.Item>
                            )}
                        />
                    </div>
                </div>
            </Card.Content>
        </Card>
    );
}
