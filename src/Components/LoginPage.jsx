import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function LoginPage() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setError(''); 
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 
    
        try {
            const res = await axios.post("http://localhost:8000/login", {
                email: formData.email,
                password: formData.password
            });
    
            if (res.status === 200) {
                navigate("/dashboard");
                const token = res.data.token;
                localStorage.setItem("token" ,token);
                localStorage.setItem("_id" ,res.data.user._id)
            }
        } catch (err) {
            if (err.response?.status === 403) {
                navigate("/signup/OTP");
            } else if (err.response?.status === 401) {
                setError("Wrong password");
            } else if (err.response?.status === 404) {
                setError("User not found");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };
    

    const handleGoogleAuth = () => {
        console.log('Google auth triggered');
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-black text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-900"></div>
            
            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl animate-fade-in">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                        <p className="text-neutral-400">Sign in to your account to continue</p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg">
                            <p className="text-red-300 text-sm">{error}</p>
                        </div>
                    )}

                    <button
                        onClick={handleGoogleAuth}
                        className="w-full mb-6 flex items-center justify-center gap-3 bg-white text-black rounded-lg py-3 px-4 font-medium transition-all duration-300 hover:bg-gray-100 hover:-translate-y-0.5 shadow-lg"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continue with Google
                    </button>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-neutral-900 text-neutral-400">Or continue with email</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                                required
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-12 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all duration-300"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-white transition-colors duration-200"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-orange-500 bg-neutral-800 border-neutral-600 rounded focus:ring-orange-500 focus:ring-2"
                                />
                                <span className="ml-2 text-sm text-neutral-400">Remember me</span>
                            </label>
                            <button
                                type="button"
                                className="text-sm text-orange-500 hover:text-orange-400 transition-colors duration-200"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
                        >
                            Sign In
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <span className="text-neutral-400">Don't have an account? </span>
                        <button
                        onClick={() => {navigate("/signup")}}
                        className="text-orange-500 hover:text-orange-400 font-medium transition-colors duration-300">
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}