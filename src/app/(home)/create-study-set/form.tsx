"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";

import { DraggableCard } from "../components/forms/study-set";

const formSchema = z.object({
    name: z.string().min(1, "Study set title can't be empty"),
    description: z.string().optional(),
    cards: z.array(
        z.object({
            term: z.string().min(1, "Term can't be empty"),
            definition: z.string().min(1, "Definition can't be empty"),
        }),
    ),
});

export function CreateStudySetForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            cards: [
                {
                    term: "",
                    definition: "",
                },
                {
                    term: "",
                    definition: "",
                },
            ],
        },
    });

    const isInvalid = Boolean(Object.keys(form.formState.errors).length);

    const onSubmit = form.handleSubmit((data) => {
        console.log(data);
    });

    const {
        fields: cards,
        remove,
        append,
        swap,
    } = useFieldArray({
        name: "cards",
        control: form.control,
    });

    const moveCard = useCallback(
        (dragIndex: number, hoverIndex: number) => {
            swap(dragIndex, hoverIndex);
        },
        [swap],
    );

    return (
        <Form {...form}>
            <form
                className="flex flex-col gap-y-8"
                noValidate
                onSubmit={onSubmit}
            >
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl md:text-3xl">
                        Create new study set
                    </h1>
                    <Button
                        className="hidden sm:flex"
                        disabled={isInvalid}
                        type="submit"
                    >
                        Create
                    </Button>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <Form.Field
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <Form.Item>
                                    <Form.Label>Study set title</Form.Label>
                                    <Form.Control>
                                        <Input
                                            className="bg-background"
                                            placeholder="Enter a title, something like “Biology 101”"
                                            {...field}
                                        />
                                    </Form.Control>
                                    <Form.Message />
                                </Form.Item>
                            )}
                        />
                    </div>
                    <div className="md:row-span-2">
                        <Form.Field
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <Form.Item className="h-full">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control>
                                        <TextArea
                                            className="min-h-full resize-none bg-background"
                                            placeholder="Add a description..."
                                            style={{
                                                minHeight: "calc(100% - 4rem)",
                                            }}
                                            {...field}
                                        />
                                    </Form.Control>
                                    <Form.Message />
                                </Form.Item>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-y-8">
                        <Form.Field
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <Form.Item>
                                    <Form.Label>Area</Form.Label>
                                    <Form.Control>
                                        <Input
                                            className="bg-background"
                                            {...field}
                                        />
                                    </Form.Control>
                                    <Form.Message />
                                </Form.Item>
                            )}
                        />
                        <Form.Field
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <Form.Item>
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control>
                                        <Input
                                            className="bg-background"
                                            {...field}
                                        />
                                    </Form.Control>
                                    <Form.Message />
                                </Form.Item>
                            )}
                        />
                    </div>
                </div>
                <DndProvider backend={HTML5Backend}>
                    <div className="flex flex-col gap-8">
                        {cards.map((card, i) => (
                            <DraggableCard
                                control={form.control}
                                disableRemove={cards.length <= 2}
                                id={card.id}
                                index={i}
                                key={card.id}
                                moveCard={moveCard}
                                onRemove={() => {
                                    remove(i);
                                }}
                            />
                        ))}
                        <Button
                            className="h-20 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                            onClick={() => {
                                append({
                                    term: "",
                                    definition: "",
                                });
                            }}
                            variant="outline"
                        >
                            <PlusIcon size={24} />
                            <span> Add card</span>
                        </Button>
                    </div>
                </DndProvider>
                <Button
                    className="sm:ml-auto"
                    disabled={isInvalid}
                    size="lg"
                    type="submit"
                >
                    Create
                </Button>
            </form>
        </Form>
    );
}
