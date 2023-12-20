import { createTRPCRouter } from "@/server/api/trpc";

import { metaRouter } from "./routers/meta";
import { studySetRouter } from "./routers/study-set";

export const appRouter = createTRPCRouter({
    studySet: studySetRouter,
    meta: metaRouter,
});

export type AppRouter = typeof appRouter;
