import jwt from "jsonwebtoken";
import HttpResponse from "../utils/HttpResponse.js";
import User from "../models/userModel.js";
import { generateAccessToken, getMilliseconds, verifyAccessToken, verifyRefreshToken } from "../config/jwt.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const { accessToken, refreshToken } = req.cookies;

        if (!accessToken && !refreshToken) {
            return HttpResponse.error(res, "No tokens provided.", 401);
        }

        // Try to verify access token first
        if (accessToken) {
            try {
                const decoded = verifyAccessToken(accessToken);
                const user = await User.findById(decoded.id);
                
                if (!user) {
                    return HttpResponse.error(res, "User not found.", 401);
                }

                req.user = {
                    id: user._id,
                    full_name: user.full_name,
                    email: user.email
                };
                
                return next();
            } catch (error) {
                // Access token is invalid/expired, try refresh token
                if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
                    // Continue to refresh token logic below
                } else {
                    return HttpResponse.error(res, "Authentication failed.", 401);
                }
            }
        }

        // Try refresh token if access token failed
        if (refreshToken) {
            try {
                const decoded = verifyRefreshToken(refreshToken);
                const user = await User.findById(decoded.id);

                if (!user || user.refreshToken !== refreshToken) {
                    return HttpResponse.error(res, "Invalid refresh token.", 401);
                }

                // Generate new access token
                const newAccessToken = generateAccessToken(user);

                // Set new access token cookie
                res.cookie("accessToken", newAccessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.JWT_SAME_SITE,
                    maxAge: getMilliseconds(process.env.JWT_ACCESS_TOKEN_EXPIRE) // Convert to milliseconds
                });

                req.user = {
                    id: user._id,
                    full_name: user.full_name,
                    email: user.email
                };

                return next();
            } catch (error) {
                return HttpResponse.error(res, "Invalid refresh token.", 401);
            }
        }

        return HttpResponse.error(res, "Authentication failed.", 401);
    } catch (error) {
        return HttpResponse.error(res, "Authentication failed.", 401);
    }
};