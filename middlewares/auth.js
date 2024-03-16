import { auth } from "../services/auth.js";

export function verifyUserToken(req, res, next) {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({
        status: "Unauthenticated",
        message: "Please login to access"
    });

    const user = auth.getUser(token);
    if (!user) return res.status(401).json({
        status: "Unauthenticated",
        message: "Please login to access"
    });
    req.user = user;

    next();
}
