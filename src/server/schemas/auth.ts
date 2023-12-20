import { z } from "zod";

export const signInInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const signUpInput = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    repeatPassword: z.string(),
});
