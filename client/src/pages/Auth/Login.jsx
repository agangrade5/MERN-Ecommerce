import React from "react";

const Login = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                        Sign In
                    </button>
                </form>
                <p className="text-center text-sm mt-4">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-red-500 font-medium">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
