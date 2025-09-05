import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes/router'
import { useCart } from './context/CartContext';

const App = () => {
    const { cartItem, setCartItem } = useCart();

    //save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('cartItem', JSON.stringify(cartItem));
    }, [cartItem]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App