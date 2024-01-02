import Link from "next/link";

import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <div
            className="-mt-8 bg-left-bottom sm:bg-center"
            style={{
                backgroundImage: "url(/images/blob-scene.svg)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
            <section className="container">
                <div className="flex flex-col items-center justify-center gap-8 py-16 text-center">
                    <h1 className="max-w-2xl text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl">
                        Empowering Learning Through Interactive Study Sets
                    </h1>
                    <p className="max-w-lg font-normal md:text-lg lg:text-xl">
                        Unlock the Fun of Learning with a Free, Open-Source
                        Platform for Creating and Sharing Study Sets
                    </p>
                    <div className="flex gap-4 max-sm:w-full max-sm:flex-col">
                        <Button asChild size="lg">
                            <Link href="/auth/sign-up">Get started</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="#featured" prefetch={false}>
                                Learn more
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
