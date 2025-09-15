import bcrypt from "bcryptjs";
import HttpResponse from "../utils/HttpResponse.js";
import User from "../models/userModel.js";
import { regex_validation } from "../utils/constants.js";

export const register = async (req, res, next) => {
    try {
        const { full_name, email, password, confirm_password } = req.body;

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
            password: hashedPassword
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

