"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { forwardRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };

        const inputType = type === "password" && showPassword ? "text" : type;

        return (
            <div className="relative">
                <input
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        type === "password" && "pr-10",
                        className,
                    )}
                    ref={ref}
                    type={inputType}
                    {...props}
                />
                {type === "password" && (
                    <Button
                        className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 rounded-sm"
                        onClick={togglePasswordVisibility}
                        size="icon"
                        type="button"
                        variant="ghost"
                    >
                        {showPassword ? (
                            <EyeIcon
                                className="h-4 w-4 text-gray-500"
                                name="eye"
                            />
                        ) : (
                            <EyeOffIcon
                                className="h-4 w-4 text-gray-500"
                                name="eye-off"
                            />
                        )}
                    </Button>
                )}
            </div>
        );
    },
);

Input.displayName = "Input";

export { Input };
