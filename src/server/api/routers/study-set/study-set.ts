import { createTRPCRouter } from "@/server/api/trpc";

import { studySetCommentRouter } from "./comment";
import { getStudySetRouter } from "./get";
import { studySetManageRouter } from "./manage";
import { studySetRatingRouter } from "./rating";
import { studySetStatsRouter } from "./stats";
import { studySetViewsRouter } from "./views";

export const studySetRouter = createTRPCRouter({
    comment: studySetCommentRouter,
    rating: studySetRatingRouter,
    manage: studySetManageRouter,
    get: getStudySetRouter,
    stats: studySetStatsRouter,
    views: studySetViewsRouter,
});
