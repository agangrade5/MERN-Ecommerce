import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
            {/* 404 Illustration */}
            <img
                src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
                alt="404 Not Found"
                className="w-96 mb-8"
            />

            {/* Text */}
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mt-2">
                Oops! Page Not Found
            </h2>
            <p className="text-gray-600 mt-2">
                The page you are looking for does not exist or has been moved.
            </p>

            {/* Button */}
            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default Error;
