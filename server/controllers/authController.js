import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import HttpResponse from "../utils/HttpResponse.js";
import User from "../models/userModel.js";
import { regex_validation, formatDateByTimezone } from "../utils/constants.js";

// User Registration
export const register = async (req, res, next) => {
    try {
        const { full_name, email, password, confirm_password, timezone } = req.body;

        if (!full_name || !email || !password || !confirm_password) {
            return HttpResponse.validation(res, "All fields are required.");
        }

        if (password !== confirm_password) {
            return HttpResponse.validation(res, "Passwords do not match.");
        }

        if (!regex_validation.password.test(password)) {
            return HttpResponse.validation(
                res,
                "Password must be at least 6 characters with uppercase, lowercase, number & special character."
            );
        }

        // check if email already exists
        const newEmail = email.toLowerCase();
        const existingEmail = await User.findOne({ email: newEmail });
        if (existingEmail) {
            return HttpResponse.error(res, "Email already exists.", 422);
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        if (!salt) {
            return HttpResponse.error(res, "Failed to generate salt.", 422);
        }
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = new User({
            full_name,
            email: newEmail,
            password: hashedPassword,
            timezone
        });

        const savedUser = await newUser.save();
        if (!savedUser) {
            return HttpResponse.error(res, "User register failed.", 422);
        }
        
        return HttpResponse.success(
            res,
            "User registered successfully.",
            null,
            201
        );
    } catch (error) {
        if (error.name === "ValidationError") {
            // Collect errors into array
            const errorsArray = Object.values(error.errors).map(err => err.message);

            // OR collect into object
            // const errorsObject = Object.keys(error.errors).reduce((acc, field) => {
            //     acc[field] = error.errors[field].message;
            //     return acc;
            // }, {});

            return HttpResponse.validation(res, errorsArray);
            // or pass errorsObject if you prefer field-wise
        }
        return HttpResponse.error(res, error.message, 422);
    }
}

// User Login
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return HttpResponse.validation(res, "All fields are required.");
        }

        if (!regex_validation.email.test(email)) {
            return HttpResponse.validation(res, "Please provide a valid email.");
        }

        // Check if email exists
        const newEmail = email.toLowerCase();
        const user = await User.findOne({ email: newEmail });
        if (!user) {
            return HttpResponse.error(res, "Email does not exist.", 422);
        }

        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return HttpResponse.error(res, "Password is incorrect.", 422);
        }

        // Create and assign token
        const token = jwt.sign({ id: user._id, full_name: user.full_name }, process.env.JWT_SECRET, { expiresIn: "1d" }); // expires in 1 day
        // cookie config
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        // Response
        return HttpResponse.success(
            res, 
            "User logged in successfully.", 
            { 
                id: user._id, 
                full_name: user.full_name,
                email: user.email, 
                avatar: user.avatar, 
                created_at: formatDateByTimezone(user.createdAt, user.timezone),
                token 
            }, 
            200
        );
    } catch (error) {
        if (error.name === "ValidationError") {
            // Collect errors into array
            const errorsArray = Object.values(error.errors).map(err => err.message);

            // OR collect into object
            // const errorsObject = Object.keys(error.errors).reduce((acc, field) => {
            //     acc[field] = error.errors[field].message;
            //     return acc;
            // }, {});

            return HttpResponse.validation(res, errorsArray);
            // or pass errorsObject if you prefer field-wise
        }
        return HttpResponse.error(res, error.message, 422);
    }
}
