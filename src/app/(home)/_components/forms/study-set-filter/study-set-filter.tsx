"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Select, SelectItem } from "@/components/ui/select";
import { api } from "@/trpc/react";

interface StudySetFiltersProps {
    selectedArea?: string;
    selectedSubject?: string;
}

export function StudySetFilters({
    selectedArea,
    selectedSubject,
}: StudySetFiltersProps) {
    const areasMeta = api.meta.getAreas.useQuery(undefined, {
        staleTime: Infinity,
    });
    const subjectsMeta = api.meta.getSubjects.useQuery(undefined, {
        staleTime: Infinity,
    });

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const filteredSubjects = selectedArea
        ? subjectsMeta.data?.filter(
              (subject) => subject.areaId === selectedArea,
          )
        : subjectsMeta.data;

    return (
        <div className="flex gap-4 max-sm:flex-col">
            <Select
                classNames={{
                    content: "max-h-[300px]",
                    trigger: "sm:max-w-[300px]",
                }}
                disabled={areasMeta.isLoading}
                onValueChange={(v) => {
                    const current = new URLSearchParams(
                        Array.from(searchParams.entries()),
                    );

                    if (!v) {
                        current.delete("area");
                    } else {
                        current.delete("subject");
                        current.set("area", v);
                    }

                    // cast to string
                    const search = current.toString();
                    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
                    const query = search ? `?${search}` : "";

                    router.push(`${pathname}${query}`);
                }}
                placeholder="Filter by area"
                value={selectedArea || ""}
            >
                {areasMeta.data?.length ? (
                    areasMeta.data.map((area) => (
                        <SelectItem key={area.id} value={area.id}>
                            {area.name}
                        </SelectItem>
                    ))
                ) : (
                    <SelectItem disabled value="not-found">
                        No areas found
                    </SelectItem>
                )}
            </Select>
            <Select
                classNames={{
                    content: "max-h-[300px]",
                    trigger: "sm:max-w-[300px]",
                }}
                disabled={subjectsMeta.isLoading}
                onValueChange={(v) => {
                    const current = new URLSearchParams(
                        Array.from(searchParams.entries()),
                    );

                    if (!v) {
                        current.delete("subject");
                    } else {
                        current.set("subject", v);
                    }

                    const search = current.toString();
                    const query = search ? `?${search}` : "";

                    router.push(`${pathname}${query}`);
                }}
                placeholder="Filter by subject"
                value={selectedSubject || ""}
            >
                {filteredSubjects?.length ? (
                    filteredSubjects.map((subject) => (
                        <SelectItem key={subject.id} value={subject.id}>
                            {subject.name}
                        </SelectItem>
                    ))
                ) : (
                    <SelectItem disabled value="not-found">
                        No subjects found
                    </SelectItem>
                )}
            </Select>
            {selectedArea || selectedSubject ? (
                <Button
                    className="h-12"
                    disabled={areasMeta.isLoading || subjectsMeta.isLoading}
                    onClick={() => {
                        router.push(pathname);
                    }}
                    variant="outline"
                >
                    Reset
                </Button>
            ) : null}
        </div>
    );
}
