import { Separator } from "@/components/ui/separator";

export function AuthSeparator() {
    return (
        <div className="my-8 inline-flex w-full items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-muted-foreground">or email</span>
            <Separator className="flex-1" />
        </div>
    );
}
