import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_ACCESS_TOKEN_EXPIRE = process.env.JWT_ACCESS_TOKEN_EXPIRE || "15m"; // Use env variable or default
const JWT_REFRESH_TOKEN_EXPIRE = process.env.JWT_REFRESH_TOKEN_EXPIRE || "7d"; // Use env variable or default

// Create Access Token (short-lived)
export const generateAccessToken = (user) => {
    return jwt.sign({
            id: user._id,
            full_name: user.full_name
        },
        JWT_SECRET, {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRE
        }
    );
};

// Create Refresh Token (long-lived)
export const generateRefreshToken = (user) => {
    return jwt.sign({
            id: user._id
        },
        JWT_REFRESH_SECRET, {
            expiresIn: JWT_REFRESH_TOKEN_EXPIRE
        }
    );
};

// Verify Access Token
export const verifyAccessToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

// Verify Refresh Token
export const verifyRefreshToken = (token) => {
    return jwt.verify(token, JWT_REFRESH_SECRET);
};

// Helper function to convert timespan to milliseconds for cookies
export const getMilliseconds = (timespan) => {
    const timespanMap = {
        '1m': 1 * 60 * 1000,           // 1 minutes
        '5m': 5 * 60 * 1000,           // 5 minutes
        '10m': 10 * 60 * 1000,         // 10 minutes
        '15m': 15 * 60 * 1000,         // 15 minutes
        '30m': 30 * 60 * 1000,         // 30 minutes
        '1h': 60 * 60 * 1000,          // 1 hour
        '2h': 2 * 60 * 60 * 1000,      // 2 hours
        '1d': 24 * 60 * 60 * 1000,     // 1 day
        '7d': 7 * 24 * 60 * 60 * 1000, // 7 days
    };
    
    return timespanMap[timespan] || 15 * 60 * 1000; // default 15 minutes
};