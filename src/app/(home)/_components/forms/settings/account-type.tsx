"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "@prisma/client";
import { GraduationCapIcon } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
    role: z.nativeEnum(Role),
});

interface ChangeAccountTypeProps {
    defaultRole?: Role;
    onSubmit: (role: z.infer<typeof formSchema>["role"]) => Promise<void>;
}

export function ChangeAccountType({
    defaultRole,
    onSubmit: handleSubmit,
}: ChangeAccountTypeProps) {
    const [isLoading, setIsLoading] = useTransition();

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            role: defaultRole,
        },
    });

    const onSubmit = form.handleSubmit(async (data) => {
        setIsLoading(() =>
            handleSubmit(data.role)
                .then(() => {
                    toast({
                        title: "Account type changed",
                    });
                    form.reset({
                        role: data.role,
                    });
                })
                .catch(() => {
                    toast({
                        title: "Something went wrong",
                        description: "Please try again later",
                        variant: "destructive",
                    });
                }),
        );
    });

    const hasErrors = Object.keys(form.formState.errors).length > 0;
    const hasChanges = form.formState.isDirty;

    return (
        <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex w-40 shrink-0 flex-col gap-4 whitespace-nowrap sm:mt-4 sm:items-center">
                <GraduationCapIcon className="max-sm:hidden" size={32} />
                <span className="text-xl">Account type</span>
            </div>
            <Card className="col-span-3 w-full">
                <Form {...form}>
                    <form onSubmit={onSubmit}>
                        <Card.Header>
                            <Card.Title className="text-lg">
                                Student or teacher account?
                            </Card.Title>
                        </Card.Header>
                        <Card.Content>
                            <Form.Field
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <Form.Item className="space-y-3">
                                        <Form.Control>
                                            <RadioGroup
                                                className="flex gap-4"
                                                defaultValue={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <Form.Item className="flex flex-row items-center space-x-3 space-y-0">
                                                    <Form.Control>
                                                        <RadioGroupItem
                                                            value={Role.STUDENT}
                                                        />
                                                    </Form.Control>
                                                    <Form.Label className="font-normal">
                                                        Student
                                                    </Form.Label>
                                                </Form.Item>
                                                <Form.Item className="flex flex-row items-center space-x-3 space-y-0">
                                                    <Form.Control>
                                                        <RadioGroupItem
                                                            value={Role.TEACHER}
                                                        />
                                                    </Form.Control>
                                                    <Form.Label className="font-normal">
                                                        Teacher
                                                    </Form.Label>
                                                </Form.Item>
                                            </RadioGroup>
                                        </Form.Control>
                                        <Form.Message />
                                    </Form.Item>
                                )}
                            />
                        </Card.Content>
                        <Card.Footer>
                            <Button
                                className="min-w-[68px]"
                                disabled={isLoading || hasErrors || !hasChanges}
                            >
                                {isLoading ? <Spinner /> : "Save"}
                            </Button>
                        </Card.Footer>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
