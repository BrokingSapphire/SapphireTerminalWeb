"use client";
import React, { useState, useEffect } from "react";

interface SessionData {
  id: string;
  device: string;
  icon: string;
  location: string;
  lastActive: string;
  status: "current" | "inactive";
}

const CurrentSessions: React.FC = () => {
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
      <img src={iconPath} alt={device} className="w-8 h-8 object-contain" />
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
    // Add your resend OTP logic here
    console.log("Resending OTP...");
  };

  const handleOTPConfirm = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      // Handle OTP verification and logout logic here
      console.log("OTP verified:", otpValue);
      console.log("Logging out session:", sessionToLogout?.id);
      setShowOTPPopup(false);
      setSessionToLogout(null);
      setOtp(["", "", "", "", "", ""]);
      setIsTimerActive(false);
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
      <div className="w-full max-w-full bg-white border border-gray-300 rounded-lg p-6 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Current Sessions
              </h2>
              <p className="text-sm text-gray-500">
                Keep up with your available sessions logged in from your
                account. Learn more.
              </p>
            </div>
          </div>
        </div>

        {/* Sessions Container */}
        <div className="w-full bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
          {sessions.map((session, index) => (
            <div
              key={session.id}
              className="flex items-center justify-between py-3 px-2"
              style={{
                borderBottom:
                  index < sessions.length - 1 ? "0.5px solid #E5E7EB" : "none",
              }}
            >
              <div className="flex items-center gap-3">
                {getDeviceIcon(session.icon, session.device)}
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {session.device}
                  </div>
                  <div className="text-xs text-gray-500">
                    {session.location} • {session.lastActive}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-medium ${
                    session.status === "current"
                      ? "text-green-600"
                      : "text-orange-500"
                  }`}
                >
                  {session.status === "current" ? "Current" : "Inactive"}
                </span>
                <button
                  onClick={() => handleLogoutClick(session)}
                  className="text-red-600 hover:text-red-700 font-medium px-4 py-1.5 rounded-md border border-gray-300 hover:bg-red-50 transition-colors text-xs"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm w-full mx-4 text-center">
            <h3
              className="text-gray-900 mb-3"
              style={{
                fontFamily:
                  "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 590,
                fontSize: "21px",
                lineHeight: "100%",
                letterSpacing: "2%",
                textAlign: "center",
              }}
            >
              Log out
            </h3>

            <p className="text-gray-600 mb-5">Do you really want to log out?</p>

            <div className="space-y-4">
              <button
                onClick={handleConfirmLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
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
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-full transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OTP Verification Popup */}
      {showOTPPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-2xl  z-50 ">
          <div className="bg-white shadow-2xl rounded-2xl" style={{ width: "528px" }}>
            {/* OTP Header */}
            <div
              className="border border-gray-300 border-b-0 rounded-2xl bg-white p-4"
              style={{
                width: "528px",
                height: "175px",
                borderTopLeftRadius: "4px",
                borderTopRightRadius: "4px",
                borderWidth: "1px 1px 0px 1px",
                borderStyle: "solid",
                borderColor: "#D1D5DB",
                boxShadow:
                  "0px 4px 16px 0px rgba(0, 0, 0, 0.06), 0px 0px 4px 0px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div
                className="flex flex-col gap-8"
                style={{ width: "496px", height: "167px" }}
              >
                {/* Header Section */}
                <div
                  className="flex items-start justify-between pr-1.5"
                  style={{ width: "496px", height: "40px" }}
                >
                  <div >
                    <h3 className="w-[110px] h-[30px] opacity-100 font-inter font-bold font-16px text-lg leading-none tracking-normal text-[#1A1A1A]">
                      Verify OTP
                    </h3>

                    <p className="w-[450px] h-[17px] opacity-100 font-inter font-normal text-sm leading-none tracking-normal text-[#6B7280]">
                      OTP has been sent to your registered mobile number
                    </p>
                  </div>
                  <button
                    onClick={handleOTPCancel}
                    className="text-gray-400 hover:text-gray-600 p-2"
                  >
                    <svg
                      className="w-6 h-6"
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
                
                
                <div
                  className="flex flex-col gap-3 mb-4"
                  style={{ width: "496px", height: "60px" }}
                >
                  <h4 className="w-[252px] h-[15px] opacity-100 font-inter font-semibold text-sm leading-none tracking-normal text-[#1A1A1A] ">
                    Enter 6-digit OTP
                  </h4>
                  <div className="flex gap-3 ">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOTPChange(index, e.target.value)}
                        onKeyDown={(e) => handleOTPKeyDown(index, e)}
                        className="w-12 h-12 text-center text-lg font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                        maxLength={1}
                        style={{ backgroundColor: "#F9FAFB" }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Timer and Resend Section */}
            <div
              className="border-l border-r border-gray-300 bg-white px-4 py-3 flex items-center justify-between"
              style={{
                width: "528px",
                height: "57px",
                borderWidth: "0px 1px 0px 1px",
                borderStyle: "solid",
                borderColor: "#D1D5DB",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
            >
              <div
                className="flex items-center justify-between"
                style={{ width: "496px", height: "30px" }}
              >
                <div
                  className="flex items-center gap-2 rounded"
                  style={{
                    width: "84px",
                    height: "30px",
                    borderRadius: "4px",
                    gap: "9px",
                    paddingTop: "6px",
                    paddingRight: "8px",
                    paddingBottom: "6px",
                    paddingLeft: "8px",
                    backgroundColor: "#F7F9FD",
                  }}
                >
                  <svg
                    className="w-4 h-4 text-gray-600"
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
                  <span className="text-sm text-gray-600 font-medium">
                    {timer}sec
                  </span>
                </div>

                {timer === 0 && (
                  <button
                    onClick={handleResendOTP}
                    className="text-green-600 hover:text-green-700 font-semibold"
                    style={{
                      width: "90px",
                      height: "18px",
                      fontFamily:
                        "SF Pro, -apple-system, BlinkMacSystemFont, sans-serif",
                      fontWeight: 590,
                      fontSize: "15px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#1DB954",
                    }}
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>

            {/* Actions */}
            <div
              className="border border-gray-300 border-t-0 rounded-b bg-white p-3 flex items-center justify-end gap-3"
              style={{
                width: "528px",
                height: "57px",
                borderBottomLeftRadius: "4px",
                borderBottomRightRadius: "4px",
                borderWidth: "0px 1px 1px 1px",
                borderStyle: "solid",
                borderColor: "#D1D5DB",
              }}
            >
              <button
                onClick={handleOTPCancel}
                className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors font-medium text-sm"
                style={{
                  width: "86px",
                  height: "33px",
                  borderRadius: "6px",
                  paddingTop: "8px",
                  paddingRight: "16px",
                  paddingBottom: "8px",
                  paddingLeft: "16px",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleOTPConfirm}
                disabled={otp.join("").length !== 6}
                className="text-white font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                style={{
                  width: "86px",
                  height: "33px",
                  borderRadius: "6px",
                  paddingTop: "8px",
                  paddingRight: "16px",
                  paddingBottom: "8px",
                  paddingLeft: "16px",
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