import api from "./axios";

export const contactUs = async (data) => {
    return await api.post("/contact-us", data);
};
