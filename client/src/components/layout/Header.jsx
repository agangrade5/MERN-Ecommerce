import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MapPin } from 'lucide-react';
import { CgClose } from 'react-icons/cg';
import { FaCaretDown } from 'react-icons/fa';

import Navbar from './Navbar';
import { useLocationContext } from '../../context/LocationContext';


const Header = () => {
    const { location, detectLocation, loading } = useLocationContext();
    const [openDropdown, setOpenDropdown] = useState(false);

    useEffect(() => {
        detectLocation()
    }, [])

    const toggleDropdown = () => {
        setOpenDropdown(!openDropdown)
    }

    return (
        <div className='bg-white py-3 shadow-2xl px-4 md:px-0'>
            <div className='max-w-6xl mx-auto flex justify-between items-center'>
                <div className='flex gap-7 items-center'>
                    
                    {/* logo section */}
                    <Link to={'/'}>
                        <h1 className='font-bold text-2xl'>
                            <span className='text-red-500 font-serif'>M</span>ERN
                            <span className='text-red-500 font-serif'> E</span>commerce
                        </h1>
                    </Link>

                    {/* location section */}
                    <div className='md:flex gap-1 cursor-pointer text-gray-700 items-center hidden'>
                        <MapPin className='text-red-500' />
                        <span className="font-semibold">
                            {location ? (
                                <div className="-space-y-2">
                                <p>{location.state_district}</p>
                                <p>
                                    {location.state} ({location.country})
                                </p>
                                </div>
                            ) : (
                                "Add Address"
                            )}
                        </span>
                        <FaCaretDown onClick={toggleDropdown} />
                    </div>
                    {openDropdown && (
                        <div className="w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-150 border-2 p-5 border-gray-100 rounded-md">
                        <h1 className="font-semibold mb-4 text-l flex justify-between">
                            Change Location{" "}
                            <span onClick={() => setOpenDropdown(false)}>
                            <CgClose />
                            </span>
                        </h1>
                        <button
                            onClick={detectLocation}
                            disabled={loading}
                            className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400 disabled:opacity-50"
                        >
                            {loading ? "Detecting..." : "Detect my location"}
                        </button>
                        </div>
                    )}
                </div>
                {/* menu section */}
                <Navbar />
            </div>
        </div>
    )
}

export default Header