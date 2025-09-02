import React from "react";

const Profile = () => {
    // Later: fetch user data from API / context
    const user = {
        name: "Amit Gangrade",
        email: "amit@example.com",
        avatar: "https://i.pravatar.cc/100",
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
                {/* Avatar */}
                <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                />

                {/* User Info */}
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>

                {/* Actions */}
                <div className="mt-6 flex flex-col gap-3">
                    <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                        Edit Profile
                    </button>
                    <button className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
                        Change Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
