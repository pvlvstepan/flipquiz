"use server";

import { redirect } from "next/navigation";

import type { updateStudySetInput } from "@/server/schemas/study-set";
import type { z } from "zod";

import { api } from "@/trpc/server";

export const editStudySet = async (data: z.infer<typeof updateStudySetInput>) =>
    api.studySet.manage.create
        .mutate({
            name: data.name,
            description: data.description,
            subjectId: data.subjectId,
            areaId: data.areaId,
            cards: data.cards,
        })
        .then((studySet) => {
            redirect(`/study-set/${studySet.id}`);
        });
