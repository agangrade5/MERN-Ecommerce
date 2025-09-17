import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../../api/auth";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
        timezone: "",
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // Detect timezone on page load
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setForm((prev) => ({ ...prev, timezone: tz }));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;
        setLoading(true);

        try {
            const res = await loginUser(form);
            toast.success(res.data.message);
            setTimeout(() => navigate("/"), 2000);
        } catch (err) {
            console.log(err);
            let errorMessage = "Something went wrong";

            if (Array.isArray(err.response?.data?.message)) {
                // If backend returns an array of errors, join them into one string
                errorMessage = err.response.data.message.join(", ");
            } else if (typeof err.response?.data?.message === "string") {
                // If backend sends single string
                errorMessage = err.response.data.message;
            }
            toast.error(errorMessage);
        } finally {
            // small delay (1s) before enabling again
            setTimeout(() => setLoading(false), 2000);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        autoFocus
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                    <input
                        type="hidden"
                        name="timezone"
                        value={form.timezone}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-red-500 font-medium">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
