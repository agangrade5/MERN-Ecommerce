import bcrypt from "bcryptjs";
import HttpResponse from "../utils/HttpResponse.js";
import User from "../models/userModel.js";
import { regex_validation, formatDateByTimezone } from "../utils/constants.js";
import { saveFile, deleteFile } from "../helper/fileHelper.js";

// User Logout
export const logout = async (req, res, next) => {
    try {
        // Delete token
        res.clearCookie("token");

        return HttpResponse.success(res, "User logged out successfully.", null, 200);
    } catch (error) {
        return HttpResponse.error(res, error.message, 422);
    }
}

// User Change Password
export const changePassword = async (req, res, next) => {
    try {
        const { current_password, new_password, confirm_password } = req.body;

        if (!current_password || !new_password || !confirm_password) {
            return HttpResponse.validation(res, "All fields are required.");
        }

        if (new_password !== confirm_password) {
            return HttpResponse.validation(res, "Passwords do not match.");
        }

        if (!regex_validation.password.test(new_password)) {
            return HttpResponse.validation(
                res,
                "Password must be at least 6 characters with uppercase, lowercase, number & special character."
            );
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return HttpResponse.error(res, "User not found.", 422);
        }

        const isPasswordCorrect = await bcrypt.compare(current_password, user.password);
        if (!isPasswordCorrect) {
            return HttpResponse.error(res, "Current password is incorrect.", 422);
        }

        if (current_password === new_password) {
            return HttpResponse.error(res, "New password cannot be the same as the current password.", 422);
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        if (!salt) {
            return HttpResponse.error(res, "Something went wrong.", 422);
        }

        const hashedPassword = await bcrypt.hash(new_password, salt);
        if (!hashedPassword) {
            return HttpResponse.error(res, "Something went wrong.", 422);
        }

        user.password = hashedPassword;
        await user.save();

        return HttpResponse.success(res, "Password changed successfully.", null, 200);
    } catch (error) {
        return HttpResponse.error(res, error.message, 422);
    }
}

// get user profile
export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return HttpResponse.error(res, "User not found.", 422);
        }
        return HttpResponse.success(res, "User profile.", user, 200);
    } catch (error) {
        return HttpResponse.error(res, error.message, 422);
    }
}

//update user profile
export const updateProfile = async (req, res, next) => {
    try {
        const { full_name, email } = req.body;

        if (!full_name || !email) {
            return HttpResponse.validation(res, "All fields are required.");
        }

        if (!regex_validation.full_name.test(full_name)) {
            return HttpResponse.validation(res, "Full name must contain only letters and spaces.");
        }

        if (!regex_validation.email.test(email)) {
            return HttpResponse.validation(res, "Please provide a valid email.");
        }

        // find user from database
        const user = await User.findById(req.user.id);
        if (!user) {
            return HttpResponse.error(res, "User not found.", 422);
        }

        // Check if email exists
        const newEmail = email.toLowerCase();
        const existingEmail = await User.findOne({ email: newEmail });
        if (existingEmail && existingEmail._id.toString() !== req.user.id) {
            return HttpResponse.error(res, "Email already exists.", 422);
        }

        user.full_name = full_name;
        user.email = newEmail;
        await user.save();

        return HttpResponse.success(res, "Profile updated successfully.", null, 200);
    } catch (error) {
        return HttpResponse.error(res, error.message, 422);
    }
}

// change avatar
export const changeAvatar = async (req, res, next) => {
    try {
        // Check if avatar is uploaded
        if (!req.files?.avatar) {
            return HttpResponse.validation(res, "Please upload an avatar.", 422);

        }
        // find user from database
        const user = await User.findById(req.user.id);
        if (!user) {
            return HttpResponse.error(res, "User not found.", 422);
        }

        // Check if user is updating their own account
        if (user._id.toString() !== req.user.id) {
            return HttpResponse.error(res, "You can only update your own account.", 422);
        }

        // save avatar
        const newFileName = await saveFile(req.files.avatar, "avatars", 500000, user.avatar); // 500000 = 500kb

        // update avatar
        const updatedAvatar = await User.findByIdAndUpdate(
            req.user.id,
            { avatar: newFileName },
            { new: true }
        ).select("-password");

        if (!updatedAvatar) {
            return HttpResponse.error(res, "Avatar couldn't be changed.", 422);
        }
        // Response
        return HttpResponse.success(res, "Avatar changed successfully.", updatedAvatar, 200);
    } catch (err) {
        return HttpResponse.error(res, err.message, 422);
    }
};

// user account delete
export const deleteAccount = async (req, res, next) => {
    try {
        // find user from database
        const user = await User.findById(req.user.id);
        if (!user) {
            return HttpResponse.error(res, "User not found.", 422);
        }

        // Check if user is deleting their own account
        if (user._id.toString() !== req.user.id) {
            return HttpResponse.error(res, "You can only delete your own account.", 422);
        }

        // delete avatar
        await deleteFile(user.avatar, "avatars");

        // delete user account
        await User.findByIdAndDelete(req.user.id);
        return HttpResponse.success(res, "Account deleted successfully.", null, 200);
    } catch (error) {
        return HttpResponse.error(res, error.message, 422);
    }
}


