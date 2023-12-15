import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/trpc/server";

export default async function Home() {
    const studySets = await api.studySet.getOwnList.query();

    console.log(studySets);

    return (
        <div className="flex flex-col gap-y-8">
            <h1>Home Page</h1>
            <div className="grid grid-cols-3 gap-6">
                {studySets.map((studySet) => (
                    <Card key={studySet.id}>
                        <Card.Header>
                            <Card.Title>{studySet.name}</Card.Title>
                            <Card.Description>
                                {studySet.description}
                            </Card.Description>
                        </Card.Header>
                        <Card.Content>
                            <Button asChild>
                                <Link href={`/study-set/update/${studySet.id}`}>
                                    Update
                                </Link>
                            </Button>
                        </Card.Content>
                    </Card>
                ))}
            </div>
        </div>
    );
}
