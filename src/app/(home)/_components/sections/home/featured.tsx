import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function FeaturedSection() {
    return (
        <div className="bg-white py-16" id="featured">
            <div className="container">
                <div className="grid gap-8 gap-y-16 md:grid-cols-2 md:gap-y-32">
                    <div className="flex flex-col justify-center gap-4 max-md:row-start-2 max-md:text-center">
                        <h1 className="text-3xl font-extrabold sm:text-4xl">
                            Learn with FlipQuiz
                        </h1>
                        <p className="text-lg font-normal sm:text-xl">
                            FlipQuiz is a free, open-source platform for
                            creating and sharing study sets. It is designed to
                            help students learn and review information in a fun
                            and engaging way.
                        </p>
                        <Button
                            asChild
                            className="mt-4 max-md:mx-auto md:mr-auto"
                            size="lg"
                        >
                            <Link href="/auth/sign-up">Get started</Link>
                        </Button>
                    </div>
                    <Image
                        alt="Featured"
                        className="h-full w-full rounded-lg bg-primary/5 object-contain shadow-xl  max-md:row-start-1"
                        height={0}
                        src="/images/featured-1.gif"
                        unoptimized
                        width={0}
                    />
                    <Image
                        alt="Featured"
                        className="h-full w-full rounded-lg bg-primary/5 object-contain shadow-xl  max-md:row-start-3"
                        height={0}
                        src="/images/featured-2.gif"
                        unoptimized
                        width={0}
                    />
                    <div className="flex flex-col justify-center gap-4 max-md:row-start-4 max-md:text-center">
                        <h1 className="text-3xl font-extrabold sm:text-4xl">
                            Study with FlipQuiz
                        </h1>
                        <p className="text-lg font-normal sm:text-xl">
                            FlipQuiz&apos;s study mode allows you to study your
                            sets in a flashcard-like format. FlipQuiz tracks
                            your progress and helps you study more effectively.
                        </p>
                        <Button
                            asChild
                            className="mt-4 max-md:mx-auto md:mr-auto"
                            size="lg"
                        >
                            <Link href="/auth/sign-up">Try it now</Link>
                        </Button>
                    </div>
                    <div className="flex flex-col justify-center gap-4 max-md:row-start-6 max-md:text-center">
                        <h1 className="text-3xl font-extrabold sm:text-4xl">
                            Share study sets
                        </h1>
                        <p className="text-lg font-normal sm:text-xl">
                            Share your study sets with your friends and
                            classmates. You can also browse through study sets
                            created by other users. Leave a comment or a review
                            to help others find the best study sets.
                        </p>
                        <Button
                            asChild
                            className="mt-4 max-md:mx-auto md:mr-auto"
                            size="lg"
                        >
                            <Link href="/explore">Explore study sets</Link>
                        </Button>
                    </div>
                    <Image
                        alt="Featured"
                        className="h-full w-full rounded-lg bg-primary/5 object-contain shadow-xl max-md:row-start-5"
                        height={0}
                        src="/images/featured-3.gif"
                        unoptimized
                        width={0}
                    />
                </div>
            </div>
        </div>
    );
}
