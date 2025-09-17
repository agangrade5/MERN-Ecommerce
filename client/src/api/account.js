import api from "./axios";

// Logout User (for later use)
export const logoutUser = async () => {
    return await api.post("/account/logout");
};
// get profile
export const getProfile = async () => {
    return await api.get("/account/get-profile");
}

// Change Password
export const changePassword = async (data) => {
    return await api.post("/account/change-password", data);
};


