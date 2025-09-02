import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Error from "../pages/Errors/Error";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/ContactUs";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import { LogOut } from "lucide-react";
import Profile from "../pages/Auth/Profile";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [
            /***** Public *****/
            { index: true, element: <Home /> },
            { path: 'products', element: <Products />},
            { path: 'cart', element: <Cart />},
            { path: 'about-us', element: <AboutUs />},
            { path: 'contact-us', element: <Contact />},
            // Auth
            { path: 'login', element: <Login />},
            { path: 'register', element: <Register />},
            { path: 'logout', element: <LogOut />},
            { path: 'profile', element: <Profile />},
        ]
    }
])

export default router;
