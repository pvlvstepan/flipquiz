"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import {
    ArrowLeftIcon,
    ArrowRightIcon,
    FullscreenIcon,
    PauseIcon,
    PlayIcon,
    ShuffleIcon,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { Autoplay, EffectCards } from "swiper/modules";

import type { Swiper as SwiperType } from "swiper";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CardSwiperProps {
    cards: {
        id: number;
        term: string;
        definition: string;
    }[];
}

export function CardSwiper({ cards: initialCards = [] }: CardSwiperProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [totalProgress, setTotalProgress] = useState(0);
    const [shuffled, setShuffled] = useState(false);
    const [autoPlay, setAutoPlay] = useState(false);

    const swiperRef = useRef<SwiperType>();

    const cards = useMemo(() => {
        if (shuffled) {
            return [...initialCards].sort(() => 0.5 - Math.random());
        }

        return [...initialCards];
    }, [initialCards, shuffled]);

    return (
        <div>
            <Swiper
                autoplay={
                    autoPlay
                        ? {
                              delay: 6000,
                              pauseOnMouseEnter: true,
                              disableOnInteraction: false,
                          }
                        : false
                }
                className="mb-8"
                effect="cards"
                grabCursor
                modules={[EffectCards, Autoplay]}
                onAutoplayStart={() => {
                    setAutoPlay(true);
                }}
                onAutoplayStop={() => {
                    setAutoPlay(false);
                }}
                onAutoplayTimeLeft={(s, t, progress) => {
                    const currentProgress = 1 - progress;

                    setTotalProgress(
                        s.progress + currentProgress / cards.length,
                    );

                    if (currentProgress > 0.5) {
                        setIsFlipped(true);
                    }
                }}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                onSlideChange={(s) => {
                    setActiveIndex(s.activeIndex);
                    setTotalProgress(s.progress);
                    setIsFlipped(false);

                    if (s.activeIndex === cards.length - 1) {
                        swiperRef.current?.autoplay.stop();
                    }
                }}
                slidesPerView={1}
                spaceBetween={50}
            >
                {cards.map((card, i) => {
                    const isActive = activeIndex === i;

                    return (
                        <SwiperSlide
                            className={cn(
                                "rounded-lg",
                                isActive && "!overflow-visible",
                            )}
                            key={card.id}
                        >
                            <Card
                                className="h-[300px] border-2 shadow-lg transition-transform duration-500 sm:h-[400px]"
                                onClick={() => {
                                    isActive && setIsFlipped(!isFlipped);
                                }}
                                style={{
                                    transform:
                                        isFlipped && isActive
                                            ? "rotateX(180deg)"
                                            : "rotateX(0deg)",
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg">
                                    <div
                                        className={cn(
                                            "absolute text-5xl text-primary/50 transition-opacity duration-500",
                                            isActive && "opacity-0",
                                        )}
                                    >
                                        FlipQuiz
                                    </div>
                                    <div
                                        className={cn(
                                            "absolute inset-0 flex flex-col overflow-y-auto transition-opacity",
                                            isFlipped || !isActive
                                                ? "pointer-events-none opacity-0"
                                                : "delay-200",
                                        )}
                                    >
                                        <div className="my-auto flex items-center justify-center whitespace-pre-line p-4 text-xl font-normal  leading-snug sm:px-10  sm:py-5 sm:text-2xl md:text-3xl">
                                            {card.term}
                                        </div>
                                    </div>
                                    <div
                                        className={cn(
                                            "absolute inset-0 flex flex-col overflow-y-auto transition-opacity",
                                            !isFlipped || !isActive
                                                ? "pointer-events-none opacity-0"
                                                : "delay-200",
                                        )}
                                        style={{
                                            transform: "rotateX(180deg)",
                                        }}
                                    >
                                        <div className="my-auto flex items-center justify-center whitespace-pre-line p-4 text-xl font-normal  leading-snug sm:px-10  sm:py-5 sm:text-2xl md:text-3xl">
                                            {card.definition}
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <div className="mb-4 grid grid-cols-2 gap-8 text-muted-foreground sm:grid-cols-3">
                <div className="row-start-2 mr-auto flex gap-4 sm:row-start-auto">
                    <Button
                        className="group/play"
                        onClick={() => {
                            if (autoPlay) {
                                swiperRef.current?.autoplay.stop();
                            } else {
                                swiperRef.current?.autoplay.start();
                            }
                        }}
                        size="icon"
                        variant="outline"
                    >
                        {!autoPlay ? (
                            <PlayIcon
                                className="group-hover/play:fill-green-400 group-hover/play:stroke-green-400"
                                size={24}
                            />
                        ) : (
                            <PauseIcon
                                className="group-hover/play:fill-red-400 group-hover/play:stroke-red-400"
                                size={24}
                            />
                        )}
                        <span className="sr-only">
                            {autoPlay ? "Pause" : "Play"}
                        </span>
                    </Button>
                    <Button
                        className={cn(
                            shuffled &&
                                "!border-primary/50 !bg-primary/10 !text-primary",
                        )}
                        onClick={() => {
                            setShuffled((s) => !s);
                        }}
                        size="icon"
                        variant="outline"
                    >
                        <span className="sr-only">
                            {shuffled ? "Unshuffle" : "Shuffle"}
                        </span>
                        <ShuffleIcon size={24} />
                    </Button>
                </div>
                <div className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1 sm:justify-center">
                    <Button
                        disabled={activeIndex === 0}
                        onClick={() => swiperRef.current?.slidePrev()}
                        size="icon"
                        variant="outline"
                    >
                        <ArrowLeftIcon size={24} />
                        <span className="sr-only">Previous card</span>
                    </Button>
                    <span className="tabular-nums">
                        {activeIndex + 1} / {cards.length}
                    </span>
                    <Button
                        disabled={activeIndex === cards.length - 1}
                        onClick={() => swiperRef.current?.slideNext()}
                        size="icon"
                        variant="outline"
                    >
                        <ArrowRightIcon size={24} />
                        <span className="sr-only">Next card</span>
                    </Button>
                </div>
                <div className="ml-auto flex gap-4">
                    {/* <Button size="icon" variant="outline">
                        <SettingsIcon size={24} />
                    </Button> */}
                    <Button size="icon" variant="outline">
                        <FullscreenIcon size={24} />
                        <span className="sr-only">Fullscreen</span>
                    </Button>
                </div>
            </div>
            <div className="relative h-1 overflow-hidden rounded-lg bg-muted-foreground/20">
                <div
                    className="absolute inset-0 bg-primary"
                    style={{
                        width: `${totalProgress * 100}%`,
                    }}
                />
            </div>
        </div>
    );
}
