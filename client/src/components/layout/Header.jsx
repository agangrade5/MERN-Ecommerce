import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'

import Navbar from './Navbar'
import { FaCaretDown } from 'react-icons/fa'

const Header = () => {
    const location = false;
    return (
        <div className='bg-white py-3 shadow-2xl px-4 md:px-0'>
            <div className='max-w-6xl mx-auto flex justify-between items-center'>
                {/* logo section */}
                 <div className='flex gap-7 items-center'>
                    <Link to={'/'}>
                        <h1 className='font-bold text-3xl'>
                            <span className='text-red-500 font-serif'>R</span>eact
                            <span className='text-red-500 font-serif'> E</span>commerce
                        </h1>
                    </Link>
                    <div className='md:flex gap-1 cursor-pointer text-gray-700 items-center hidden'>
                        <MapPin className='text-red-500' />
                        <span className='font-semibold '>{location ? <div className='-space-y-2'>
                            <p>{location.county}</p>
                            <p>{location.state}</p>
                        </div> : "Add Address"}</span>
                        <FaCaretDown />
                    </div>
                </div>
                {/* menu section */}
                <Navbar />
            </div>
        </div>
    )
}

export default Header