"use server";

import type { signUpInput } from "@/server/schemas/auth";
import type { z } from "zod";

import { api } from "@/trpc/server";

export const singUp = (data: z.infer<typeof signUpInput>) =>
    api.auth.signUp.mutate(data);
