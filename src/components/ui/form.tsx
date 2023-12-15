import { Slot } from "@radix-ui/react-slot";
import { createContext, forwardRef, useContext, useId } from "react";
import { Controller, FormProvider, useFormContext } from "react-hook-form";

import type * as LabelPrimitive from "@radix-ui/react-label";
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
    name: TName;
}

const FormFieldContext = createContext<FormFieldContextValue | undefined>(
    {} as FormFieldContextValue,
);

function FormField<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    );
}

export const useFormField = () => {
    const fieldContext = useContext(FormFieldContext);
    const itemContext = useContext(FormItemContext);
    const { getFieldState, formState } = useFormContext();

    if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>");
    }

    const fieldState = getFieldState(fieldContext.name, formState);

    const { id } = itemContext;

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    };
};

interface FormItemContextValue {
    id: string;
}

const FormItemContext = createContext<FormItemContextValue>(
    {} as FormItemContextValue,
);

const FormItem = forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
    const id = useId();

    return (
        <FormItemContext.Provider value={{ id }}>
            <div
                className={cn("flex flex-col gap-2", className)}
                ref={ref}
                {...props}
            />
        </FormItemContext.Provider>
    );
});
FormItem.displayName = "FormItem";

const FormLabel = forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
    const { formItemId } = useFormField();

    return (
        <Label
            className={className}
            htmlFor={formItemId}
            ref={ref}
            {...props}
        />
    );
});
FormLabel.displayName = "FormLabel";

const FormControl = forwardRef<
    React.ElementRef<typeof Slot>,
    React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } =
        useFormField();

    return (
        <Slot
            aria-describedby={
                !error
                    ? `${formDescriptionId}`
                    : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={Boolean(error)}
            id={formItemId}
            ref={ref}
            {...props}
        />
    );
});
FormControl.displayName = "FormControl";

const FormDescription = forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
        <p
            className={cn("text-sm text-muted-foreground", className)}
            id={formDescriptionId}
            ref={ref}
            {...props}
        />
    );
});
FormDescription.displayName = "FormDescription";

const FormMessage = forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error.message) : children;

    if (!body) {
        return null;
    }

    return (
        <p
            className={cn("text-sm font-medium text-destructive", className)}
            id={formMessageId}
            ref={ref}
            {...props}
        >
            {body}
        </p>
    );
});
FormMessage.displayName = "FormMessage";

export const Form = Object.assign(FormProvider, {
    Item: FormItem,
    Label: FormLabel,
    Control: FormControl,
    Description: FormDescription,
    Message: FormMessage,
    Field: FormField,
});
