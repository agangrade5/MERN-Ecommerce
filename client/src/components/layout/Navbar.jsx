import { SignalMediumIcon } from "lucide-react";
import React, { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {

    return (
        <nav className="flex gap-7 items-center">
            <ul className="md:flex gap-7 items-center text-xl font-semibold hidden">
                <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                        `${isActive
                            ? "border-b-3 transition-all border-red-500"
                            : "text-black"
                        } cursor-pointer`
                    }
                >
                    <li>Home</li>
                </NavLink>
                <NavLink
                    to={"/products"}
                    className={({ isActive }) =>
                        `${isActive
                            ? "border-b-3 transition-all border-red-500"
                            : "text-black"
                        } cursor-pointer`
                    }
                >
                    <li>Products</li>
                </NavLink>
                <NavLink
                    to={"/about-us"}
                    className={({ isActive }) =>
                        `${isActive
                            ? "border-b-3 transition-all border-red-500"
                            : "text-black"
                        } cursor-pointer`
                    }
                >
                    <li>About</li>
                </NavLink>
                <NavLink
                    to={"/contact-us"}
                    className={({ isActive }) =>
                        `${isActive
                            ? "border-b-3 transition-all border-red-500"
                            : "text-black"
                        } cursor-pointer`
                    }
                >
                    <li>Contact</li>
                </NavLink>
            </ul>
            <Link to={'/cart'} className='relative'>
                <IoCartOutline className='h-7 w-7' />
                <span className='bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white'>0</span>
            </Link>
            <div className='hidden md:block'>
                {/* <SignedOut>
                    <SignalInButton></SignalInButton>
                </SignedOut> */}
            </div>
        </nav>
    );
};

export default Navbar;
