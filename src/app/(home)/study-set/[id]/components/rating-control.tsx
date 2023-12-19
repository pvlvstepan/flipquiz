"use client";

import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

interface RatingControlProps {
    rating: number | null;
    reviewsCount: number | null;
    studySetId: number;
    belongsToCurrentUser: boolean;
}

export function RatingControl({
    rating = 0,
    reviewsCount = 0,
    studySetId,
    belongsToCurrentUser,
}: RatingControlProps) {
    const [open, setOpen] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(0);

    const { mutateAsync, isLoading } = api.studySet.addReview.useMutation();

    const router = useRouter();

    return (
        <>
            <Button
                className="h-auto p-0 text-muted-foreground !opacity-100 hover:text-primary"
                disabled={belongsToCurrentUser}
                onClick={() => {
                    if (!belongsToCurrentUser) {
                        setOpen(true);
                    }
                }}
                size="sm"
                variant="link"
            >
                <StarIcon
                    className="fill-yellow-500 text-yellow-500"
                    size={16}
                />
                <span>
                    {rating} ({reviewsCount} reviews)
                </span>
            </Button>
            <Dialog
                onOpenChange={() => {
                    setOpen(false);
                }}
                open={open}
            >
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
                        <Button
                            onClick={() => {
                                setOpen(false);
                            }}
                            variant="outline"
                        >
                            Cancel
                        </Button>
                        <Button
                            className="min-w-[85px]"
                            disabled={ratingValue === 0 || isLoading}
                            onClick={() => {
                                void mutateAsync({
                                    id: studySetId,
                                    rating: ratingValue,
                                }).then(() => {
                                    router.refresh();
                                    setOpen(false);
                                });
                            }}
                        >
                            {isLoading ? <Spinner /> : "Submit"}
                        </Button>
                    </Dialog.Footer>
                </Dialog.Content>
            </Dialog>
        </>
    );
}
