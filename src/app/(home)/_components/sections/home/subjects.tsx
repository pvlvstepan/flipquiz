import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/trpc/server";

export async function SubjectsSection() {
    const areas = await api.meta.getAreas.query(undefined);

    return (
        <div className="container py-16">
            <div className="flex flex-col gap-8 text-center">
                <h1 className="text-3xl font-extrabold sm:text-4xl">
                    Explore subjects
                </h1>
                <p className="text-lg font-normal sm:text-xl">
                    Find study sets for any subject. Check out the most popular
                    topics
                </p>
                <div className="flex flex-wrap justify-center">
                    {areas.map((area) => (
                        <Link
                            className="group/card w-full py-4 sm:w-1/2 sm:p-4 md:w-1/3 lg:w-1/4"
                            href={`/explore?area=${area.id}`}
                            key={area.id}
                        >
                            <Card className="relative flex h-32 flex-col items-center justify-center overflow-hidden border-2 shadow-none">
                                <Card.Header className="p-4">
                                    <Card.Title className="line-clamp-3 text-lg font-medium leading-tight">
                                        {area.name}
                                    </Card.Title>
                                </Card.Header>

                                <div className="absolute inset-x-0 bottom-0 h-1 bg-primary opacity-0 transition-opacity group-hover/card:opacity-70" />
                            </Card>
                        </Link>
                    ))}
                </div>
                <Button asChild className="mx-auto mt-4" size="lg">
                    <Link href="/explore">Explore all subjects</Link>
                </Button>
            </div>
        </div>
    );
}
