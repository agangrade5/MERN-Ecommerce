import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../context/UserContext";
import { updateProfile, changeAvatar } from "../../api/account";

const EditProfile = () => {
    const [form, setForm] = useState({
        full_name: "",
        email: "",
    });

    const [loading, setLoading] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [isAvatarTouched, setIsAvatarTouched] = useState(false);

    const { currentUser, setCurrentUser } = useContext(UserContext);
    
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            setForm({
                full_name: currentUser.full_name || "",
                email: currentUser.email || "",
            });
            // Set initial preview to current avatar
            setPreview(`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/avatars/${currentUser?.avatar || "default-avatar.png"}`);
        }
    }, [currentUser]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Handle avatar file selection
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setIsAvatarTouched(true);
            
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Update avatar separately
    const updateAvatar = async () => {
        if (!avatarFile) return;
        
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('avatar', avatarFile);
            
            const res = await changeAvatar(formData);
            toast.success(res.data.message);
            
            // Update current user with new avatar
            setCurrentUser({
                ...currentUser,
                avatar: res.data.avatar || res.data.data?.avatar,
                updated_at: res.data.data?.updatedAt
            });
            
            setIsAvatarTouched(false);
            setAvatarFile(null);
        } catch (err) {
            let errorMessage = "Failed to update avatar";
            if (Array.isArray(err.response?.data?.message)) {
                errorMessage = err.response.data.message.join(", ");
            } else if (typeof err.response?.data?.message === "string") {
                errorMessage = err.response.data.message;
            }
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await updateProfile(form);
            toast.success(res.data.message);
            setCurrentUser({
                ...currentUser,
                full_name: form.full_name,
                email: form.email,
                updated_at: res.data.data.updated_at
            });
            navigate("/profile");
        } catch (err) {
            let errorMessage = "Something went wrong";
            if (Array.isArray(err.response?.data?.message)) {
                errorMessage = err.response.data.message.join(", ");
            } else if (typeof err.response?.data?.message === "string") {
                errorMessage = err.response.data.message;
            }
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Edit Profile</h2>

                {/* Avatar Section with Real-time Preview */}
                <div className="flex justify-center mb-6 relative">
                    <div className="relative">
                        <img
                            src={preview || `${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/avatars/${currentUser?.avatar || "default-avatar.png"}`}
                            alt={currentUser?.full_name || "Profile"}
                            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                        />
                        
                        {/* Edit Icon Overlay */}
                        <label
                            htmlFor="avatar-upload"
                            className="absolute bottom-0 right-1 bg-red-500 p-2 rounded-full cursor-pointer hover:bg-red-600 transition"
                            title="Change Profile Picture"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-1.414a2 2 0 01.586-1.414z"
                                />
                            </svg>
                        </label>
                        
                        <input
                            id="avatar-upload"
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                        
                        {/* Save Avatar Button - appears when avatar is changed */}
                        {isAvatarTouched && (
                            <button
                                onClick={updateAvatar}
                                disabled={loading}
                                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg transition disabled:opacity-50"
                                title="Save Avatar"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        name="full_name"
                        value={form.full_name}
                        onChange={handleChange}
                    />
                    {/* Email */}
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;