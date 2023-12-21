import { createTRPCRouter } from "@/server/api/trpc";

import { authRouter } from "./routers/auth";
import { metaRouter } from "./routers/meta";
import { studySetRouter } from "./routers/study-set";

export const appRouter = createTRPCRouter({
    studySet: studySetRouter,
    meta: metaRouter,
    auth: authRouter,
});

export type AppRouter = typeof appRouter;
