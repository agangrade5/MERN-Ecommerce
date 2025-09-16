import mongoose from "mongoose";
import { regex_validation } from "../utils/constants.js";

const userSchema = mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        match: [
            regex_validation.full_name,
            "Full name must contain only letters and spaces",
        ],
        minLength: [
            3,
            "Full name must be at least 3 characters long",
        ],
        maxLength: [
            50,
            "Full name must be at most 50 characters long",
        ]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            regex_validation.email,
            "Please provide a valid email.",
        ],
    },
    password: {
        type: String,
        required: true,
        match: [
            regex_validation.password,
            "The password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 6 characters long.",
        ],
    },
    avatar: {
        type: String
    },
    timezone: { 
        type: String, 
        default: "UTC" 
    },
    resetOtp: { 
        type: String 
    },
    resetOtpExpiry: { 
        type: Date 
    },
}, { timestamps: true });

export default mongoose.model("User", userSchema);