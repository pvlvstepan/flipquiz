"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";

import { Children, useState } from "react";
import { Mousewheel } from "swiper/modules";

import { cn } from "@/lib/utils";

interface CardSwiperProps {
    children: React.ReactNode;
}

export function CardSwiper({ children }: CardSwiperProps) {
    const [initialized, setInitialized] = useState(false);

    return (
        <Swiper
            className={cn(
                "group/swiper relative !overflow-visible",
                !initialized && "opacity-0",
            )}
            modules={[Mousewheel]}
            mousewheel={{
                forceToAxis: true,
            }}
            onInit={() => {
                setInitialized(true);
            }}
            slidesPerView="auto"
            spaceBetween={16}
        >
            {Children.map(children, (child) => (
                <SwiperSlide className="max-w-[280px]">{child}</SwiperSlide>
            ))}
        </Swiper>
    );
}
