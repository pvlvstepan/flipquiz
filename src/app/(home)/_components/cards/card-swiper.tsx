"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/scrollbar";

import { Children } from "react";
import { Mousewheel } from "swiper/modules";

import { cn } from "@/lib/utils";

interface CardSwiperProps {
    children: React.ReactNode;
}

export function CardSwiper({ children }: CardSwiperProps) {
    return (
        <Swiper
            className={cn("group/swiper relative !overflow-visible")}
            modules={[Mousewheel]}
            mousewheel={{
                forceToAxis: true,
            }}
            slidesPerView="auto"
        >
            {Children.map(children, (child) => (
                <SwiperSlide className="mr-4 max-w-[280px] last:mr-0">
                    {child}
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
