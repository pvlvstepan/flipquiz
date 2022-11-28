import { Router } from "express";
import { Types } from "mongoose";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/user.js";
import { StudyCard } from "../models/studyCard.js";
import { StudyCardAnalytics } from "../models/studyCardAnalytics.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = Router();

// TODO: ALLOW ONLY UNAUTHORIZED USERS

router.post("/sign-up", (req, res, next) => {
    User.find({
        email: req.body.email,
    })
        .exec()
        .then((user) => {
            if (user.length > 0) {
                return res.status(409).json({
                    message: "User with this email address already exists",
                });
            } else {
                hash(req.body.password, 10, (hashError, hashedText) => {
                    if (hashError) {
                        return res.status(500).json({
                            error: hashError,
                        });
                    } else {
                        const user = new User({
                            _id: new Types.ObjectId(),
                            email: req.body.email,
                            username: req.body.username,
                            password: hashedText,
                            role: req.body.role,
                            createdAt: new Date().toISOString(),
                        });

                        user.save()
                            .then((result) => {
                                res.status(201).json({
                                    message: `User ${result.email} created successfully`,
                                });
                            })
                            .catch((err) => {
                                res.status(500).json({
                                    error: err.message,
                                });
                            });
                    }
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err.message,
            });
        });
});

router.post("/sign-in", (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    message: "Unauthorized",
                });
            }

            compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Unauthorized",
                    });
                }
                if (result) {
                    const data = {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        createdAt: user.createdAt,
                    };

                    const token = jwt.sign(data, process.env.JWT_PRIVATE_KEY, {
                        expiresIn: "1d",
                    });

                    return res
                        .cookie("user", token, {
                            maxAge: 86400000,
                        })
                        .status(200)
                        .json({
                            message: "Authorized successfully",
                            user: data,
                        });
                }
                return res.status(401).json({
                    message: "Unauthorized",
                });
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err.message,
            });
        });
});

router.get("/check-auth", checkAuth, (req, res, next) => {
    return res.status(200).json({
        user: req.user_data,
    });
});
router.get("/sign-out", checkAuth, (req, res, next) => {
    return res.status(200).clearCookie("user").json({
        message: "User unauthorized successfully",
    });
});

router.get("/:userId", checkAuth, (req, res, next) => {
    if (!req.params.userId || !Types.ObjectId.isValid(req.params.userId)) {
        return res.status(400).json({
            message: "You must provide a valid user id",
        });
    } else {
        User.findOne({
            _id: req.params.userId,
        })
            .select("_id username role")
            .exec()
            .then((user) => {
                if (user) {
                    StudyCard.find({
                        createdBy: user._id,
                    })
                        .select("_id name terms")
                        .exec()
                        .then((studyCards) => {
                            if (req.params.userId === req.user_data._id) {
                                StudyCardAnalytics.find({
                                    userId: req.user_data._id,
                                })
                                    .select("studyCardId")
                                    .populate("studyCardId", "_id name terms")
                                    .exec()
                                    .then((recent) => {
                                        res.status(200).json({
                                            ...user._doc,
                                            studyCards: studyCards.map(
                                                (el) => ({
                                                    _id: el._id,
                                                    name: el.name,
                                                    terms: el.terms.length,
                                                })
                                            ),
                                            recent: recent.map((el) => ({
                                                _id: el.studyCardId._id,
                                                name: el.studyCardId.name,
                                                terms: el.studyCardId.terms
                                                    .length,
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
                                    ...user._doc,
                                    studyCards: studyCards.map((el) => ({
                                        _id: el._id,
                                        name: el.name,
                                        terms: el.terms.length,
                                    })),
                                });
                            }
                        })
                        .catch((err) => {
                            res.status(500).json({
                                error: err.message,
                            });
                        });
                } else {
                    return res.status(400).json({
                        message: "User not found",
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

export const userRoute = router;
