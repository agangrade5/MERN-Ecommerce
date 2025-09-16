import moment from "moment-timezone";
import dotenv from "dotenv";
dotenv.config();

export const regex_validation = {
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{6,}$/,
    full_name: /^[A-Za-z\s]+$/,
};

export const formatDateByTimezone = (date, timezone = "UTC") => {
    return moment(date).tz(timezone).format("YYYY-MM-DD HH:mm:ss");
};

// OTP Config (dynamic from .env with fallbacks)
export const otpConfig = {
    max_time: parseInt(process.env.OTP_MAX_TIME, 10) || 10, // minutes
    otp_length: parseInt(process.env.OTP_LENGTH, 10) || 4,
    is_default: process.env.IS_DEFAULT_OTP === "true",
    default: parseInt(process.env.DEFAULT_OTP, 10) || 1111,
    type: process.env.OTP_TYPE || "numeric", // "numeric" | "alphanumeric"
};

// Generate OTP
export const generateOtp = () => {
    if (otpConfig.is_default) {
        return otpConfig.default.toString().padStart(otpConfig.otp_length, "0");
    }

    let chars =
        otpConfig.type === "alphanumeric"
            ? "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
            : "0123456789";

    let otp = "";
    for (let i = 0; i < otpConfig.otp_length; i++) {
        otp += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return otp;
};

// Get Expiry time (per request)
export const getOtpExpiry = () => {
    return Date.now() + otpConfig.max_time * 60 * 1000;
};