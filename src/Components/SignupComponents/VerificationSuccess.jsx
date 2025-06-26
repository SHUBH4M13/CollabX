import React from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle, Mail, ArrowRight } from 'lucide-react';

export default function VerificationSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="relative z-10 rounded-3xl border border-neutral-800 bg-neutral-900 p-8 shadow-2xl animate-fade-in">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-[#ff6900] rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute inset-0 w-20 h-20 bg-[#ff6900] rounded-full opacity-20"></div>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              Verification Successful!
            </h1>
            <p className="text-neutral-400 text-lg leading-relaxed ">
              Your email has been successfully verified. You can now access your account and enjoy all features.
            </p>
          </div>

          {/* Email Confirmation Visual */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700">
              <Mail className="w-5 h-5 text-[#ff6900]" />
              <span className="text-neutral-300 text-sm">Email Verified</span>
            </div>
          </div>

          {/* Login Button */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/login")}
              className="group w-full sm:w-60  transform rounded-lg bg-[#ff6900] px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fd9a00] hover:shadow-lg hover:shadow-[#ff6900]/25 flex items-center justify-center gap-2"
            >
              Continue to Login
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-neutral-500 text-sm ">
              Welcome to our platform! Ready to get started?
            </p>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#ff6900] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-[#fd9a00] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-[#ff6900] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

    </div>
  );
}