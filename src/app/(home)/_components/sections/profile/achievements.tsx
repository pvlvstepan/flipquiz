"use client";

import { BookCopyIcon, Circle, FlameIcon } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Achievement } from "@prisma/client";
import { Navigation, Pagination } from "swiper/modules";

import { api } from "@/trpc/react";

const streakAchievements = [
    {
        id: Achievement.THREE_DAY_STREAK,
        name: "3 Day Study Streak",
        description: "Study for 3 days in a row",
        color: "bronze",
    },
    {
        id: Achievement.SEVEN_DAY_STREAK,
        name: "7 Day Study Streak",
        description: "Study for 1 week in a row",
        color: "silver",
    },
    {
        id: Achievement.FOURTEEN_DAY_STREAK,
        name: "14 Day Study Streak",
        description: "Study for 2 weeks in a row",
        color: "gold",
    },
    {
        id: Achievement.THIRTY_DAY_STREAK,
        name: "30 Day Study Streak",
        description: "Study for 1 month in a row",
        color: "diamond",
    },
];

const studySetAchievements = [
    {
        id: Achievement.FIVE_STUDY_SETS,
        name: "5 Sets",
        description: "Study 5 sets",
        color: "bronze",
    },
    {
        id: Achievement.TWENTY_FIVE_STUDY_SETS,
        name: "25 Sets",
        description: "Study 25 sets",
        color: "silver",
    },
    {
        id: Achievement.FIFTY_STUDY_SETS,
        name: "50 Sets",
        description: "Study 50 sets",
        color: "gold",
    },
    {
        id: Achievement.HUNDRED_STUDY_SETS,
        name: "100 Sets",
        description: "Study 100 sets",
        color: "diamond",
    },
];

export function Achievements() {
    const { data: userAchievements } =
        api.achievements.getAchievements.useQuery();

    return (
        <div>
            <h1 className="mb-8 text-xl sm:text-2xl">Achievements</h1>
            <Card className="overflow-hidden border-2 p-4 shadow-none sm:p-6">
                <div className="flex w-full flex-col gap-8">
                    <div className="w-full">
                        <h2 className="mb-8 text-xl text-primary">Streaks</h2>
                        <Swiper
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                },
                                640: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1024: {
                                    slidesPerView: 4,
                                },
                            }}
                            className="!overflow-visible !px-10 !pb-10"
                            modules={[Pagination, Navigation]}
                            navigation
                            pagination
                            spaceBetween={40}
                            style={
                                {
                                    "--swiper-theme-color":
                                        "hsl(var(--primary))",
                                } as React.CSSProperties
                            }
                        >
                            {streakAchievements.map((achievement) => {
                                const achieved = userAchievements?.find(
                                    (el) => el.achievement === achievement.id,
                                );

                                return (
                                    <SwiperSlide key={achievement.id}>
                                        <div
                                            className={cn(
                                                "flex flex-1 shrink-0 select-none flex-col items-center justify-center gap-2 text-center",
                                                achieved
                                                    ? "grayscale-0"
                                                    : "grayscale",
                                            )}
                                            key={achievement.id}
                                        >
                                            <div
                                                className={cn(
                                                    "relative flex h-40 w-40 items-center justify-center overflow-hidden",
                                                    achieved && "shine",
                                                )}
                                                style={{
                                                    color: `var(--${achievement.color})`,
                                                }}
                                            >
                                                <Circle className="absolute inset-0 h-full w-full" />
                                                <FlameIcon
                                                    className="fill-current stroke-current"
                                                    size={92}
                                                />
                                            </div>
                                            <h3 className="text-lg">
                                                {achievement.name}
                                            </h3>
                                            <p className="text-sm font-normal">
                                                {achievement.description}
                                            </p>
                                            {achieved ? (
                                                <p className="text-xs text-muted-foreground">
                                                    Received on{" "}
                                                    {achieved.createdAt.toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        },
                                                    )}
                                                </p>
                                            ) : null}
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                    <div className="w-full">
                        <h2 className="mb-8 text-xl text-primary">
                            Study sets
                        </h2>
                        <Swiper
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                },
                                640: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                1024: {
                                    slidesPerView: 4,
                                },
                            }}
                            className="!overflow-visible !px-10 !pb-10"
                            modules={[Pagination, Navigation]}
                            navigation
                            pagination
                            spaceBetween={40}
                            style={
                                {
                                    "--swiper-theme-color":
                                        "hsl(var(--primary))",
                                } as React.CSSProperties
                            }
                        >
                            {studySetAchievements.map((achievement) => {
                                const achieved = userAchievements?.find(
                                    (el) => el.achievement === achievement.id,
                                );

                                return (
                                    <SwiperSlide key={achievement.id}>
                                        <div
                                            className={cn(
                                                "flex flex-1 shrink-0 select-none flex-col items-center justify-center gap-2 text-center",
                                                achieved
                                                    ? "grayscale-0"
                                                    : "grayscale",
                                            )}
                                            key={achievement.id}
                                        >
                                            <div
                                                className={cn(
                                                    "relative flex h-40 w-40 items-center justify-center overflow-hidden",
                                                    achieved && "shine",
                                                )}
                                                style={{
                                                    color: `var(--${achievement.color})`,
                                                }}
                                            >
                                                <Circle className="absolute inset-0 h-full w-full" />
                                                <BookCopyIcon
                                                    className="stroke-current stroke-[3px]"
                                                    size={80}
                                                />
                                            </div>
                                            <h3 className="text-lg">
                                                {achievement.name}
                                            </h3>
                                            <p className="text-sm font-normal">
                                                {achievement.description}
                                            </p>
                                            {achieved ? (
                                                <p className="text-xs text-muted-foreground">
                                                    Received on{" "}
                                                    {achieved.createdAt.toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        },
                                                    )}
                                                </p>
                                            ) : null}
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                </div>
            </Card>
        </div>
    );
}
