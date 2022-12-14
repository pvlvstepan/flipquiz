import { Router } from "express";
import { Types } from "mongoose";

import { StudyCard } from "../models/studyCard.js";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

import { checkAuth } from "../middleware/checkAuth.js";
import { StudyCardReview } from "../models/studyCardReview.js";
import { StudyCardComment } from "../models/studyCardComment.js";
import { StudyCardAnalytics } from "../models/studyCardAnalytics.js";

const router = Router();

router.post("/", checkAuth, (req, res, next) => {
    if (!Types.ObjectId.isValid(req.user_data._id)) {
        return res.status(400).json({
            message: "Invalid user id",
        });
    } else {
        User.find({
            _id: req.user_data._id,
        })
            .exec()
            .then((user) => {
                if (!user.length) {
                    return res.status(400).json({
                        message: "Could not save the study card",
                    });
                } else {
                    if (!req.body.terms?.length) {
                        return res.status(400).json({
                            message: "List of terms was not provided",
                        });
                    } else {
                        if (req.body.terms.length < 2) {
                            return res.status(400).json({
                                message:
                                    "There should be at least 2 terms in the study card",
                            });
                        } else {
                            const studyCard = new StudyCard({
                                name: req.body.name
                                    ?.trim()
                                    .replaceAll("\\s{2}", " "),
                                description: req.body.description
                                    ?.trim()
                                    .replaceAll("\\s{2}", " "),
                                createdBy: req.user_data._id,
                                createdAt: new Date().toISOString(),
                                commentsEnabled: req.body.commentsEnabled,
                                terms: req.body.terms.map((el) => ({
                                    term: el.term
                                        ?.trim()
                                        .replaceAll("\\s{2}", " "),
                                    definition: el.definition
                                        ?.trim()
                                        .replaceAll("\\s{2}", " "),
                                })),
                            });

                            studyCard
                                .save()
                                .then((result) => {
                                    res.status(201).json({
                                        ...result._doc,
                                    });
                                })
                                .catch((err) => {
                                    res.status(500).json({
                                        error: err.message,
                                    });
                                });
                        }
                    }
                }
            })
            .catch((err) => {
                res.status(500).json({
                    error: err.message,
                });
            });
    }
});

router.post("/rate/:studyCardId", checkAuth, (req, res, next) => {
    if (
        !req.params.studyCardId ||
        !Types.ObjectId.isValid(req.params.studyCardId)
    ) {
        return res.status(400).json({
            message: "You must provide a valid study card id",
        });
    } else {
        StudyCardReview.findOneAndUpdate(
            {
                studyCardId: req.params.studyCardId,
                ratedBy: req.user_data._id,
            },
            {
                rating: req.body.rating,
                ratedBy: req.user_data._id,
                studyCardId: req.params.studyCardId,
                ratedAt: new Date().toISOString(),
            },
            {
                upsert: true,
                runValidators: true,
                new: true,
            }
        )
            .exec()
            .then((result) =>
                res.status(200).json({
                    ...result._doc,
                })
            )
            .catch((err) => {
                res.status(500).json({
                    error: err.message,
                });
            });
    }
});

router.post("/comment/:studyCardId", checkAuth, (req, res, next) => {
    if (
        !req.params.studyCardId ||
        !Types.ObjectId.isValid(req.params.studyCardId)
    ) {
        return res.status(400).json({
            message: "You must provide a valid study card id",
        });
    } else {
        StudyCard.findOne({ _id: req.params.studyCardId })
            .exec()
            .then((studyCard) => {
                if (studyCard && studyCard.commentsEnabled) {
                    const comment = new StudyCardComment({
                        content: req.body.content,
                        postedBy: req.user_data._id,
                        studyCardId: req.params.studyCardId,
                        postedAt: new Date().toISOString(),
                    });

                    comment
                        .save()
                        .then((result) =>
                            res.status(200).json({
                                ...result._doc,
                            })
                        )
                        .catch((err) => {
                            res.status(500).json({
                                error: err.message,
                            });
                        });
                } else {
                    return res.status(400).json({
                        message: "Comments are disabled",
                    });
                }
            })
            .catch((err) => {
                res.status(500).json({
                    error: err.message,
                });
            });
    }
});

