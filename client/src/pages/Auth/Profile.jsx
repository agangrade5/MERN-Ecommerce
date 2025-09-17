import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../context/UserContext";

const Profile = () => {
    const { currentUser } = useContext(UserContext);
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
                {/* Avatar */}
                <img
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                    src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/avatars/${currentUser?.avatar || "default-avatar.png"}`}
                    alt={currentUser?.full_name || "Author"}
                />

                {/* User Info */}
                <h2 className="text-2xl font-bold">{currentUser.full_name}</h2>
                <p className="text-gray-600">{currentUser.email}</p>
                <p className="text-gray-600">
                    {new Intl.DateTimeFormat("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                    }).format(new Date(currentUser.created_at))}
                </p>

                {/* Actions */}
                <div className="mt-6 flex flex-col gap-3">
                    <Link to="/edit-profile" className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                        Edit Profile
                    </Link>
                    <Link to="/change-password" className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
                        Change Password
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
