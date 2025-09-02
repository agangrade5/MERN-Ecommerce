import React, { createContext, useContext, useState } from "react";
import axios from "axios";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
    const [data, setData] = useState();

    // fetching all products from api
    const fetchAllProducts = async () => {
        try {
            const res = await axios.get('https://fakestoreapi.in/api/products?limit=150');
            //console.log(res);
            const productsData = res.data.products;
            setData(productsData);
        } catch (error) {
            console.log(error);
        }
    };

    return <DataContext.Provider value={{data, setData, fetchAllProducts}}>
        {children}
    </DataContext.Provider>;
};

export const getData = () => useContext(DataContext);