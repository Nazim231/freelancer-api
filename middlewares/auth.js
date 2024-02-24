import { auth } from "../services/auth.js";

export function verifyUserToken(req, res, next) {
    const token = req.cookies?.token;
    if (!token) return res.redirect("/login");

    const user = auth.getUser(token);
    if (!user) return res.redirect("/login");
    req.user = user;

    next();
}
