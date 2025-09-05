import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenuAlt1, HiMenuAlt3 } from 'react-icons/hi'

import Cart from "./Cart";
import Auth from "./Auth";

const Navbar = ({ openNav, setOpenNav }) => {
    return (
        <nav className="flex gap-7 items-center">
            <ul className="md:flex gap-7 items-center text-l font-semibold hidden">
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
            {/* Cart */}
            <Cart />
            {/* Auth Section */}
            <Auth />
            {
                openNav ? <HiMenuAlt3 onClick={()=>setOpenNav(false)} className='h-7 w-7 md:hidden'/>:<HiMenuAlt1 
                onClick={()=>setOpenNav(true)}
                className='h-7 w-7 md:hidden'/>
            }
        </nav>
    );
};

export default Navbar;
