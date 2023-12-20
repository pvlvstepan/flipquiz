import {
    BookOpenCheckIcon,
    BrainCircuitIcon,
    CopyIcon,
    LayoutGridIcon,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface StudySetModesProps {
    studySetId: string;
}

export function StudySetModes({ studySetId }: StudySetModesProps) {
    return (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Button
                asChild
                className="justify-start px-3 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                size="lg"
                variant="outline"
            >
                <Link href={`/study-sets/${studySetId}/flashcards`}>
                    <CopyIcon size={24} />
                    <span>Flashcards</span>
                </Link>
            </Button>
            <Button
                asChild
                className="justify-start px-3 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                size="lg"
                variant="outline"
            >
                <Link href={`/study-sets/${studySetId}/learn`}>
                    <BrainCircuitIcon size={24} />
                    <span>Learn</span>
                </Link>
            </Button>
            <Button
                asChild
                className="justify-start px-3 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                size="lg"
                variant="outline"
            >
                <Link href={`/study-sets/${studySetId}/test`}>
                    <BookOpenCheckIcon size={24} />
                    <span>Test</span>
                </Link>
            </Button>
            <Button
                asChild
                className="justify-start px-3 hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                size="lg"
                variant="outline"
            >
                <Link href={`/study-sets/${studySetId}/match`}>
                    <LayoutGridIcon size={24} />
                    <span>Match</span>
                </Link>
            </Button>
        </div>
    );
}
