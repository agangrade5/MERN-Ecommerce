import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(false);

    // Env variable
    const GEO_LOCATION_URL = import.meta.env.VITE_GEO_LOCATION_URL;

    const detectLocation = async () => {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                const url = `${GEO_LOCATION_URL}/reverse?lat=${latitude}&lon=${longitude}&format=json`;
                try {
                    const res = await axios.get(url);
                    setLocation(res.data.address);
                } catch (error) {
                    console.error("Error detecting location:", error);
                } finally {
                    setLoading(false);
                }
            },
            (err) => {
                console.error("Geolocation error:", err);
                setLoading(false);
            }
        );
    };

    return (
        <LocationContext.Provider value={{ location, detectLocation, loading }}>
            {children}
        </LocationContext.Provider>
    );
};

export const useLocationContext = () => useContext(LocationContext);
