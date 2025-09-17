import api from "./axios";

// Logout User (for later use)
export const logoutUser = async () => {
    return await api.post("/account/logout");
};