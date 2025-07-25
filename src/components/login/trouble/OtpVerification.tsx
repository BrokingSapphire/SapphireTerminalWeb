'use client';

import React, { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

interface OtpVerificationProps {
  requestId: string; // ✅ use requestId instead of panNumber
  setRequestId: (id: string) => void;
  setCurrentStep: (step: number) => void;
  onCancel: () => void;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({ 
  requestId,
  setCurrentStep, 
  onCancel,
  setRequestId, // added this
}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    return `${seconds}`;
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    // Auto-focus next input if value is entered
    if (value && index < 5) {
      document.querySelector<HTMLInputElement>(`input[name="otp-${index + 1}"]`)?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.querySelector<HTMLInputElement>(`input[name="otp-${index - 1}"]`)?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(requestId);
    console.log(setRequestId);
    
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 6 || !/^\d{6}$/.test(otpValue)) {
      toast.error("Invalid OTP", {
        description: "Please enter a valid 6-digit OTP.",
        duration: 3000,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login/forgot-password/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId: requestId, 
          otp: otpValue,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "OTP verification failed");
      }

      // Show success toast
      toast.success("OTP Verified", {
        description: "Your OTP has been verified successfully.",
        duration: 3000,
      });

      setCurrentStep(2); 
    } catch (err: any) {
      toast.error("Verification Failed", {
        description: err.message || "Something went wrong during OTP verification. Please try again.",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (isResending || timeLeft > 0) return;

    try {
      setIsResending(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login/forgot-password/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to resend OTP");
      }

      setOtp(["", "", "", "", "", ""]);
      setTimeLeft(60); // Reset timer
      setError("");
      document.querySelector<HTMLInputElement>(`input[name="otp-0"]`)?.focus();

      // Show success toast for resend
      toast.success("OTP Resent", {
        description: "A new OTP has been sent to your registered email and phone number.",
        duration: 3000,
      });

    } catch (err: any) {
      toast.error("Resend Failed", {
        description: err.message || "Something went wrong while resending OTP. Please try again.",
        duration: 3000,
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col space-y-4">
      <div className="flex items-center mb-2 -px-2 -ml-5">
        <button
          onClick={() => setCurrentStep(0)}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <ChevronLeft size={20} className="text-gray-800 dark:text-white" />
        </button>
        <h2 className="text-lg font-medium ml-2 text-gray-800 dark:text-white">
          OTP Verification
        </h2>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 px-2">
        We have sent a 6-digit OTP to your registered email and phone number.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 px-2">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
            Enter OTP
          </label>
          
          <div className="flex justify-start gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                name={`otp-${index}`}
                value={digit}
                maxLength={1}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                autoComplete="off"
                className="w-[42px] h-[42px] text-center text-lg rounded-md border bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-opacity-50 focus:outline-none"
                autoFocus={index === 0}
                disabled={isSubmitting}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={timeLeft > 0 || isResending}
            className={`text-xs ${
              timeLeft > 0 || isResending
                ? "text-gray-400 dark:text-gray-500"
                : "text-[#00d05c]"
            }`}
          >
            {isResending 
              ? "Resending..."
              : timeLeft > 0 
                ? `Resend OTP (${formatTime(timeLeft)})`
                : "Resend OTP"
            }
          </button>
        </div>
        
        <button
          type="submit"
          className={`px-4 py-2 w-full text-white font-semibold text-sm rounded-lg transition-all duration-200 ${
            otp.join("").length !== 6 || isSubmitting
              ? "bg-[#00A645] cursor-not-allowed opacity-70"
              : "bg-[#00C853] hover:bg-[#00B649]"
          }`}
          disabled={otp.join("").length !== 6 || isSubmitting}
        >
          {isSubmitting ? "Verifying..." : "Verify"}
        </button>
      </form>
      
    </div>
  );
};

export default OtpVerification;