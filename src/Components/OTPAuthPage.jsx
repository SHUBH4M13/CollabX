import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import authstore from '../store/authstore';

export default function OTPAuthPage() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(['', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendTimer, setResendTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [resendTimer]);

    const handleInputChange = (index, value) => {
        if (value.length > 1) return; // Prevent multiple characters
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError(''); // Clear error when user types

        // Auto-focus next input - Fixed: should be index < 3 for 4 inputs
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        
        // Handle paste
        if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            navigator.clipboard.readText()
            .then(text => {
                const pastedOtp = text.replace(/\D/g, '').slice(0, 4).split('');
                const newOtp = [...otp];
                pastedOtp.forEach((digit, i) => {
                    if (i < 4) newOtp[i] = digit;
                });
                setOtp(newOtp);
                // Focus the last filled input or next empty one - Fixed: should be max 3 for 4 inputs
                const lastIndex = Math.min(pastedOtp.length, 3);
                inputRefs.current[lastIndex]?.focus();
            });
        }
    }; 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpString = otp.join('');
        
        if (otpString.length !== 4) {
            setError('Please enter all 4 digits');
            return;
        }

        setIsLoading(true);
        setError('');
        
        try {
            const emp_id = authstore.getState().emp_id; 
            const response = await axios.post("http://localhost:8000/signup/OTP", {
                emp_id,
                otp: otpString, // Fixed: was toString(otp), now properly sends the OTP string
            });

            // Navigate to success page or login after successful verification
            if (response.status === 200) {
                navigate("/signup/success"); // or wherever you want to redirect after successful OTP verification
            }
        } catch (err) {
            if (err.response?.status === 400) {
                setError(err.response.data.error || 'Invalid or expired OTP');
            } else {
                setError('Something went wrong. Please try again.');
            }
            console.error("OTP error:", err.response?.data || err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (!canResend) return;

        setCanResend(false);
        setResendTimer(60);
        setError('');
        
        try {
            // You should implement a resend OTP API endpoint
            const emp_id = authstore.getState().emp_id;
            const employee = await Employee.findById(emp_id); // This should be an API call
            await SendGenerateOTP({ mailToBeVerifed: employee.email }); // This should be an API call
            
            // Show success message
            setError(''); // Clear any previous errors
        } catch (err) {
            setError('Failed to resend code. Please try again.');
            setCanResend(true);
            setResendTimer(0);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center bg-black text-white min-h-screen">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 via-black to-neutral-900/50"></div>
            
            <button 
                onClick={() => navigate(-1)}
                className="absolute top-6 left-6 z-20 flex items-center space-x-2 text-neutral-400 hover:text-white transition-colors duration-300"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="text-sm">Back</span>
            </button>

            <div className="px-4 py-10 md:py-20">
                <div className="text-center mb-8 animate-fade-in">
                    <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold md:text-4xl lg:text-6xl mb-4">
                        Verify Your Email
                    </h1>
                    <p className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-400 animate-fade-in-delay">
                        We've sent a 4-digit code to your email address
                    </p>
                </div>

                <div className="flex justify-center items-center">
                    <div className="relative z-10 w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-900 p-8 shadow-md animate-fade-in-delay-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex justify-center space-x-3 mb-6">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={el => inputRefs.current[index] = el}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleInputChange(index, e.target.value.replace(/\D/g, ''))}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className={`w-12 h-12 md:w-14 md:h-14 text-center text-xl font-bold bg-black border-2 rounded-lg focus:outline-none transition-all duration-300 ${
                                            error 
                                                ? 'border-red-500 focus:border-red-400' 
                                                : 'border-neutral-700 focus:border-primary hover:border-neutral-600'
                                        } ${digit ? 'text-white' : 'text-neutral-500'}`}
                                        placeholder="0"
                                    />
                                ))}
                            </div>

                            {error && (
                                <div className="text-red-400 text-sm text-center bg-red-900/20 border border-red-800 rounded-lg p-3 animate-fade-in">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading || otp.join('').length !== 4}
                                className={`w-full font-Geist transform rounded-lg px-6 py-3 font-medium text-white transition-all duration-300 ${
                                    isLoading || otp.join('').length !== 4
                                        ? 'bg-neutral-700 cursor-not-allowed'
                                        : 'bg-primary hover:-translate-y-0.5 hover:bg-primary/80'
                                }`}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Verifying...
                                    </div>
                                ) : (
                                    'Verify Code'
                                )}
                            </button>

                            <div className="text-center space-y-4 animate-fade-in-delay-3">
                                <p className="text-neutral-400 text-sm">
                                    Didn't receive the code?
                                </p>
                                
                                {canResend ? (
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        className="text-primary hover:text-primary/80 font-medium transition-colors duration-300"
                                    >
                                        Resend Code
                                    </button>
                                ) : (
                                    <p className="text-neutral-500 text-sm">
                                        Resend in {resendTimer}s
                                    </p>
                                )}
                            </div>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-neutral-500 text-sm">
                                Check your spam folder if you don't see the email
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 