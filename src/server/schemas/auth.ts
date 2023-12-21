import { z } from "zod";

export const signInInput = z.object({
    emailOrUsername: z.string(),
    password: z.string().min(8),
});

export const signUpInput = z.object({
    username: z.string().min(2, "Username must be at least 2 characters long"),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
});
