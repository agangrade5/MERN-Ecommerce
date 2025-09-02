import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Error from "../pages/Errors/Error";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import AboutUs from "../pages/AboutUs";
import Contact from "../pages/ContactUs";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Home /> },
            { path: 'products', element: <Products />},
            { path: 'cart', element: <Cart />},
            { path: 'about-us', element: <AboutUs />},
            { path: 'contact-us', element: <Contact />},
        ]
    }
])

export default router;
