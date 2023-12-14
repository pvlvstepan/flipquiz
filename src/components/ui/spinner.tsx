import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

export type SpinnerProps = React.SVGAttributes<SVGElement>;

export function Spinner({ className, ...rest }: SpinnerProps) {
    return (
        <Loader2
            className={cn(
                "h-[1.5em] w-[1.5em] shrink-0 animate-spin text-inherit",
                className,
            )}
            {...rest}
        />
    );
}
