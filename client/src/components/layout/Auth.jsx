import React, { useState, useRef, useEffect, useContext, use } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { UserContext } from "../../context/UserContext";
import { logoutUser } from "../../api/account";

const Auth = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef();

    const navigate = useNavigate();

    const { currentUser, setCurrentUser } = useContext(UserContext);

    const handleLogout = async () => {
        try {
            await logoutUser();
            setCurrentUser(null); // update context
            setIsOpen(false);
            toast.success("Logged out successfully");
            navigate("/login");
        } catch (error) {
            console.error("Error logging out:", error);
            toast.error("Failed to logout. Try again.");
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="ml-5 hidden md:block">
            {!currentUser ? (
                <div className="flex gap-3">
                    <Link
                        to="/login"
                        className="px-4 py-2 border border-red-500 rounded-xl text-red-500 font-medium hover:bg-red-500 hover:text-white transition"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/register"
                        className="px-4 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition"
                    >
                        Sign Up
                    </Link>
                </div>
            ) : (
                <div className="relative" ref={menuRef}>
                    {/* Profile Image */}
                    <img
                        className="w-10 h-10 rounded-full cursor-pointer"
                        src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/avatars/${currentUser?.avatar || "default-avatar.png"}`}
                        alt={currentUser?.full_name || "Author"}
                        onClick={() => setIsOpen(!isOpen)}
                    />

                    {/* Dropdown */}
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-50">
                            <Link
                                to="/profile"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Profile
                            </Link>
                            <button
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Auth