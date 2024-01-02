"use client";

import {
    ArrowLeft,
    CheckIcon,
    ChevronRight,
    MessageSquare,
    RotateCcw,
    StarIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
// eslint-disable-next-line import/no-named-as-default -- named import breaks the client
import ReactConfetti from "react-confetti";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEventListener } from "@/lib/hooks";

function ConfettiIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            fill="none"
            height="111"
            viewBox="0 0 171 111"
            width="171"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M163.921 98.5807L74.7485 94.1152C70.0877 93.88 67.0775 89.1185 68.8949 84.8455L92.6655 28.9344C94.4829 24.6613 100.02 23.4862 103.437 26.6399L168.838 87.0174C173.433 91.2616 170.191 98.8957 163.921 98.5807Z"
                fill="#FFE663"
            />
            <path
                d="M70.1616 92.5253C65.4636 90.5368 68.1765 73.7292 76.2201 54.9858C84.2637 36.2416 94.593 22.6594 99.291 24.6478C103.989 26.6372 101.276 43.4447 93.2325 62.1881C85.1889 80.9315 74.8595 94.5146 70.1616 92.5253Z"
                fill="#FFAD72"
            />
            <path
                d="M89.6985 45.8736C91.53 45.8736 93.4184 45.7281 95.3539 45.4082C96.7781 45.1738 95.9313 40.0406 94.5022 40.2799C86.8692 41.5357 80.182 39.7207 75.128 36.7552C75.8806 36.2848 76.5332 35.7207 77.0826 35.0628C79.1742 32.5719 79.5245 28.9189 78.0433 25.0414C76.4952 20.9946 73.2776 18.2446 69.4256 17.6853C66.3401 17.2339 63.3539 18.3342 61.6496 20.5521C60.6088 21.9065 59.1606 24.844 61.1292 29.3424C61.6546 30.5406 62.3882 31.7914 63.3158 33.0513C62.8144 32.9806 62.289 32.8909 61.7397 32.7922C54.8121 31.5283 47.3823 23.1516 47.3063 23.0718C46.3547 21.9904 42.4126 25.4082 43.3593 26.4888C43.7095 26.8884 52.0571 36.3177 60.7938 37.9115C63.7752 38.4567 66.4062 38.6631 68.678 38.5365C73.8782 42.6541 81.1618 45.8736 89.6985 45.8736ZM68.0625 22.7848C68.2608 22.7848 68.4648 22.7996 68.6681 22.8276C69.6007 22.9641 71.9055 23.6269 73.1496 26.8794C73.5238 27.8613 74.2664 30.2914 73.0645 31.7256C72.7241 32.1294 71.9476 32.7552 70.2632 33.1072C68.2377 31.1894 66.7606 29.1401 65.9329 27.2602C65.2654 25.7322 65.2233 24.4682 65.8098 23.7018C66.2592 23.1237 67.1109 22.7848 68.0625 22.7848Z"
                fill="#51CFFF"
            />
            <path
                d="M52.5625 97.3345C52.5625 93.2498 54.5789 89.2877 58.2468 86.1709C62.6052 82.467 68.5579 80.6668 73.797 81.4801C75.2261 81.6964 76.0357 76.5632 74.6065 76.3428C67.8013 75.2893 60.4136 77.4851 54.8441 82.2178C49.9975 86.3354 47.3292 91.7038 47.3292 97.3345C47.3292 98.7729 52.5625 98.7729 52.5625 97.3345Z"
                fill="#E372FF"
            />
            <path
                d="M20.1524 76.121C22.8306 76.121 25.4005 75.0494 27.1138 73.1267C28.476 71.5947 30.4454 68.2008 28.2918 62.6448C27.5913 60.8348 26.2902 59.3266 24.6198 58.0717C27.1039 57.0889 30.1472 56.3365 33.6911 55.857C35.1252 55.6646 34.4205 50.5174 32.9815 50.7057C26.5835 51.5709 22.097 53.1876 18.9545 55.0865C11.0374 52.0972 1.23669 51.8241 1.08552 51.8241C-0.362606 51.8241 -0.362606 57.0231 1.08552 57.0231C2.50473 57.0231 7.78671 57.3381 13.248 58.7296C13.6263 58.8282 13.9997 58.9269 14.3648 59.0305C12.3343 61.6103 11.823 64.149 11.7379 65.7328C11.4826 70.3348 14.2269 74.9549 17.7295 75.8249C18.5291 76.0272 19.3428 76.121 20.1524 76.121ZM19.57 61.0322C21.5956 62.0897 22.9255 63.2838 23.403 64.5157C24.0094 66.0856 24.4678 68.2526 23.1907 69.686C22.2581 70.7345 20.5687 71.1761 18.9975 70.7863C18.3961 70.607 16.7588 68.6424 16.972 65.8833C17.114 64.0741 18.0037 62.4425 19.57 61.0322Z"
                fill="#4255FF"
            />
            <path
                d="M16.8541 32.5475C16.7211 32.4727 16.6079 32.374 16.5229 32.2465C16.4378 32.1248 16.3758 31.9834 16.3527 31.8378C16.3238 31.6923 16.3337 31.5368 16.3758 31.3962C16.4188 31.2498 16.4898 31.1183 16.5889 31.0056L19.1779 27.4431C19.315 27.2268 19.5273 27.0665 19.7785 26.9916C20.0296 26.9168 20.2948 26.9308 20.536 27.0336C23.2092 28.411 24.8994 26.5969 27.7667 28.5993C30.8852 30.7893 29.1628 33.1586 32.2813 35.3535C34.4159 36.8436 35.8731 36.2235 37.5814 36.3641C37.8235 36.383 38.0548 36.4628 38.2489 36.5993C38.448 36.7359 38.6041 36.9192 38.7082 37.1306C38.8123 37.3469 38.8544 37.5821 38.8354 37.8165C38.8172 38.0516 38.7313 38.2778 38.5942 38.4752L36.4555 41.5064C36.2894 41.7465 36.0482 41.925 35.7649 42.0187C35.4856 42.1084 35.1825 42.1084 34.9032 42.0146C32.6084 41.2342 30.9752 42.5829 28.3582 40.7449C25.2348 38.5549 26.9621 36.1857 23.8436 33.9908C21.0614 32.0442 19.3902 33.6988 16.8541 32.5475Z"
                fill="#FFAD72"
            />
            <path
                d="M45.3846 68.8969C45.2475 68.9676 45.1004 69.0046 44.9493 69.0096C44.7981 69.0145 44.6461 68.9857 44.5048 68.9298C44.3628 68.8689 44.2397 68.7842 44.1397 68.6666C44.0406 68.554 43.9646 68.4224 43.9224 68.276L42.2942 64.2012C42.1852 63.966 42.1621 63.7028 42.2331 63.4586C42.3041 63.2143 42.4644 62.9981 42.6825 62.8566C45.3235 61.4134 44.675 59.0211 47.9496 57.7612C51.5175 56.3936 52.6013 59.1058 56.165 57.7382C58.5929 56.8073 58.8672 55.2423 59.913 53.9257C60.06 53.7382 60.2542 53.5918 60.4764 53.503C60.6986 53.4134 60.9398 53.3805 61.181 53.4134C61.4181 53.4463 61.6453 53.5408 61.8394 53.6864C62.0286 53.8319 62.1798 54.0244 62.2698 54.2406L63.6898 57.6584C63.803 57.9257 63.827 58.2217 63.751 58.5038C63.675 58.7859 63.5147 59.0351 63.2826 59.2135C61.3421 60.6666 61.6263 62.7629 58.64 63.9092C55.0721 65.2777 53.9883 62.5605 50.4196 63.9331C47.24 65.1551 47.7505 67.4446 45.3846 68.8969Z"
                fill="#59E8B4"
            />
            <path
                d="M22.3423 90.613L20.9413 86.1237C20.8 85.6631 21.0602 85.1746 21.5286 85.0332L30.0753 82.4107C30.5437 82.2692 31.0402 82.5234 31.1823 82.9839L32.5833 87.4732C32.7254 87.9337 32.4652 88.4222 31.9968 88.5636L23.4501 91.1862C22.9809 91.3268 22.4844 91.0735 22.3423 90.613Z"
                fill="#FFE663"
            />
            <path
                d="M42.6395 2.86481L46.7377 0.514485C47.159 0.275176 47.6943 0.42073 47.9405 0.843427L52.403 8.54738C52.6442 8.9709 52.5021 9.50627 52.0858 9.7464L47.9876 12.0967C47.5663 12.336 47.0318 12.1905 46.7856 11.7678L42.3272 4.06383C42.0769 3.64525 42.219 3.10906 42.6395 2.86481Z"
                fill="#E372FF"
            />
            <path
                d="M91.1519 14.7948L86.9777 17.0086C86.5522 17.2339 86.0169 17.0694 85.7856 16.6418L81.5784 8.79643C81.3463 8.3688 81.5073 7.83753 81.9377 7.60727L86.1119 5.39347C86.5382 5.16814 87.0727 5.3326 87.3048 5.76023L91.5112 13.6056C91.7384 14.0374 91.5823 14.5686 91.1519 14.7948Z"
                fill="#4255FF"
            />
            <path
                d="M32.1014 110.463L28.1262 107.915C27.719 107.652 27.605 107.112 27.8701 106.703L32.7308 99.2434C32.9952 98.8339 33.5445 98.7171 33.9518 98.9753L37.9269 101.523C38.3333 101.786 38.4473 102.326 38.1822 102.736L33.3223 110.195C33.0571 110.604 32.5078 110.722 32.1014 110.463Z"
                fill="#FFAD72"
            />
        </svg>
    );
}

