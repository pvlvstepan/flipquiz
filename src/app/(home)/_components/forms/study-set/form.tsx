"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useMemo, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { type z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { TextArea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
    createStudySetInput,
    updateStudySetInput,
} from "@/server/schemas/study-set";
import { api } from "@/trpc/react";

import { CardForm } from "./card-form";
import { SortableList } from "./sortable-list";

interface CreateStudySetFormProps {
    mode: "create";
    onSubmit: (data: z.infer<typeof createStudySetInput>) => Promise<void>;
    defaultValues?: never;
}

interface UpdateStudySetFormProps {
    mode: "update";
    onSubmit: (data: z.infer<typeof updateStudySetInput>) => Promise<void>;
    defaultValues: z.infer<typeof updateStudySetInput>;
}

const mergedSchema = createStudySetInput.merge(updateStudySetInput).partial({
    id: true,
});

export function StudySetForm({
    defaultValues,
    mode,
    onSubmit: submitData,
}: CreateStudySetFormProps | UpdateStudySetFormProps) {
    const [isLoading, setIsLoading] = useTransition();

    const areasMeta = api.meta.getAreas.useQuery(undefined, {
        staleTime: Infinity,
    });
    const subjectsMeta = api.meta.getSubjects.useQuery(undefined, {
        staleTime: Infinity,
    });

    const form = useForm<z.infer<typeof mergedSchema>>({
        resolver: zodResolver(mergedSchema),
        defaultValues: {
            id: defaultValues?.id,
            name: defaultValues?.name ?? "",
            description: defaultValues?.description ?? "",
            subjectId: defaultValues?.subjectId,
            areaId: defaultValues?.areaId,
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

    const { fields, remove, append, swap } = useFieldArray({
        name: "cards",
        control: form.control,
    });

    const isInvalid = Boolean(Object.keys(form.formState.errors).length);
    const hasChanges = form.formState.isDirty;

    const selectedArea = form.watch("areaId");
    const subjectsByArea = useMemo(() => {
        return subjectsMeta.data?.filter(
            (subject) => subject.areaId === selectedArea,
        );
    }, [selectedArea, subjectsMeta.data]);

    const { toast } = useToast();

    const handleToast = (promise: () => Promise<void>) => {
        return promise()
            .then(() => {
                toast({
                    title: "Study set created",
                });
                form.reset();
            })
            .catch(() => {
                toast({
                    title: "Something went wrong",
                    description: "Failed to create study set",
                    variant: "destructive",
                });
            });
    };

    const onSubmit = form.handleSubmit((data) => {
        setIsLoading(() => {
            if (mode === "create") {
                return handleToast(() => submitData(data));
            }
            return handleToast(() =>
                submitData({
                    ...data,
                    id: defaultValues.id,
                }),
            );
        });
    });

    const buttonText = mode === "create" ? "Create" : "Done";

    return (
        <Form {...form}>
            <form
                className="flex flex-col"
                id="study-set-form"
                onSubmit={onSubmit}
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
                                            {...field}
                                            className="bg-background font-normal"
                                            disabled={isLoading}
                                            placeholder="Enter a title, something like “Biology 101”"
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
                                            {...field}
                                            className="min-h-[48px] bg-background font-normal md:min-h-[calc(100%-22px)]"
                                            disabled={isLoading}
                                            placeholder="Add a description..."
                                            value={field.value ?? ""}
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
                            name="areaId"
                            render={({ field }) => (
                                <Form.Item>
                                    <Form.Label>Area</Form.Label>
                                    <Form.Control>
                                        <Select
                                            classNames={{
                                                content: "max-h-[300px]",
                                            }}
                                            disabled={
                                                isLoading || areasMeta.isLoading
                                            }
                                            onValueChange={(v) => {
                                                form.resetField("subjectId");
                                                field.onChange(v);
                                            }}
                                            placeholder="Select an area"
                                            value={field.value}
                                        >
                                            {areasMeta.data?.length ? (
                                                areasMeta.data.map((area) => (
                                                    <SelectItem
                                                        key={area.id}
                                                        value={area.id}
                                                    >
                                                        {area.name}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem
                                                    disabled
                                                    value="not-found"
                                                >
                                                    No areas found
                                                </SelectItem>
                                            )}
                                        </Select>
                                    </Form.Control>
                                    <Form.Message />
                                </Form.Item>
                            )}
                        />
                        <Form.Field
                            control={form.control}
                            name="subjectId"
                            render={({ field }) => (
                                <Form.Item>
                                    <Form.Label>Subject</Form.Label>
                                    <Form.Control>
                                        <Select
                                            classNames={{
                                                content: "max-h-[300px]",
                                            }}
                                            disabled={
                                                isLoading ||
                                                subjectsMeta.isLoading ||
                                                !selectedArea
                                            }
                                            onValueChange={(v) => {
                                                field.onChange(v);
                                            }}
                                            placeholder="Select a subject"
                                            value={field.value}
                                        >
                                            {subjectsByArea?.length ? (
                                                subjectsByArea.map((area) => (
                                                    <SelectItem
                                                        key={area.id}
                                                        value={area.id}
                                                    >
                                                        {area.name}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <SelectItem
                                                    disabled
                                                    value="not-found"
                                                >
                                                    No subjects found
                                                </SelectItem>
                                            )}
                                        </Select>
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
                    disabled={isInvalid || isLoading || !hasChanges}
                    size="lg"
                    type="submit"
                >
                    {isLoading ? <Spinner /> : buttonText}
                </Button>
            </form>
        </Form>
    );
}
