import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from "../assets/Loading4.webm"
import { ChevronLeft } from 'lucide-react'
import ProductListView from '../components/ProductListView'
import { useData } from '../context/DataContext'

const CategoryProduct = () => {
    const navigate = useNavigate()
    const params = useParams();
    const { productsByCategory, fetchProductsByCategory } = useData();

    useEffect(() => {
        fetchProductsByCategory(params.category);
        window.scrollTo(0, 0)
    }, [params.category]);

    return (
        <div>
            {
                productsByCategory.length > 0 ? (
                    <div className='max-w-6xl mx-auto mt-10 mb-10 px-4'>
                        <button onClick={() => navigate('/')} className='bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center'><ChevronLeft /> Back</button>
                        {
                            productsByCategory.map((product, index) => {
                                return <ProductListView key={index} product={product} />
                            })
                        }
                    </div>
                ) : (
                    <div className='flex items-center justify-center h-[400px]'>
                        <video muted autoPlay loop>
                            <source src={Loading} type='video/webm' />
                        </video>
                    </div>
                )
            }
        </div>
    )
}

export default CategoryProduct
