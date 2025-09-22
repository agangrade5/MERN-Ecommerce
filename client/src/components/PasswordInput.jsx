// src/components/PasswordInput.jsx
import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const PasswordInput = ({ 
    id, 
    name, 
    placeholder, 
    value, 
    onChange, 
    className = "", 
    autoFocus = false,
    required = false 
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoFocus={autoFocus}
                required={required}
                className={`w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-200 ${className}`}
            />
            <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition duration-200"
                tabIndex={-1}
            >
                {showPassword ? (
                    <AiOutlineEyeInvisible className="h-5 w-5" />
                ) : (
                    <AiOutlineEye className="h-5 w-5" />
                )}
            </button>
        </div>
    );
};

export default PasswordInput;