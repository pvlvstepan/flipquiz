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
            <div className="relative w-full">
                <input
                    className={cn(
                        "flex h-12 w-full rounded-md border-2 border-input bg-secondary px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        type === "password" && "pr-12",
                        className,
                    )}
                    ref={ref}
                    type={inputType}
                    {...props}
                />
                {type === "password" && (
                    <Button
                        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-sm hover:bg-secondary-foreground/10"
                        onClick={togglePasswordVisibility}
                        size="icon"
                        type="button"
                        variant="ghost"
                    >
                        {showPassword ? (
                            <EyeIcon size={16} />
                        ) : (
                            <EyeOffIcon size={16} />
                        )}
                    </Button>
                )}
            </div>
        );
    },
);

Input.displayName = "Input";

export { Input };
