import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function Home() {
    const session = await getServerAuthSession();

    if (!session) {
        return redirect("/auth/sign-in");
    }

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
                            <Button asChild>
                                <Link href={`/study-set/${studySet.id}`}>
                                    View
                                </Link>
                            </Button>
                        </Card.Content>
                    </Card>
                ))}
            </div>
        </div>
    );
}
