import React, { useRef, useState } from "react";
import { toast } from 'react-toastify';

import { contactUs } from '../api/web';

const Contact = () => {
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        message: "",
    });
    const [ loading, setLoading ] = useState(false);
    const firstName = useRef(null);
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;
        setLoading(true);
        try {
            const response = await contactUs(form);
            console.log("Click Url and see mail:", response.data.data.previewURL);
            toast.success(response.data.message);
            setForm({ full_name: "", email: "", message: "" });
            firstName.current.focus();
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

    const appName = import.meta.env.VITE_APP_NAME;

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-10">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-5xl">
                <h2 className="text-4xl font-bold text-white text-center mb-10">Get in Touch with <span className="text-red-400">{appName}</span></h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Info Section */}
                    <div className="text-white space-y-6">
                        <div>
                            <h3 className="text-2xl font-semibold">Contact Info</h3>
                            <p className="text-gray-300">Have a question or need support? We're here to help you with your electronics journey.</p>
                        </div>
                        <div>
                            <p><strong>📍 Address:</strong> 123 Electronics St, Style City, NY 10001</p>
                            <p><strong>📧 Email:</strong> support@mernecommerce.com</p>
                            <p><strong>📞 Phone:</strong> (123) 456-7890</p>
                        </div>
                    </div>

                    {/* Form Section */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-white mb-1">Your Name</label>
                            <input 
                                type="text" 
                                name="full_name"
                                placeholder="John Doe" 
                                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                onChange={handleChange}
                                value={form.full_name}
                                ref={firstName}
                                autoFocus
                            />
                        </div>
                        <div>
                            <label className="block text-white mb-1">Email Address</label>
                            <input 
                                type="email"
                                name="email" 
                                placeholder="john@example.com" 
                                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                onChange={handleChange}
                                value={form.email}
                            />
                        </div>
                        <div>
                            <label className="block text-white mb-1">Your Message</label>
                            <textarea 
                                rows="4" 
                                name="message"
                                placeholder="Type your message..." 
                                className="w-full px-4 py-2 bg-white/20 border border-white/30 text-white rounded-xl placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={handleChange}
                                value={form.message}></textarea>
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-red-500 to-purple-500 text-white font-semibold py-2 rounded-xl hover:opacity-90 transition-all duration-300 cursor-pointer">
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                    Sending...
                                </div>
                            ) : (
                                "Send Message 🚀"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;