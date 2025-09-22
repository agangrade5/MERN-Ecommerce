import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { changePassword } from '../../api/account';
import PasswordInput from '../../components/PasswordInput';

const ChangePassword = () => {
    const [ form, setForm ] = useState({ 
        current_password: "", 
        new_password: "", 
        confirm_password: "" 
    });
    const [ loading, setLoading ] = useState(false);

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await changePassword(form);
            toast.success(res.data.message);
            navigate("/profile");
        } catch (err) {
            let errorMessage = "Something went wrong";
            if (Array.isArray(err.response?.data?.message)) {
                errorMessage = err.response.data.message.join(", ");
            } else if (typeof err.response?.data?.message === "string") {
                errorMessage = err.response.data.message;
            }
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Change Password</h2>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <PasswordInput
                        id="current_password"
                        name="current_password"
                        placeholder="Enter your current password"
                        value={form.current_password}
                        onChange={handleChange}
                        autoFocus
                    />
                    <PasswordInput
                        id="new_password"
                        name="new_password"
                        placeholder="Enter your new password"
                        value={form.new_password}
                        onChange={handleChange}
                    />
                    <PasswordInput
                        id="confirm_password"
                        name="confirm_password"
                        placeholder="Confirm your new password"
                        value={form.confirm_password}
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                Updating...
                            </div>
                        ) : (
                            "Update Password"
                        )}
                    </button>
                </form>
                <div className="text-center mt-6">
                    <Link 
                        to="/profile" 
                        className="text-red-500 hover:text-red-600 text-sm font-medium transition duration-200"
                    >
                        ← Back to Profile
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
