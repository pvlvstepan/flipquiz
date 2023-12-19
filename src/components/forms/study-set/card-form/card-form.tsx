"use client";

import { SeparatorHorizontalIcon, Trash2Icon } from "lucide-react";

import type { Control } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { TextArea } from "@/components/ui/textarea";

import { SortableList } from "../sortable-list";

interface CardFormProps {
    index: number;
    onRemove?: () => void;
    disableRemove?: boolean;
    disabled?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- // TODO: fix this to be more specific
    control: Control<any>;
}

export function CardForm({
    index,
    onRemove,
    disableRemove,
    disabled,
    control,
}: CardFormProps) {
    return (
        <Card className="border-2 shadow-none" id="card-form">
            <Card.Header className="flex-row items-center justify-between border-b-2 px-4 py-2 sm:px-6">
                <Card.Description>Card {index + 1}</Card.Description>
                <div className="flex gap-3">
                    <Button
                        className="hover:text-destructive"
                        disabled={disableRemove || disabled}
                        onClick={onRemove}
                        size="icon"
                        type="button"
                        variant="outline"
                    >
                        <Trash2Icon size={16} />
                    </Button>
                    <SortableList.DragHandle>
                        <Button
                            className="cursor-grab"
                            disabled={disabled}
                            size="icon"
                            type="button"
                            variant="outline"
                        >
                            <SeparatorHorizontalIcon size={16} />
                        </Button>
                    </SortableList.DragHandle>
                </div>
            </Card.Header>
            <Card.Content className="p-4 sm:p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Form.Field
                        control={control}
                        name={`cards.${index}.term`}
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Label>Term</Form.Label>
                                <Form.Control>
                                    <TextArea
                                        className="min-h-[48px] bg-background font-normal"
                                        disabled={disabled}
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
                                            className="min-h-[48px] bg-background font-normal"
                                            disabled={disabled}
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
