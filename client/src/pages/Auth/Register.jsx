import React, { useState } from "react";
import { registerUser } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        password: "",
        confirm_password: "",
        timezone: "",
    });
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await registerUser(form);
            toast.success(res.data.message);
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
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
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="full_name"
                        value={form.full_name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        autoFocus
                    />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input
                        type="password"
                        name="confirm_password"
                        value={form.confirm_password}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                <p className="text-center text-sm mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-red-500 font-medium">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
