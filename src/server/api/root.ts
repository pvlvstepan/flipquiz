import { createTRPCRouter } from "@/server/api/trpc";

import { achievementsRouter, studyStreakRouter } from "./routers/achievements";
import { authRouter } from "./routers/auth";
import { metaRouter } from "./routers/meta";
import { studySetRouter } from "./routers/study-set";

export const appRouter = createTRPCRouter({
    studySet: studySetRouter,
    studyStreak: studyStreakRouter,
    achievements: achievementsRouter,
    meta: metaRouter,
    auth: authRouter,
});

export type AppRouter = typeof appRouter;
