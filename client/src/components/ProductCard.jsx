import React from 'react'
import { IoCartOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const navigate = useNavigate()
    const { addToCart } = useCart()

    // use env variable
    const PRICE_CURRENCY = import.meta.env.VITE_PRICE_CURRENCY;

    return (
        <div className='border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all p-2 h-max'>
            <img 
                src={product.image} 
                alt="" 
                className='bg-gray-100 aspect-square' 
                onClick={() => navigate(`/products/${product.id}`)} 
            />
            <h1 
                className='line-clamp-2 text-l p-1 font-semibold' 
                onClick={() => navigate(`/products/${product.id}`)}>
                {product.title}
            </h1>
            <p 
                className='my-1 text-l text-gray-800 font-bold'>
                {PRICE_CURRENCY}{product.price}
            </p>
            <button 
                onClick={() => addToCart(product)} 
                className='bg-red-500 px-3 py-2 text-lg rounded-md text-white w-full cursor-pointer flex gap-2 items-center justify-center font-semibold'><IoCartOutline className='w-6 h-6' /> Add to Cart
            </button>
        </div>
    )
}

export default ProductCard