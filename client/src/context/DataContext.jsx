import React, { createContext, useContext, useState } from "react";
import axios from "axios";

// Create context
export const DataContext = createContext(null);

// Provider component
export const DataProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    // use env variable
    const FAKE_STORE_API = import.meta.env.VITE_FAKE_STORE_API;
    // Fetch all products from API
    const fetchProducts = async () => {
        try {
            const response = await axios.get(
                `${FAKE_STORE_API}/products?limit=150`
            );
            setProducts(response.data.products || []);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Extract unique values from product data (e.g., categories, brands, etc.)
    const getUniqueValues = (list, key) => {
        if (!list || list.length === 0) return ["All"];
        const values = list.map((item) => item[key]);
        return ["All", ...new Set(values)];
    };

    const categoryOnlyData = getUniqueValues(products, "category");
    const brandOnlyData = getUniqueValues(products, "brand");

    return (
        <DataContext.Provider
            value={{ products, setProducts, fetchProducts, categoryOnlyData, brandOnlyData }}
        >
            {children}
        </DataContext.Provider>
    );
};

// Custom hook for using the context
export const useData = () => useContext(DataContext);
