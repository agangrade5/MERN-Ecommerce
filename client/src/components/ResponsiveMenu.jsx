import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { logoutUser } from "../api/account";


const ResponsiveMenu = ({ openNav, setOpenNav }) => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        try {
            await logoutUser();
            setCurrentUser(null); // update context
            setOpenNav(false);
            toast.success("Logged out successfully");
            navigate("/login");
        } catch (error) {
            console.error("Error logging out:", error);
            toast.error("Failed to logout. Try again.");
        }
    };

    return (
        <div
            className={`${
                openNav ? "left-0" : "-left-[100%]"
            } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all`}
        >
            <div>
                {/* User Info (only if logged in) */}
                {currentUser && (
                    <div className="flex items-center justify-start gap-3">
                        <img
                            className="w-12 h-12 rounded-full cursor-pointer"
                            src={`${import.meta.env.VITE_REACT_APP_ASSETS_URL}/uploads/avatars/${currentUser?.avatar || "default-avatar.png"}`}
                            alt={currentUser?.full_name || "Author"}
                        />
                        <div>
                            <h1>Hello, {currentUser?.full_name}</h1>
                            {/* <h1 className="text-sm text-slate-500">Premium User</h1> */}
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <nav className="mt-12">
                    <ul className="flex flex-col gap-7 text-xl font-semibold">
                        <Link to="/" onClick={() => setOpenNav(false)}>
                            <li>Home</li>
                        </Link>
                        <Link to="/products" onClick={() => setOpenNav(false)}>
                            <li>Products</li>
                        </Link>
                        <Link to="/about-us" onClick={() => setOpenNav(false)}>
                            <li>About</li>
                        </Link>
                        <Link to="/contact-us" onClick={() => setOpenNav(false)}>
                            <li>Contact</li>
                        </Link>

                        {/* Auth Links */}
                        {!currentUser ? (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setOpenNav(false)}
                                    className="text-red-500"
                                >
                                    <li>Sign In</li>
                                </Link>
                                <Link
                                    to="/register"
                                    onClick={() => setOpenNav(false)}
                                    className="text-red-500"
                                >
                                    <li>Sign Up</li>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/profile"
                                    onClick={() => setOpenNav(false)}
                                    className="text-gray-700"
                                >
                                    <li>Profile</li>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-left text-gray-700"
                                >
                                    <li>Logout</li>
                                </button>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default ResponsiveMenu;