interface ResultsProps {
    onStartOver: () => void;
    onPrevTerm: () => void;
    numCards: number;
}

export function Results({
    onStartOver,
    onPrevTerm,
    numCards = 0,
}: ResultsProps) {
    const [size, setSize] = useState<{
        width: number;
        height: number;
    }>({
        height: window.innerHeight,
        width: window.innerWidth,
    });

    useEventListener("resize", () => {
        setSize({
            height: window.innerHeight,
            width: window.innerWidth,
        });
    });

    return (
        <div className="flex min-h-[464px] flex-1 flex-col gap-8 sm:min-h-[492px]">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl sm:text-3xl">
                    Great job! You&apos;ve studied all the cards in this set.
                </h1>
                <ConfettiIcon className="shrink-0 max-sm:h-auto max-sm:w-20" />
                <ReactConfetti
                    className="!fixed"
                    confettiSource={{
                        x: size.width / 2,
                        y: size.height,
                        w: 1,
                        h: 1,
                    }}
                    height={size.height}
                    initialVelocityX={5}
                    initialVelocityY={25}
                    numberOfPieces={500}
                    recycle={false}
                    width={size.width}
                />
            </div>
            <div className="flex flex-1 gap-8 max-md:flex-col">
                <div className="flex flex-1 flex-col items-start gap-8 sm:gap-4">
                    <h2 className="text-xl text-muted-foreground">
                        Your progress
                    </h2>
                    <div className="flex w-full items-center gap-4">
                        <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-8 border-green-500">
                            <CheckIcon
                                className="stroke-[3px] text-green-500"
                                size={64}
                            />
                        </div>
                        <div className="flex w-full flex-col gap-4">
                            <Badge className="pointer-events-none justify-between bg-green-100 text-lg text-green-500">
                                <span>Completed</span>
                                <span>{numCards}</span>
                            </Badge>
                            <Badge className="pointer-events-none justify-between bg-muted-foreground/10 text-lg text-muted-foreground">
                                <span>Terms left</span>
                                <span>0</span>
                            </Badge>
                        </div>
                    </div>
                    <Button
                        className="mt-auto w-full"
                        onClick={onPrevTerm}
                        type="button"
                        variant="outline"
                    >
                        <ArrowLeft size={16} />
                        <span>Back to the previous term</span>
                    </Button>
                </div>
                <div className="flex flex-1 flex-col gap-8 sm:gap-4">
                    <h2 className="text-xl text-muted-foreground">
                        Next steps
                    </h2>
                    <div className="flex flex-1 flex-col gap-4">
                        <Button
                            className="hover:border-primary/50 hover:bg-primary/10 hover:text-primary max-sm:px-3 sm:h-full sm:justify-start sm:gap-8"
                            onClick={() => {
                                window.dispatchEvent(
                                    new CustomEvent("open-rating"),
                                );
                            }}
                            size="lg"
                            variant="outline"
                        >
                            <StarIcon className="h-6 w-6 text-primary sm:h-8 sm:w-8" />
                            <span className="sm:text-xl">
                                Rate this study set
                            </span>
                            <ChevronRight className="ml-auto" size={24} />
                        </Button>
                        <Button
                            asChild
                            className="hover:border-primary/50 hover:bg-primary/10 hover:text-primary max-sm:px-3 sm:h-full sm:justify-start sm:gap-8"
                            size="lg"
                            variant="outline"
                        >
                            <Link href="#comments" prefetch={false}>
                                <MessageSquare className="h-6 w-6 text-primary sm:h-8 sm:w-8" />
                                <span className="sm:text-xl">
                                    Leave a comment
                                </span>
                                <ChevronRight className="ml-auto" size={24} />
                            </Link>
                        </Button>
                        <Button
                            className="hover:border-primary/50 hover:bg-primary/10 hover:text-primary max-sm:px-3 sm:h-full sm:justify-start sm:gap-8"
                            onClick={onStartOver}
                            size="lg"
                            variant="outline"
                        >
                            <RotateCcw className="h-6 w-6 text-primary sm:h-8 sm:w-8" />
                            <span className="sm:text-xl">Start over</span>
                            <ChevronRight className="ml-auto" size={24} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
