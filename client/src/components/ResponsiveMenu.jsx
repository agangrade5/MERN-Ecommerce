import React from "react";
import { Link } from "react-router-dom";

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
    const isLoggedIn = true; // TODO: replace with actual auth state
    const user = {
        firstName: "Amit",
        lastName: "Gangrade",
    };

    const handleLogout = () => {
        // clear token or session
        console.log("Logged out");
        setOpenNav(false);
    };

    return (
        <div
            className={`${
                openNav ? "left-0" : "-left-[100%]"
            } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all`}
        >
            <div>
                {/* User Info (only if logged in) */}
                {isLoggedIn && (
                    <div className="flex items-center justify-start gap-3">
                        <img
                            src="https://i.pravatar.cc/40"
                            alt="profile"
                            className="w-12 h-12 rounded-full cursor-pointer"
                        />
                        <div>
                            <h1>Hello, {user?.firstName}</h1>
                            <h1 className="text-sm text-slate-500">Premium User</h1>
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
                        {!isLoggedIn ? (
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
