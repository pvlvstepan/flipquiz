"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";

import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { TextArea } from "@/components/ui/textarea";
import { studySetSchema } from "@/server/schemas/study-set";
import { api } from "@/trpc/react";

import { CardForm } from "./card-form";
import { SortableList } from "./sortable-list";

const partialStudySetSchema = studySetSchema.partial();

interface StudySetFormProps {
    defaultValues?: z.infer<typeof partialStudySetSchema>;
    mode: "create" | "update";
}

export function StudySetForm({ defaultValues, mode }: StudySetFormProps) {
    const { mutateAsync, isLoading } =
        api.studySet[mode === "create" ? "create" : "update"].useMutation();

    const router = useRouter();

    const form = useForm<z.infer<typeof studySetSchema>>({
        resolver: zodResolver(studySetSchema),
        defaultValues: {
            id: defaultValues?.id ?? undefined,
            name: defaultValues?.name ?? "",
            description: defaultValues?.description ?? "",
            cards: defaultValues?.cards ?? [
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
        mutateAsync(data)
            .then((studySet) => {
                console.log("BRUHHHH");

                router.push(`/study-set/${studySet.id}`);
            })
            .catch((err) => {
                console.error(err);
            });
    });

    const { fields, remove, append, swap } = useFieldArray({
        name: "cards",
        control: form.control,
    });

    const buttonText = mode === "create" ? "Create" : "Done";

    return (
        <Form {...form}>
            <form
                className="flex flex-col"
                onSubmit={onSubmit}
                id="study-set-form"
            >
                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
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
                                            disabled={isLoading}
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
                                            className="min-h-[48px] bg-background md:flex-1"
                                            disabled={isLoading}
                                            placeholder="Add a description..."
                                            {...field}
                                        />
                                    </Form.Control>
                                    <Form.Message />
                                </Form.Item>
                            )}
                        />
                    </div>
                    <div className="row-span-2 flex flex-col gap-4">
                        <Form.Field
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <Form.Item>
                                    <Form.Label>Area</Form.Label>
                                    <Form.Control>
                                        <Input
                                            className="bg-background"
                                            disabled={isLoading}
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
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </Form.Control>
                                    <Form.Message />
                                </Form.Item>
                            )}
                        />
                    </div>
                </div>
                <SortableList
                    className="flex flex-col gap-4"
                    items={fields}
                    onMove={(dragIndex, hoverIndex) => {
                        swap(dragIndex, hoverIndex);
                    }}
                    renderItem={(item, index) => (
                        <SortableList.Item id={item.id}>
                            <CardForm
                                control={form.control}
                                disableRemove={fields.length <= 2}
                                disabled={isLoading}
                                index={index}
                                key={item.id}
                                onRemove={() => {
                                    remove(index);
                                }}
                            />
                        </SortableList.Item>
                    )}
                />
                <Button
                    className="mt-8 h-20 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                    disabled={isLoading}
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
                <Button
                    className="mt-8 sm:ml-auto"
                    disabled={isInvalid || isLoading}
                    size="lg"
                    type="submit"
                >
                    {isLoading ? <Spinner /> : buttonText}
                </Button>
            </form>
        </Form>
    );
}
