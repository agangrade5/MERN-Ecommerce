import React from 'react'
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";

const Cart = () => {
    return (
        <Link to={'/cart'} className='relative'>
            <IoCartOutline className='h-7 w-7' />
            <span className='bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white'>0</span>
        </Link>
    )
}

export default Cart