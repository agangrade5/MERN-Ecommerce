import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout";
import Error from "../pages/Errors/Error";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Cart from "../pages/Cart";

import AboutUs from "../pages/AboutUs";
import Contact from "../pages/ContactUs";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Profile from "../pages/Auth/Profile";
import Logout from "../pages/Auth/Logout";
import SingleProduct from "../pages/SingleProduct";
import CategoryProduct from "../pages/CategoryProduct";
// Context
import UserProvider from '../context/UserContext';
// Protected Route
import ProtectedRoute from "../components/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <UserProvider><Layout /></UserProvider>,
        errorElement: <Error />,
        children: [
            /***** Public *****/
            { index: true, element: <Home /> },
            // Auth
            { path: 'login', element: <Login />},
            { path: 'register', element: <Register />},
            // Products
            { path: 'products', element: <Products />},
            { path: 'products/:id', element: <SingleProduct />},
            // Cart
            { path: 'cart', element: <Cart />},
            // Category
            { path: 'category/:category', element: <CategoryProduct />},
            // Pages
            { path: 'about-us', element: <AboutUs />},
            { path: 'contact-us', element: <Contact />},
            /***** Protected ******/
            {
                element: <ProtectedRoute />,   // wrapper
                children: [
                    // Auth
                    { path: 'logout', element: <Logout />},
                    { path: 'profile', element: <Profile />},
                ],
            },
        ]
    }
])

export default router;
