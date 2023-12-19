"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

import { useEventListener } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

type TextAreaRef = HTMLTextAreaElement | null;

export const TextArea = forwardRef<TextAreaRef, TextAreaProps>(
    ({ className, value, ...props }, ref) => {
        const textAreaRef = useRef<TextAreaRef>(null);

        useImperativeHandle<TextAreaRef, TextAreaRef>(
            ref,
            () => textAreaRef.current,
        );

        function resizeTextArea(textArea: HTMLTextAreaElement) {
            textArea.style.height = "auto";
            textArea.style.height = `${textArea.scrollHeight}px`;
        }

        useEffect(() => {
            if (textAreaRef.current) {
                resizeTextArea(textAreaRef.current);
            }
        }, [value]);

        useEventListener("resize", () => {
            if (textAreaRef.current) {
                resizeTextArea(textAreaRef.current);
            }
        });

        return (
            <textarea
                className={cn(
                    "flex h-auto w-full resize-none overflow-hidden rounded-md border-2 border-input bg-secondary px-3 py-2.5 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    className,
                )}
                ref={textAreaRef}
                rows={1}
                value={value}
                {...props}
            />
        );
    },
);

TextArea.displayName = "TextArea";
