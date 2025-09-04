import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useData } from '../context/DataContext';

const Category = () => {
    const navigate = useNavigate();

    const { categoryOnlyData } = useData();

    return (
        <div className='bg-[#101829]'>
            <div className='max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-around py-7 px-4'>
                {categoryOnlyData?.map((item, index) =>
                    item !== "All" ? (
                        <button
                            key={index}
                            className="uppercase bg-gradient-to-r from-red-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer"
                            onClick={() => navigate(`/category/${item}`)}
                        >
                            {item}
                        </button>
                    ) : null
                )}
            </div>
        </div>
    )
}

export default Category
