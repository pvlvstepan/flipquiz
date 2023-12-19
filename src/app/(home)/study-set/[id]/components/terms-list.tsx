"use client";

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface StudySetTermsProps {
    cards: {
        id: number;
        term: string;
        definition: string;
    }[];
    belongsToCurrentUser: boolean;
    studySetId: number;
}

export function StudySetTerms({
    cards = [],
    belongsToCurrentUser,
    studySetId,
}: StudySetTermsProps) {
    return (
        <Collapsible>
            <CollapsibleTrigger className="group/terms flex w-full items-center justify-between transition-colors hover:text-primary">
                <h2 className="text-xl sm:text-2xl">
                    Terms in this set ({cards.length})
                </h2>
                <ChevronDown
                    className="group-aria-expanded/terms:rotate-180"
                    size={24}
                />
            </CollapsibleTrigger>
            <CollapsibleContent className="my-4 flex flex-col gap-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                {cards.map((card) => (
                    <Card className="border-2 shadow-none" key={card.id}>
                        <Card.Content className="p-4 font-normal sm:p-6">
                            <div className="flex flex-col gap-4 md:flex-row">
                                <span className="flex-1 text-sm">
                                    {card.term}
                                </span>
                                <span className="flex-1 text-sm">
                                    {card.definition}
                                </span>
                            </div>
                        </Card.Content>
                    </Card>
                ))}
                {belongsToCurrentUser ? (
                    <Button asChild className="m-0 sm:mx-auto" size="lg">
                        <Link href={`/study-set/update/${studySetId}`}>
                            Add more terms to this set
                        </Link>
                    </Button>
                ) : null}
            </CollapsibleContent>
        </Collapsible>
    );
}
