import api from "./axios";

// Register User
export const registerUser = async (data) => {
    return await api.post("/auth/register", data);
};

// Login User (for later use)
export const loginUser = async (data) => {
    return await api.post("/auth/login", data);
};

// Logout User (for later use)
export const logoutUser = async () => {
    return await api.post("/auth/logout");
};