/* eslint-disable @next/next/no-img-element -- it's fine... */
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CommunitySection() {
    return (
        <section className="-mb-8 bg-white py-16">
            <div className="container">
                <div className="items-center gap-16 md:grid md:grid-cols-2">
                    <div className="flex flex-col justify-center gap-4 max-md:text-center">
                        <h1 className="text-3xl font-extrabold sm:text-4xl">
                            Get involved in the community
                        </h1>
                        <p className="text-lg font-normal sm:text-xl">
                            Whether you&apos;re a student, teacher, or lifelong
                            learner, FlipQuiz is the perfect place to create and
                            share study sets. Join our community today and start
                            creating!
                        </p>
                        <Button
                            asChild
                            className="mt-4 max-md:mx-auto md:mr-auto"
                            size="lg"
                        >
                            <Link href="/auth/sign-up">
                                Create your first study set
                            </Link>
                        </Button>
                    </div>
                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <img
                            alt=""
                            className="w-full rounded-lg"
                            src="https://images.unsplash.com/photo-1600195077077-7c815f540a3d"
                        />
                        <img
                            alt=""
                            className="h-full w-full rounded-lg object-cover"
                            src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
