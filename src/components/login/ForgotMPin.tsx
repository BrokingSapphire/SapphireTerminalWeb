"use client";

import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useRouter } from 'next/navigation';

export interface ForgotMPinProps {
  username: string;
  greeting: string;
  setOtpCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  onCancel: () => void;
  sessionId: string;
  onNextStep: (nextStep: string, session: any) => void;
}

type ForgotMPinStep = 'initiate' | 'verify-otp' | 'reset-mpin';

const ForgotMPin: React.FC<ForgotMPinProps> = ({
  onCancel,
  setOtpCompleted = () => {},
  username,
  onNextStep
}) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<ForgotMPinStep>('initiate');
  const [requestId, setRequestId] = useState<string>('');
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [newMpin, setNewMpin] = useState<string>("");
  const [confirmMpin, setConfirmMpin] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNewMpin, setShowNewMpin] = useState<boolean>(false);
  const [showConfirmMpin, setShowConfirmMpin] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleRedirect = () => {
    setTimeout(() => {
      router.push('/stocks');
    }, 700);
  };

  const validateMpinInput = (value: string): string => {
    const cleanValue = value.replace(/[^\d]/g, '');
    return cleanValue.slice(0, 4);
  };

  const handleNewMpinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleanValue = validateMpinInput(e.target.value);
    setNewMpin(cleanValue);
    setError(null);
  };

  const handleConfirmMpinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cleanValue = validateMpinInput(e.target.value);
    setConfirmMpin(cleanValue);
    setError(null);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.querySelector<HTMLInputElement>(`input[name="otp-${index + 1}"]`)?.focus();
    }

    if (newOtp.every((d) => d !== "") && value !== "") {
      setTimeout(() => {
        if (newOtp.every((d) => d !== "") && newOtp.join('').length === 6) {
          handleVerifyOTP(newOtp);
        }
      }, 100);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index]) {
      e.preventDefault();
      const newOtp = [...otp];
      const prevIndex = index - 1;
      if (prevIndex >= 0) {
        newOtp[prevIndex] = "";
        setOtp(newOtp);
        document.querySelector<HTMLInputElement>(`input[name="otp-${prevIndex}"]`)?.focus();
      }
    }
  };

  const handleInitiate = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login/forgot-mpin/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientId: username
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to initiate MPIN reset');
      }

      setRequestId(data.data?.requestId || '');
      setCurrentStep('verify-otp');
      
    } catch (err: any) {
      setError(err.message || 'Failed to initiate MPIN reset');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (otpArray?: string[]) => {
    if (isSubmitting) return;
    
    const otpValue = (otpArray || otp).join('');
    console.log('OTP Value:', otpValue, 'Length:', otpValue.length, 'OTP Array:', otpArray || otp);
    
    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      console.log('Verifying OTP:', otpValue, 'Request ID:', requestId);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login/forgot-mpin/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId: requestId,
          otp: otpValue
        }),
      });

      const data = await response.json();
      console.log('OTP verification response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Invalid OTP');
      }

      setCurrentStep('reset-mpin');
      
    } catch (err: any) {
      console.error('OTP verification error:', err);
      setError(err.message || 'OTP verification failed');
      setOtp(["", "", "", "", "", ""]);
      document.querySelector<HTMLInputElement>(`input[name="otp-0"]`)?.focus();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login/forgot-mpin/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId: requestId
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP');
      }

      setOtp(["", "", "", "", "", ""]);
      setError(null);
      
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetMPIN = async () => {
    if (newMpin.length !== 4) {
      setError("MPIN must be exactly 4 digits");
      return;
    }

    if (newMpin !== confirmMpin) {
      setError("MPINs do not match");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login/forgot-mpin/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId: requestId,
          newMpin: newMpin
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset MPIN');
      }

      setOtpCompleted(true);
      if (data?.data?.nextStep) {
        onNextStep(data.data.nextStep, data.data);
      } else {
        handleRedirect();
      }
      
    } catch (err: any) {
      setError(err.message || 'Failed to reset MPIN');
    } finally {
      setIsLoading(false);
    }
  };

  const renderInitiateStep = () => (
    <div className="space-y-6">
      <p className="text-[0.74rem] text-gray-600 dark:text-gray-300">
        We'll send a verification code to your registered mobile number to reset your MPIN.
      </p>
      
      {error && (
        <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleInitiate}
        disabled={isLoading}
        className={`w-full py-3 text-white font-semibold text-sm rounded-lg transition-all duration-200 ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#00C853] hover:bg-[#00B649]"
        }`}
      >
        {isLoading ? 'Sending...' : 'Send Verification Code'}
      </button>
    </div>
  );

  const renderVerifyOTPStep = () => (
    <div className="space-y-6">
      <p className="text-[0.74rem] text-gray-600 dark:text-gray-300">
        Enter the 6-digit verification code sent to your mobile number.
      </p>

      <div className="flex justify-start gap-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            name={`otp-${index}`}
            value={digit}
            maxLength={1}
            autoComplete="off"
            inputMode="numeric"
            pattern="\d*"
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleOtpChange(index, e.target.value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(index, e)}
            className="w-[42px] h-[42px] text-center text-lg rounded-md border bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-opacity-50 focus:outline-none"
            autoFocus={index === 0}
            disabled={isLoading || isSubmitting}
          />
        ))}
      </div>

      {error && (
        <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={handleResendOTP}
          disabled={isLoading}
          className="text-[#22F07D] hover:text-[#1DD069] transition-colors duration-200 text-sm disabled:opacity-50"
        >
          {isLoading ? 'Sending...' : 'Resend Code'}
        </button>
      </div>
    </div>
  );

  const renderResetMPINStep = () => (
    <div className="space-y-6">
      <p className="text-[0.74rem] text-gray-600 dark:text-gray-300">
        Create a new 4-digit MPIN for your account.
      </p>

      <div>
        <label className="block text-[0.74rem] font-medium mb-[0.42rem] text-gray-700 dark:text-gray-200">
          Enter New MPIN (4 digits only)
        </label>
        <div className="relative">
          <input
            type={showNewMpin ? "text" : "password"}
            value={newMpin}
            maxLength={4}
            autoComplete="off"
            inputMode="numeric"
            pattern="\d*"
            placeholder="Enter 4-digit MPIN"
            onChange={handleNewMpinChange}
            className="w-full p-[0.64rem] pr-[2.55rem] rounded-lg border bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white text-[0.85rem] border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-opacity-50 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowNewMpin(!showNewMpin)}
            className="absolute inset-y-0 right-0 flex items-center px-[0.64rem] text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
          >
            {showNewMpin ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-[0.74rem] font-medium mb-[0.42rem] text-gray-700 dark:text-gray-200">
          Confirm New MPIN (4 digits only)
        </label>
        <div className="relative">
          <input
            type={showConfirmMpin ? "text" : "password"}
            value={confirmMpin}
            maxLength={4}
            autoComplete="off"
            inputMode="numeric"
            pattern="\d*"
            placeholder="Confirm 4-digit MPIN"
            onChange={handleConfirmMpinChange}
            className="w-full p-[0.64rem] pr-[2.55rem] rounded-lg border bg-white dark:bg-[#1E1E1E] text-gray-900 dark:text-white text-[0.85rem] border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-opacity-50 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmMpin(!showConfirmMpin)}
            className="absolute inset-y-0 right-0 flex items-center px-[0.64rem] text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200"
          >
            {showConfirmMpin ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleResetMPIN}
        disabled={isLoading || newMpin.length !== 4 || confirmMpin.length !== 4}
        className={`w-full py-3 text-white font-semibold text-sm rounded-lg transition-all duration-200 ${
          isLoading || newMpin.length !== 4 || confirmMpin.length !== 4
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#00C853] hover:bg-[#00B649]"
        }`}
      >
        {isLoading ? 'Resetting...' : 'Reset MPIN'}
      </button>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col space-y-[1.7rem] px-[0.21rem]">
      <div className="flex items-center -ml-[1.27rem] -mt-[0.42rem]">
        <button
          onClick={onCancel}
          className="p-[0.21rem] rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <ChevronLeft size={17} className="text-gray-800 dark:text-white" />
        </button>
        <h2 className="text-[1.02rem] font-medium text-gray-800 dark:text-white pl-[0.42rem]">
          {currentStep === 'initiate' && 'Reset MPIN'}
          {currentStep === 'verify-otp' && 'Verify Code'}
          {currentStep === 'reset-mpin' && 'Create New MPIN'}
        </h2>
      </div>

      {currentStep === 'initiate' && renderInitiateStep()}
      {currentStep === 'verify-otp' && renderVerifyOTPStep()}
      {currentStep === 'reset-mpin' && renderResetMPINStep()}
    </div>
  );
};

export default ForgotMPin;