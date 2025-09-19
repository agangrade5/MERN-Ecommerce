import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_SERVER_URL || "http://localhost:5000/api/v1", // backend base url
    withCredentials: true, // for sending cookies if needed
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling token refresh
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Check if error is 401 and we haven't already tried to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to refresh token
                await api.post('/auth/refresh-token');
                
                // Retry the original request
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed, redirect to login
                console.log('Token refresh failed, redirecting to login...');
                
                // Clear any stored user data
                localStorage.removeItem('user');
                
                // Show error message
                toast.error('Your session has expired. Please login again.');
                
                // Redirect to login page
                window.location.href = '/login';
                
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;