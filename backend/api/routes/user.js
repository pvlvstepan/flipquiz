import { Router } from "express";
import { Types } from "mongoose";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/user.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = Router();

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

router.delete("/:userID", (req, res, next) => {
    User.deleteOne({ _id: req.params.userID })
        .exec()
        .then((result) => {
            if (result.deletedCount > 0) {
                return res.status(400).json({
                    message: `User ${req.params.userID} does not exists`,
                });
            }
            res.status(200).json({
                message: `User ${req.params.userID} deleted successfully`,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err.message,
            });
        });
});

export const userRoute = router;
