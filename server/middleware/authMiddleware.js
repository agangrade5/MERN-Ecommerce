import jwt from "jsonwebtoken";
import HttpResponse from "../utils/HttpResponse.js";

export const authMiddleware = async (req, res, next) => {
    try {
        // Check if token is provided
        const token = req.cookies.token; // read cookie
        //console.log(token);
        if (!token) {
            return HttpResponse.unauthorized(res, "Unauthorized. No token.", 401);
        }
        // Check if token is valid
        jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
            if (err) return HttpResponse.unauthorized(res, err.message, 403);
            req.user = info;
            next();
        });
    } catch (err) {
        return next(HttpResponse.unauthorized(res, err.message, 402));
    }
};
