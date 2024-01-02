import { format } from "date-fns";
import { DotIcon, FlameIcon, XIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";

export async function StudyStreak() {
    const { streakCount, streaks } =
        await api.studyStreak.getStudyStreak.query();

    return (
        <Card className="border-2 shadow-none">
            <div className="p-4 sm:p-6">
                <div className="flex flex-col gap-8 md:flex-row md:items-center">
                    <div>
                        <h1 className="mb-1 text-xl text-primary">
                            Keep the streak going!
                        </h1>
                        <p className="text-sm">
                            You&apos;ve studied for{" "}
                            <span className="text-primary">{streakCount}</span>{" "}
                            days in a row
                        </p>
                    </div>
                    <div className="relative grid flex-1 grid-cols-7">
                        <div className="absolute inset-x-0 top-8 h-4 rounded-full bg-primary/10" />
                        {Array.from({ length: 7 }).map((el, i) => {
                            const now = new Date();
                            const first = now.getDate() - now.getDay() + 1; // This will get the Monday of the week
                            const day = new Date(now.setDate(first + i));
                            const isToday =
                                format(day, "yyyy-MM-dd") ===
                                format(new Date(), "yyyy-MM-dd");
                            const shortDayName = format(day, "EEE");
                            const dateNumber = format(day, "d");

                            // if day is in streaks array, show flame icon

                            const isStreak = streaks
                                .map((s) => format(s.createdAt, "yyyy-MM-dd"))
                                .includes(format(day, "yyyy-MM-dd"));

                            // if day is not in streaks array, and is past today, show x icon

                            const isLostStreak =
                                !streaks
                                    .map((s) =>
                                        format(s.createdAt, "yyyy-MM-dd"),
                                    )
                                    .includes(format(day, "yyyy-MM-dd")) &&
                                day < new Date();

                            return (
                                <div
                                    className="relative flex flex-col items-center justify-between"
                                    key={shortDayName}
                                >
                                    <span>{shortDayName}</span>
                                    <div className="h-8 w-8">
                                        {isStreak ? (
                                            <FlameIcon
                                                className="fill-orange-400 stroke-orange-400"
                                                size={32}
                                            />
                                        ) : null}
                                        {isLostStreak ? (
                                            <XIcon
                                                className="fill-red-400 stroke-red-400"
                                                size={32}
                                            />
                                        ) : null}
                                    </div>
                                    <span>{dateNumber}</span>
                                    <span
                                        className={cn(
                                            "text-primary",
                                            isToday
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    >
                                        <DotIcon className="-m-2" size={24} />
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Card>
    );
}
