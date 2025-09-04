import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";

import { useData } from "../context/DataContext";
import Breadcrums from "../components/Breadcrums";
import Loading from "../assets/Loading4.webm"
import { useCart } from '../context/CartContext';

const SingleProduct = () => {
    const params = useParams()
    const { product, fetchProduct } = useData();
    const { addToCart } = useCart()

    useEffect(() => {
        fetchProduct(params.id);
    }, [params.id]);
    
    const OriginalPrice = product.discount && Math.round(product.price + (product.price * product.discount / 100))

    return (
        <>
            {
                product ? <div className='px-4 pb-4 md:px-0'>

                    <Breadcrums title={product.title} />

                    <div className='max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10'>
                        
                        {/* product image */}
                        <div className='w-full'>
                            <img src={product.image}
                                alt={product.title}
                                className='rounded-2xl w-full object-cover' />
                        </div>

                        {/* product details */}
                        <div className='flex flex-col gap-6'>
                            <h1 className='md:text-3xl text-xl font-bold text-gray-800'>
                                {product.title}
                            </h1>
                            <div className='text-gray-700'>
                                {product.brand?.toUpperCase()} /{product.category?.toUpperCase()} /{product.model}
                            </div>
                            <p className='text-xl text-red-500 font-bold'>${product.price} { OriginalPrice && (
                                <>
                                    <span className='line-through text-gray-700'>${OriginalPrice}</span> <span className='bg-red-500 text-white px-4 py-2 rounded-full'>{product.discount}% discount</span>
                                </>
                                )}
                            </p>
                            <p className='text-gray-600'>{product.description}</p>

                            {/* qunatity selector */}
                            <div className='flex items-center gap-4'>
                                <label htmlFor="" className='text-sm font-medium text-gray-700'>Quantity:</label>
                                <input 
                                    type="number" 
                                    min={1} 
                                    max={product.stock}
                                    defaultValue={1}
                                    className='w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 foucs:ring-red-500'
                                />
                            </div>

                            <div className='flex gap-4 mt-4'>
                                <button 
                                    onClick={() => addToCart(product)} 
                                    className='px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md cursor-pointer'>
                                    <IoCartOutline className='w-6 h-6' /> 
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div> :
                <div className='flex items-center justify-center h-screen'>
                    <video muted autoPlay loop>
                        <source src={Loading} type='video/webm' />
                    </video>
                </div>
            }
        </>
    );
};

export default SingleProduct;
