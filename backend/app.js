import { Router } from "express";

import { userRoute } from "./api/routes/user.js";

const router = Router();

router.use("/user", userRoute);

router.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;

    next(error);
});

router.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: error.message,
    });
});

export const app = router;
