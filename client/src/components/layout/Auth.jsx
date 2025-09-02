import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Auth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // change after login
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef();

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsOpen(false);
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
        <div className="ml-5">
            {!isLoggedIn ? (
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
                        src="https://i.pravatar.cc/40"
                        alt="profile"
                        className="w-10 h-10 rounded-full cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    />
                    {/* Dropdown */}
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
                            <Link
                                to="/profile"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => setIsOpen(false)}
                            >
                                Profile
                            </Link>
                            {/* <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </button> */}
                            <Link
                                to="/logout"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={handleLogout}
                            >
                                Logout
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Auth