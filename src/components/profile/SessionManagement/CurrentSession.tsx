"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SessionData {
  id: string;
  device: string;
  icon: string;
  location: string;
  lastActive: string;
  status: "current" | "inactive";
}

const CurrentSessions: React.FC = () => {
  const router = useRouter();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showOTPPopup, setShowOTPPopup] = useState(false);
  const [sessionToLogout, setSessionToLogout] = useState<SessionData | null>(
    null
  );
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);

 const sessions: SessionData[] = [
    {
      id: "1",
      device: "Chrome (Macbook M4 Pro)",
      icon: "/chrome.png",
      location: "Mumbai, Maharashtra",
      lastActive: "38min ago",
      status: "current",
    },
    {
      id: "2",
      device: "Apple 14 Pro",
      icon: "/apple.png",
      location: "Nagpur, Maharashtra",
      lastActive: "20 min ago",
      status: "current",
    },
    {
      id: "3",
      device: "Microsoft Surface pro",
      icon: "/microsoft.png",
      location: "Mumbai, Maharashtra",
      lastActive: "4D ago",
      status: "inactive",
    },
    {
      id: "4",
      device: "Samsung S24 Ultra",
      icon: "/android.png",
      location: "Mumbai, Maharashtra",
      lastActive: "1M ago",
      status: "inactive",
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const getDeviceIcon = (iconPath: string, device: string) => {
    return (
      <img 
        src={iconPath} 
        alt={device} 
        className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-contain flex-shrink-0" 
      />
    );
  };

  const handleLogoutClick = (session: SessionData) => {
    setSessionToLogout(session);
    setShowLogoutPopup(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutPopup(false);
    setShowOTPPopup(true);
    setTimer(60);
    setIsTimerActive(true);
    setOtp(["", "", "", "", "", ""]);
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
    setSessionToLogout(null);
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleResendOTP = () => {
    setTimer(60);
    setIsTimerActive(true);
    setOtp(["", "", "", "", "", ""]);
    console.log("Resending OTP...");
  };

  const handleOTPConfirm = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      console.log("OTP verified:", otpValue);
      console.log("Logging out session:", sessionToLogout?.id);
      
      // Close popups and reset state
      setShowOTPPopup(false);
      setSessionToLogout(null);
      setOtp(["", "", "", "", "", ""]);
      setIsTimerActive(false);
      
      // Navigate to the specified route
      router.push("/accounts/CurrentSession/SessionManagement");
    }
  };

  const handleOTPCancel = () => {
    setShowOTPPopup(false);
    setSessionToLogout(null);
    setOtp(["", "", "", "", "", ""]);
    setIsTimerActive(false);
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto bg-white dark:bg-[#121212] border border-gray-300 dark:border-[#2f2f2f] rounded-lg p-3 sm:p-4 lg:p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between mb-4 sm:mb-6">
          <div className="flex flex-col gap-2 sm:gap-3 flex-1">
            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 dark:text-[#F4F4F9] font-inter">
              Current Sessions
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-[#c9cacc] font-inter leading-relaxed">
              Keep up with your available sessions logged in from your
              account. Learn more.
            </p>
          </div>
        </div>

        {/* Sessions Container */}
        <div className="w-full bg-white dark:bg-[#121212] border border-gray-300 dark:border-[#2f2f2f] rounded-lg p-3 sm:p-4 shadow-sm">
          {sessions.map((session, index) => (
            <div
              key={session.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 px-1 sm:px-2 gap-3 sm:gap-0"
              style={{
                borderBottom:
                  index < sessions.length - 1 ? "0.5px solid #E5E7EB" : "none",
              }}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {getDeviceIcon(session.icon, session.device)}
                <div className="flex-1 min-w-0">
                  <div className="text-sm sm:text-base font-medium text-gray-900 dark:text-[#F4F4F9] font-inter truncate">
                    {session.device}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-[#c9cacc] font-inter">
                    {session.location} • {session.lastActive}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <span
                  className={`text-xs sm:text-sm font-medium font-inter ${
                    session.status === "current"
                      ? "text-green-600 dark:text-green-400"
                      : "text-orange-500 dark:text-orange-300"
                  }`}
                >
                  {session.status === "current" ? "Current" : "Inactive"}
                </span>
                <button
                  onClick={() => handleLogoutClick(session)}
                  className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium px-3 sm:px-4 py-1.5 rounded-md border border-gray-300 dark:border-[#2f2f2f] hover:bg-red-50 dark:hover:bg-[#23272F] transition-colors text-xs sm:text-sm font-inter whitespace-nowrap"
                >
                  Log out
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#121212] rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 max-w-xs sm:max-w-sm w-full mx-2 text-center">
            <h3
              className="text-gray-900 dark:text-[#F4F4F9] mb-3 font-inter text-lg sm:text-xl"
              style={{
                fontWeight: 590,
                lineHeight: "100%",
                letterSpacing: "2%",
                textAlign: "center",
              }}
            >
              Log out
            </h3>

            <p className="text-gray-600 dark:text-[#c9cacc] mb-5 font-inter text-sm sm:text-base">
              Do you really want to log out?
            </p>

            <div className="space-y-3 sm:space-y-4">
              <button
                onClick={handleConfirmLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-full transition-colors duration-200 flex items-center justify-center gap-2 font-inter text-sm sm:text-base"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Log out
              </button>

              <button
                onClick={handleCancelLogout}
                className="w-full bg-gray-100 dark:bg-[#2f2f2f] hover:bg-gray-200 dark:hover:bg-[#3f3f3f] text-gray-700 dark:text-[#F4F4F9] font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-full transition-colors duration-200 font-inter text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Verification Popup */}
      {showOTPPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#121212] shadow-2xl rounded-xl sm:rounded-2xl w-full max-w-md sm:max-w-lg lg:max-w-xl">
            {/* OTP Header */}
            <div className="border border-gray-300 dark:border-[#2f2f2f] border-b-0 rounded-t-xl sm:rounded-t-2xl bg-white dark:bg-[#121212] p-4 sm:p-6">
              <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
                {/* Header Section */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-4">
                    <h3 className="font-inter font-bold text-lg sm:text-xl leading-none tracking-normal text-[#1A1A1A] dark:text-[#F4F4F9] mb-2">
                      Verify OTP
                    </h3>
                    <p className="font-inter font-normal text-sm sm:text-base leading-relaxed tracking-normal text-[#6B7280] dark:text-[#c9cacc]">
                      OTP has been sent to your registered mobile number
                    </p>
                  </div>
                  <button
                    onClick={handleOTPCancel}
                    className="text-gray-400 dark:text-[#c9cacc] hover:text-gray-600 dark:hover:text-gray-300 p-1 sm:p-2 flex-shrink-0"
                  >
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* OTP Input Section */}
                <div className="flex flex-col gap-3 sm:gap-4">
                  <h4 className="font-inter font-semibold text-sm sm:text-base leading-none tracking-normal text-[#1A1A1A] dark:text-[#F4F4F9]">
                    Enter 6-digit OTP
                  </h4>
                  <div className="flex gap-2 sm:gap-3 justify-center">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOTPChange(index, e.target.value)}
                        onKeyDown={(e) => handleOTPKeyDown(index, e)}
                        className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-center text-sm sm:text-base lg:text-lg font-medium border border-gray-300 dark:border-[#2f2f2f] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-[#1e1e1e] text-gray-900 dark:text-[#F4F4F9]"
                        maxLength={1}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Timer and Resend Section */}
            <div className="border-l border-r border-gray-300 dark:border-[#2f2f2f] bg-white dark:bg-[#121212] px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
              <div className="flex items-center gap-2 rounded bg-[#F7F9FD] dark:bg-[#2f2f2f] px-2 sm:px-3 py-1.5 sm:py-2">
                <svg
                  className="w-4 h-4 text-gray-600 dark:text-[#c9cacc]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-gray-600 dark:text-[#c9cacc] font-medium font-inter">
                  {timer}sec
                </span>
              </div>

              {timer === 0 && (
                <button
                  onClick={handleResendOTP}
                  className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-semibold font-inter text-sm sm:text-base"
                  style={{
                    fontWeight: 590,
                    color: "#1DB954",
                  }}
                >
                  Resend OTP
                </button>
              )}
            </div>

            {/* Actions */}
            <div className="border border-gray-300 dark:border-[#2f2f2f] border-t-0 rounded-b-xl sm:rounded-b-2xl bg-white dark:bg-[#121212] p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={handleOTPCancel}
                className="w-full sm:w-auto text-gray-700 dark:text-[#F4F4F9] bg-white dark:bg-[#2f2f2f] border border-gray-300 dark:border-[#2f2f2f] hover:bg-gray-50 dark:hover:bg-[#3f3f3f] transition-colors font-medium text-sm font-inter rounded-md px-4 py-2 order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                onClick={handleOTPConfirm}
                disabled={otp.join("").length !== 6}
                className="w-full sm:w-auto text-white font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 font-inter rounded-md px-4 py-2 order-1 sm:order-2"
                style={{
                  backgroundColor: "#1DB954",
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentSessions;