import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import { api } from "@/trpc/server";

interface StudySetBreadcrumbsProps {
    subjectId: string | null;
    areaId: string | null;
}

export async function StudySetBreadcrumbs({
    areaId,
    subjectId,
}: StudySetBreadcrumbsProps) {
    const area = await api.meta.getArea.query({
        areaId: areaId || "",
    });
    const subject = await api.meta.getSubject.query({
        subjectId: subjectId || "",
    });

    return (
        <ul className="flex flex-row items-center gap-1 text-sm text-muted-foreground max-sm:hidden">
            {!area && !subject ? <ChevronLeft size={16} /> : null}
            <li>
                <Link className="hover:text-primary hover:underline" href="/">
                    Home
                </Link>
            </li>
            {area ? (
                <>
                    <ChevronRight size={16} />
                    <li>
                        <Link
                            className="hover:text-primary hover:underline"
                            href={`/explore?area=${area.id}`}
                        >
                            {area.name}
                        </Link>
                    </li>
                </>
            ) : null}
            {subject ? (
                <>
                    <ChevronRight size={16} />
                    <li>
                        <Link
                            className="hover:text-primary hover:underline"
                            href={`/explore?subject=${subject.id}`}
                        >
                            {subject.name}
                        </Link>
                    </li>
                </>
            ) : null}
        </ul>
    );
}
