import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
    try {
        const decoded = jwt.verify(
            req.cookies.user,
            process.env.JWT_PRIVATE_KEY
        );
        req.user_data = {
            _id: decoded._id,
            username: decoded.username,
            email: decoded.email,
            role: decoded.role,
            createdAt: decoded.createdAt,
        };

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
};