router.post("/analytics/:studyCardId", checkAuth, (req, res, next) => {
    if (
        !req.params.studyCardId ||
        !Types.ObjectId.isValid(req.params.studyCardId)
    ) {
        return res.status(400).json({
            message: "You must provide a valid study card id",
        });
    } else {
        StudyCard.findOne({ _id: req.params.studyCardId })
            .exec()
            .then((studyCard) => {
                if (studyCard) {
                    StudyCardAnalytics.findOneAndUpdate(
                        {
                            studyCardId: req.params.studyCardId,
                            userId: req.user_data._id,
                        },
                        {
                            userId: req.user_data._id,
                            studyCardId: req.params.studyCardId,
                            createdAt: new Date().toISOString(),
                        },
                        {
                            upsert: true,
                            runValidators: true,
                            new: true,
                        }
                    )
                        .exec()
                        .then((result) =>
                            res.status(200).json({
                                ...result._doc,
                            })
                        )
                        .catch((err) => {
                            res.status(500).json({
                                error: err.message,
                            });
                        });
                } else {
                    return res.status(400).json({
                        message: "You must provide a valid study card id",
                    });
                }
            })
            .catch((err) => {
                res.status(500).json({
                    error: err.message,
                });
            });
    }
});

router.get("/comment/:studyCardId", checkAuth, (req, res, next) => {
    if (
        !req.params.studyCardId ||
        !Types.ObjectId.isValid(req.params.studyCardId)
    ) {
        return res.status(400).json({
            message: "You must provide a valid study card id",
        });
    } else {
        StudyCardComment.find({ studyCardId: req.params.studyCardId })
            .populate("postedBy", "_id username")
            .exec()
            .then((result) => res.status(200).json(result))
            .catch((err) => {
                res.status(500).json({
                    error: err.message,
                });
            });
    }
});

router.get("/:studyCardId", checkAuth, (req, res, next) => {
    if (
        !req.params.studyCardId ||
        !Types.ObjectId.isValid(req.params.studyCardId)
    ) {
        return res.status(400).json({
            message: "You must provide a valid study card id",
        });
    } else {
        StudyCard.findOne({
            _id: req.params.studyCardId,
        })
            .populate("createdBy", "_id username")
            .exec()
            .then((result) => {
                if (!result) {
                    return res.status(404).json({
                        message: "Study card not found",
                    });
                } else {
                    StudyCardAnalytics.count({
                        studyCardId: req.params.studyCardId,
                    })
                        .exec()
                        .then((totalUsers) => {
                            StudyCardReview.find({
                                studyCardId: req.params.studyCardId,
                            })
                                .exec()
                                .then((ratings) => {
                                    const rating =
                                        ratings
                                            .map((el) => el.rating)
                                            .reduce((sum, value) => {
                                                return sum + value;
                                            }, 0) / ratings.length;

                                    res.status(200).json({
                                        ...result._doc,
                                        rating: rating,
                                        totalRatings: ratings.length,
                                        totalUsers: totalUsers,
                                    });
                                })
                                .catch((err) => {
                                    res.status(500).json({
                                        error: err.message,
                                    });
                                });
                        })
                        .catch((err) => {
                            res.status(500).json({
                                error: err.message,
                            });
                        });
                }
            })
            .catch((err) => {
                res.status(500).json({
                    error: err.message,
                });
            });
    }
});

router.get("/", (req, res, next) => {
    const decoded = req.cookies.user
        ? jwt.verify(req.cookies.user, process.env.JWT_PRIVATE_KEY)
        : undefined;

    StudyCard.find()
        .select("_id name terms createdBy")
        .populate("createdBy", "_id username")
        .exec()
        .then((studyCards) => {
            if (decoded?._id) {
                StudyCardAnalytics.find({
                    userId: decoded?._id,
                })
                    .select("studyCardId")
                    .populate({
                        path: "studyCardId",
                        populate: {
                            path: "createdBy",
                            select: "_id username",
                        },
                    })
                    .exec()
                    .then((recent) => {
                        res.status(200).json({
                            studyCards: studyCards.map((el) => ({
                                _id: el._id,
                                name: el.name,
                                terms: el.terms.length,
                                createdBy: el.createdBy,
                            })),
                            recent: recent.map((el) => ({
                                _id: el.studyCardId._id,
                                name: el.studyCardId.name,
                                terms: el.studyCardId.terms.length,
                                createdBy: el.studyCardId.createdBy,
                            })),
                        });
                    })
                    .catch((err) => {
                        res.status(500).json({
                            error: err.message,
                        });
                    });
            } else {
                res.status(200).json({
                    studyCards: studyCards.map((el) => ({
                        _id: el._id,
                        name: el.name,
                        terms: el.terms.length,
                        createdBy: el.createdBy,
                    })),
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err.message,
            });
        });
});

export const studyCardRoute = router;
