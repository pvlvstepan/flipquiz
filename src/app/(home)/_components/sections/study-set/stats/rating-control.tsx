"use client";

import { StarIcon } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface RatingControlProps {
    averageRating?: string;
    ratings: number;
    onSubmit: (rating: number) => Promise<void>;
}

export function StudySetRatingControl({
    averageRating,
    ratings,
    onSubmit,
}: RatingControlProps) {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const [isLoading, setIsLoading] = useTransition();

    const [ratingValue, setRatingValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(0);

    useEffect(() => {
        const handleOpen = () => {
            setOpen(true);
        };

        window.addEventListener("open-rating", handleOpen);
        return () => {
            window.removeEventListener("open-rating", handleOpen);
        };
    }, []);

    return (
        <Dialog onOpenChange={setOpen} open={open}>
            <Dialog.Trigger
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary hover:underline"
                type="button"
            >
                <StarIcon
                    className="fill-yellow-500 text-yellow-500"
                    size={16}
                />
                <span>
                    {averageRating} ({ratings} ratings)
                </span>
            </Dialog.Trigger>
            <Dialog.Content className="max-w-full sm:max-w-lg">
                <Dialog.Header className="text-xl sm:text-2xl">
                    How would you rate this set?
                </Dialog.Header>
                <div className="my-4 flex items-center gap-2 max-sm:justify-center">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <StarIcon
                            className={cn(
                                "cursor-pointer transition-all hover:fill-yellow-500",
                                {
                                    "fill-yellow-500 text-yellow-500":
                                        value <= ratingValue,
                                    "fill-yellow-500": value <= hoverValue,
                                },
                            )}
                            key={value}
                            onClick={() => {
                                setRatingValue(value);
                            }}
                            onMouseEnter={() => {
                                setHoverValue(value);
                            }}
                            onMouseLeave={() => {
                                setHoverValue(0);
                            }}
                            size={32}
                        />
                    ))}
                </div>
                <Dialog.Footer className="gap-y-2">
                    <Dialog.Close asChild>
                        <Button variant="outline">Cancel</Button>
                    </Dialog.Close>
                    <Button
                        className="min-w-[85px]"
                        disabled={ratingValue === 0 || isLoading}
                        onClick={() => {
                            setIsLoading(() =>
                                onSubmit(ratingValue)
                                    .then(() => {
                                        toast({
                                            title: "Your rating was saved",
                                        });
                                        setRatingValue(0);
                                        setOpen(false);
                                    })
                                    .catch(() => {
                                        toast({
                                            title: "Something went wrong",
                                            description:
                                                "Failed to rate study set",
                                            variant: "destructive",
                                        });
                                    }),
                            );
                        }}
                    >
                        {isLoading ? <Spinner /> : "Submit"}
                    </Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog>
    );
}
