"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    CheckIcon,
    FullscreenIcon,
    PauseIcon,
    PlayIcon,
    RefreshCcw,
    ShuffleIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Autoplay, EffectCards } from "swiper/modules";

import type { Swiper as SwiperType } from "swiper";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import { Tooltip } from "@/components/ui/tooltip";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { cn } from "@/lib/utils";

import { Results } from "./results";

interface CardSwiperProps {
    cards: {
        id: string;
        term: string;
        definition: string;
    }[];
    studySetName: string;
    onViewsIncrement: () => Promise<void>;
}

export function CardSwiper({
    cards: initialCards = [],
    studySetName,
    onViewsIncrement,
}: CardSwiperProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [shuffled, setShuffled] = useState(false);
    const [autoPlay, setAutoPlay] = useState(false);

    const swiperRef = useRef<SwiperType>();

    const cards = useMemo(() => {
        if (shuffled) {
            return [...initialCards].sort(() => 0.5 - Math.random());
        }

        return [...initialCards];
    }, [initialCards, shuffled]);

    useEffect(() => {
        void onViewsIncrement();
        // eslint-disable-next-line react-hooks/exhaustive-deps -- only run on mount
    }, []);

    const [fullscreen, setFullscreen] = useState(false);

    const [completedCards, setCompletedCards] = useLocalStorage<string[]>(
        "completed-cards",
        [],
    );

    const currentCard = useMemo(() => {
        return cards[activeIndex];
    }, [activeIndex, cards]);

    const allComplete = useMemo(() => {
        return cards.every((card) => completedCards.includes(card.id));
    }, [cards, completedCards]);

    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        if (currentCard && isFlipped) {
            setCompletedCards((prev) =>
                Array.from(new Set([...prev, currentCard.id])),
            );
        }
    }, [currentCard, isFlipped, setCompletedCards]);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const content = showResults ? (
        <Results
            numCards={cards.length}
            onPrevTerm={() => {
                setShowResults(false);
            }}
            onStartOver={() => {
                setActiveIndex(0);
                setShowResults(false);
                setIsFlipped(false);
                setShuffled(false);
                setAutoPlay(false);
            }}
        />
    ) : (
        <TooltipProvider>
            <div className="flex flex-1 flex-col">
                <div className="my-auto">
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
                        initialSlide={activeIndex}
                        modules={[EffectCards, Autoplay]}
                        onAutoplayStart={() => {
                            setAutoPlay(true);
                        }}
                        onAutoplayStop={() => {
                            setAutoPlay(false);
                        }}
                        onAutoplayTimeLeft={(s, t, progress) => {
                            const currentProgress = 1 - progress;

                            if (currentProgress > 0.5) {
                                setIsFlipped(true);
                            }
                        }}
                        onBeforeInit={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        onSlideChange={(s) => {
                            setActiveIndex(s.activeIndex);

                            setIsFlipped(false);
                        }}
                        slidesPerView={1}
                        spaceBetween={50}
                    >
                        {cards.map((card, i) => {
                            const isActive = activeIndex === i;

                            const isStudied =
                                completedCards.includes(card.id) && !isFlipped;

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
                                            if (isActive) {
                                                setIsFlipped(!isFlipped);
                                            }
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
                                                <div className="my-auto flex items-center justify-center whitespace-pre-line p-4 text-xl font-normal leading-snug sm:px-10 sm:py-5 sm:text-2xl md:text-3xl">
                                                    {card.term}
                                                    {isStudied && isMounted ? (
                                                        <Badge className="absolute left-4 top-4 !bg-green-100 p-1 text-base !text-green-500">
                                                            <span className="px-2 max-sm:hidden">
                                                                Studied
                                                            </span>
                                                            <CheckIcon
                                                                className="stroke-[3px] sm:mr-2"
                                                                size={16}
                                                            />
                                                        </Badge>
                                                    ) : null}
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
                                                    transform:
                                                        "rotateX(180deg)",
                                                }}
                                            >
                                                <div className="my-auto flex items-center justify-center whitespace-pre-line p-4 text-xl font-normal leading-snug sm:px-10 sm:py-5 sm:text-2xl md:text-3xl">
                                                    {card.definition}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
                <div className="mb-4 grid grid-cols-2 gap-8 text-muted-foreground sm:grid-cols-3">
                    <div className="row-start-2 mr-auto flex gap-4 sm:row-start-auto">
                        <Tooltip content={autoPlay ? "Pause" : "Play"}>
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
                        </Tooltip>
                        <Tooltip content="Shuffle">
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
                                <span className="sr-only">Shuffle</span>
                                <ShuffleIcon size={24} />
                            </Button>
                        </Tooltip>
                    </div>
                    <div className="col-span-2 flex items-center justify-between gap-4 sm:col-span-1 sm:justify-center">
                        <Tooltip content="Previous card">
                            <Button
                                disabled={activeIndex === 0}
                                onClick={() => swiperRef.current?.slidePrev()}
                                size="icon"
                                variant="outline"
                            >
                                <ArrowLeftIcon size={24} />
                                <span className="sr-only">Previous card</span>
                            </Button>
                        </Tooltip>
                        <span className="tabular-nums">
                            {activeIndex + 1} / {cards.length}
                        </span>
                        <Tooltip content="Next card">
                            <Button
                                disabled={
                                    !allComplete &&
                                    activeIndex === cards.length - 1
                                }
                                onClick={() => {
                                    swiperRef.current?.slideNext();

                                    if (
                                        activeIndex === cards.length - 1 &&
                                        allComplete
                                    ) {
                                        setShowResults(true);
                                    }
                                }}
                                size="icon"
                                variant="outline"
                            >
                                {activeIndex === cards.length - 1 &&
                                allComplete ? (
                                    <CheckIcon size={24} />
                                ) : (
                                    <ArrowRightIcon size={24} />
                                )}
                                <span className="sr-only">Next card</span>
                            </Button>
                        </Tooltip>
                    </div>
                    <div className="ml-auto flex gap-4">
                        <Tooltip
                            content={
                                !isFlipped ? "Show definition" : "Show term"
                            }
                        >
                            <Button
                                onClick={() => {
                                    setIsFlipped((s) => !s);
                                }}
                                size="icon"
                                variant="outline"
                            >
                                <RefreshCcw
                                    className={cn(
                                        "transition-transform duration-500",
                                        isFlipped && "rotate-[360deg]",
                                    )}
                                    size={24}
                                />
                                <span className="sr-only">
                                    {" "}
                                    {!isFlipped
                                        ? "Show definition"
                                        : "Show term"}
                                </span>
                            </Button>
                        </Tooltip>
                        <Tooltip content="Fullscreen">
                            <Button
                                onClick={() => {
                                    setFullscreen(!fullscreen);
                                }}
                                size="icon"
                                variant="outline"
                            >
                                <FullscreenIcon size={24} />
                                <span className="sr-only">Fullscreen</span>
                            </Button>
                        </Tooltip>
                    </div>
                </div>
                <div className="relative h-1 overflow-hidden rounded-lg bg-muted-foreground/20">
                    <div
                        className="absolute inset-0 bg-primary"
                        style={{
                            width: `${
                                (activeIndex / (cards.length - 1)) * 100
                            }%`,
                        }}
                    />
                </div>
            </div>
        </TooltipProvider>
    );

    return (
        <>
            {!fullscreen && content}
            <Dialog onOpenChange={setFullscreen} open={fullscreen}>
                <Dialog.Content className="h-full w-full max-w-full !rounded-none border-none p-0">
                    <div className="relative flex flex-col overflow-hidden px-4 py-6">
                        <div className="absolute inset-x-0 top-0 flex h-12 items-center bg-white ring-2 ring-border">
                            <div className="container">
                                <h1 className="truncate pr-12 text-xl sm:text-2xl">
                                    {studySetName}
                                </h1>
                            </div>
                        </div>
                        <div className="container flex max-w-3xl flex-1 flex-col p-0">
                            {fullscreen ? content : null}
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog>
        </>
    );
}
