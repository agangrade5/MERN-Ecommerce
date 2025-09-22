import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout";
import Error from "../pages/Errors/Error";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
// Pages
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/ContactUs";
// Auth
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Profile from "../pages/Auth/Profile";
import Logout from "../pages/Auth/Logout";
import EditProfile from "../pages/Auth/EditProfile";
import ChangePassword from "../pages/Auth/ChangePassword";
// Single Product
import SingleProduct from "../pages/SingleProduct";
// Category Product
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
                    { path: 'edit-profile', element: <EditProfile />},
                    { path: 'change-password', element: <ChangePassword />},
                    // Cart
                    { path: 'cart', element: <Cart />},
                ],
            },
        ]
    }
])

export default router;
