import { createTRPCRouter } from "@/server/api/trpc";

import { studySetRouter } from "./routers/study-set";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    studySet: studySetRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
