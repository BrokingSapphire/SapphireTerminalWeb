import React, { useState } from "react";

interface VerificationMethodProps {
  className?: string;
}

const VerificationMethod: React.FC<VerificationMethodProps> = ({
  className = "",
}) => {
  const [selectedMethod, setSelectedMethod] = useState<"text" | "app" | null>(
    null
  );
  const [showAuthenticatorPopup, setShowAuthenticatorPopup] = useState(false);
  const [showTextPopup, setShowTextPopup] = useState(false);
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [textOtpCode, setTextOtpCode] = useState(["", "", "", "", "", ""]);

  const handleMethodClick = (method: "text" | "app") => {
    setSelectedMethod(method);
    if (method === "app") {
      setShowAuthenticatorPopup(true);
    } else if (method === "text") {
      setShowTextPopup(true);
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleTextCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newCode = [...textOtpCode];
      newCode[index] = value;
      setTextOtpCode(newCode);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`text-code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleTextKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !textOtpCode[index] && index > 0) {
      const prevInput = document.getElementById(`text-code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText("GGG-789-HJI-D34-879-FTH");
  };

  return (
    <>
      <div className={`w-full max-w-6xl mx-auto p-3 sm:p-4 ${className}`}>
        <div className="bg-gray-50 dark:bg-[#121413] dark:border dark:border-[#2F2F2F] rounded-lg p-6 sm:p-6 flex flex-col lg:flex-row gap-6 lg:gap-6">
          {/* Shield Section */}
          <div className="flex flex-col items-center text-center w-full lg:w-auto lg:min-w-[280px] lg:mr-4">
            <div className="mb-4">
              <div className="w-16 h-16 sm:w-20 sm:h-18 flex items-center justify-center mb-1">
                <img 
                  src="/Shield.png" 
                  alt="Shield"
                  className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                />
              </div>
            </div>

            <div className="space-y-6 sm:space-y-6">
              <h2
                className="text-gray-900 dark:text-[#EBEEF5] text-base sm:text-base"
                style={{
                  fontFamily: "Inter",
                  fontWeight: 500,
                  lineHeight: "100%",
                  letterSpacing: "-0.43px",
                  textAlign: "center",
                }}
              >
                Protect your account
              </h2>
              <p
                className="text-[#666666] dark:text-[#C9CACC] leading-relaxed max-w-[300px] text-sm sm:text-sm"
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  lineHeight: "120%",
                  letterSpacing: "-0.43px",
                  textAlign: "center",
                }}
              >
                In order to protect your account you'll need a secondary
                authentication to continue with this action
              </p>
            </div>
          </div>

          {/* Verification Options Section */}
          <div className="flex-1 w-full lg:min-w-[400px]">
            <h2
              className="text-gray-900 dark:text-[#EBEEF5] mb-6 sm:mb-6 text-base sm:text-base"
              style={{
                fontFamily: "Inter",
                fontWeight: 500,
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              Pick your Verification Method
            </h2>

            <div className="bg-white dark:bg-[#121413] border border-gray-200 dark:border-[#2F2F2F] rounded-lg overflow-hidden">
              {/* Text Option */}
              <div
                className="p-4 sm:p-4 flex items-center justify-between cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#2F2F2F]"
                onClick={() => handleMethodClick("text")}
              >
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[#1A1A1A] dark:text-[#EBEEF5] text-base sm:text-base"
                      style={{
                        fontFamily: "Inter",
                        fontWeight: 400,
                        lineHeight: "100%",
                        letterSpacing: "-0.43px",
                      }}
                    >
                      Text
                    </span>
                    {selectedMethod === "text" && (
                      <svg
                        className="w-4 h-4 text-green-500 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    )}
                  </div>
                  <span
                    className="text-[#666666] dark:text-[#C9CACC] text-sm sm:text-sm"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 300,
                      lineHeight: "100%",
                      letterSpacing: "-0.43px",
                    }}
                  >
                    A code will be sent to your phone
                  </span>
                </div>
                <div className="flex items-center ml-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-[#C9CACC]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Authentication App Option */}
              <div
                className="p-4 sm:p-4 flex items-center justify-between cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-[#1a1a1a]"
                onClick={() => handleMethodClick("app")}
              >
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[#1A1A1A] dark:text-[#EBEEF5] text-base sm:text-base"
                      style={{
                        fontFamily: "Inter",
                        fontWeight: 400,
                        lineHeight: "100%",
                        letterSpacing: "-0.43px",
                      }}
                    >
                      Authentication App
                    </span>
                    {selectedMethod === "app" && (
                      <svg
                        className="w-4 h-4 text-green-500 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    )}
                  </div>
                  <span
                    className="text-[#666666] dark:text-[#C9CACC] text-sm sm:text-sm"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 300,
                      lineHeight: "100%",
                      letterSpacing: "-0.43px",
                    }}
                  >
                    Generate a code using authenticator app
                  </span>
                </div>
                <div className="flex items-center ml-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-[#C9CACC]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Text Verification Popup */}
      {showTextPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white dark:bg-[#121413] shadow-2xl flex flex-col border border-gray-200 dark:border-[#2F2F2F] w-full max-w-md sm:max-w-lg"
            style={{
              minHeight: "275px",
              borderTopLeftRadius: "4px",
              borderTopRightRadius: "4px",
              borderTopWidth: "1px",
              borderRightWidth: "1px",
              borderLeftWidth: "1px",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 px-4 pt-4">
              <h2
                className="text-[#1A1A1A] dark:text-[#EBEEF5] text-sm sm:text-base"
                style={{
                  fontFamily: "Inter",
                  fontWeight: 600,
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                Setup Two-Factor Authentication
              </h2>
              <button
                onClick={() => setShowTextPopup(false)}
                className="text-gray-400 dark:text-[#C9CACC] hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 px-4 pb-4">
              <div className="space-y-4 sm:space-y-6">
                {/* Description */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 dark:bg-[#23232399] dark:border dark:border-[#2F2F2F] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-[#C9CACC]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-[#6B7280] dark:text-[#C9CACC] text-xs sm:text-sm"
                      style={{
                        fontFamily: "Inter",
                        fontWeight: 400,
                        lineHeight: "120%",
                        letterSpacing: "0%",
                      }}
                    >
                      Each time you log in, in addition to your password, you'll
                      use get an otp on you registered email and mobile number
                      to login into your account
                    </p>
                  </div>
                </div>

                {/* OTP Input Section */}
                <div className="space-y-3">
                  <p
                    className="text-[#1A1A1A] dark:text-[#EBEEF5] text-xs sm:text-sm"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 400,
                      lineHeight: "100%",
                      letterSpacing: "0%",
                    }}
                  >
                    Enter OTP sent to ******5678
                  </p>

                  <div className="flex gap-1 sm:gap-2 justify-center">
                    {textOtpCode.map((digit, index) => (
                      <input
                        key={index}
                        id={`text-code-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) =>
                          handleTextCodeChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleTextKeyDown(index, e)}
                        className="w-8 h-8 sm:w-10 sm:h-10 text-center border-2 border-gray-300 dark:border-[#2F2F2F] dark:bg-[#121413] dark:text-[#EBEEF5] rounded focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-blue-400 text-sm sm:text-base font-medium"
                        maxLength={1}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end bg-[#F8F8FB] dark:bg-[#23232399] gap-2 sm:gap-3 px-4 py-2.5 border-t border-gray-200 dark:border-[#2F2F2F]">
              <button
                onClick={() => setShowTextPopup(false)}
                className="px-3 py-2 sm:px-4 text-gray-700 dark:text-[#C9CACC] bg-white dark:bg-[#121413] border border-gray-300 dark:border-[#2F2F2F] rounded hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowTextPopup(false)}
                className="px-3 py-2 sm:px-4 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium text-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Authenticator App Popup */}
      {showAuthenticatorPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#121413] border border-gray-200 dark:border-[#2F2F2F] rounded-lg shadow-2xl w-full max-w-md sm:max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 dark:border-[#2F2F2F] flex-shrink-0">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-[#EBEEF5]">
                Setup Authenticator App
              </h2>
              <button
                onClick={() => setShowAuthenticatorPopup(false)}
                className="text-gray-400 dark:text-[#C9CACC] hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 px-4 py-2.5 space-y-3 overflow-y-auto">
              {/* Description */}
              <p className="text-gray-600 dark:text-[#C9CACC] text-xs sm:text-sm leading-tight">
                Each time you log in, in addition to your password, you'll use
                an authenticator app to generate a one-time code
              </p>

              {/* Step 1: Scan QR Code */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <div
                    className="inline-flex items-center justify-center text-xs font-medium text-gray-700 dark:text-[#C9CACC] bg-[#F8F8FB] dark:bg-[#23232399] border border-gray-300 dark:border-[#2F2F2F] rounded-full px-2 py-1"
                  >
                    Step 1
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-[#EBEEF5] text-xs sm:text-sm">
                    Scan QR code
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-[#C9CACC] text-xs sm:text-sm leading-tight">
                  Scan the QR below or manually enter the secret key into your
                  authenticator app.
                </p>

                {/* Gray container for QR section */}
                <div className="bg-[#F8F8FB] dark:bg-[#23232399] dark:border dark:border-[#2F2F2F] rounded-lg p-2.5">
                  <div className="flex flex-col sm:flex-row items-start gap-3">
                    {/* QR Code */}
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <div
                        className="bg-white dark:bg-[#121413] border border-gray-300 dark:border-[#2F2F2F] rounded flex items-center justify-center"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "4px",
                        }}
                      >
                        <svg className="w-20 h-20 sm:w-24 sm:h-24" viewBox="0 0 100 100">
                          <rect width="100" height="100" fill="white" className="dark:fill-[#121413]" />
                          <rect
                            x="0"
                            y="0"
                            width="20"
                            height="20"
                            fill="black"
                            className="dark:fill-[#EBEEF5]"
                          />
                          <rect
                            x="80"
                            y="0"
                            width="20"
                            height="20"
                            fill="black"
                            className="dark:fill-[#EBEEF5]"
                          />
                          <rect
                            x="0"
                            y="80"
                            width="20"
                            height="20"
                            fill="black"
                            className="dark:fill-[#EBEEF5]"
                          />
                          <rect
                            x="30"
                            y="10"
                            width="10"
                            height="10"
                            fill="black"
                            className="dark:fill-[#EBEEF5]"
                          />
                          <rect
                            x="50"
                            y="20"
                            width="10"
                            height="10"
                            fill="black"
                            className="dark:fill-[#EBEEF5]"
                          />
                          <rect
                            x="70"
                            y="30"
                            width="10"
                            height="10"
                            fill="black"
                            className="dark:fill-[#EBEEF5]"
                          />
                          <rect
                            x="10"
                            y="40"
                            width="10"
                            height="10"
                            fill="black"
                            className="dark:fill-[#EBEEF5]"
                          />
                          <rect
                            x="40"
                            y="50"
                            width="10"
                            height="10"
                            fill="black"
                            className="dark:fill-[#EBEEF5]"
                          />
                          <rect
                            x="60"
                            y="60"
                            width="10"
                            height="10"
                            fill="black"
                            className="dark:fill-[#EBEEF5]"
                          />
                          <rect
                            x="20"
                            y="70"
                            width="10"
                            height="10"
                            fill="black"
                            className="dark:fill-[#EBEEF5]"
                          />
                          <rect
                            x="15"
                            y="15"
                            width="10"
                            height="10"
                            fill="black"
                            className="dark:fill-[#EBEEF5]"
                          />
                          <rect
                            x="75"
                            y="15"
                            width="10"
                            height="10"
                            fill="black"
                            className="dark:fill-[#EBEEF5]"
                          />
                          <rect
                            x="15"
                            y="75"
                            width="10"
                            height="10"
                            fill="black"
                            className="dark:fill-[#EBEEF5]"
                          />
                          <rect
                            x="45"
                            y="45"
                            width="10"
                            height="10"
                            fill="black"
                            className="dark:fill-[#EBEEF5]"
                          />
                          <rect
                            x="25"
                            y="35"
                            width="5"
                            height="5"
                            fill="black"
                            className="dark:fill-[#EBEEF5]"
                          />
                          <rect
                            x="65"
                            y="25"
                            width="5"
                            height="5"
                            fill="black"
                            className="dark:fill-[#EBEEF5]"
                          />
                          <rect
                            x="35"
                            y="65"
                            width="5"
                            height="5"
                            fill="black"
                            className="dark:fill-[#EBEEF5]"
                          />
                          <rect
                            x="55"
                            y="75"
                            width="5"
                            height="5"
                            fill="black"
                            className="dark:fill-[#EBEEF5]"
                          />
                          <rect
                            x="75"
                            y="55"
                            width="5"
                            height="5"
                            fill="black"
                            className="dark:fill-[#EBEEF5]"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Can't Scan Section */}
                    <div className="flex-1 space-y-2 w-full">
                      <p className="text-gray-900 dark:text-[#EBEEF5] font-medium text-xs sm:text-sm">
                        Can't scan QR code?
                      </p>
                      <p className="text-gray-600 dark:text-[#C9CACC] text-xs sm:text-sm">
                        Enter this secret code instead:
                      </p>

                      <div className="bg-[#F1F1FF] dark:bg-[#121413] border border-gray-200 dark:border-[#2F2F2F] rounded p-2 break-all">
                        <code className="text-xs sm:text-sm font-mono text-gray-800 dark:text-[#EBEEF5]">
                          GGG-789-HJI-D34-879-FTH
                        </code>
                      </div>

                      <button
                        onClick={copyToClipboard}
                        className="inline-flex items-center gap-1 text-[#1A1A1A] dark:text-[#EBEEF5] hover:text-blue-700 dark:hover:text-blue-400 transition-colors bg-white dark:bg-[#121413] border border-gray-200 dark:border-[#2F2F2F] rounded-md px-2 py-1 text-xs"
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: "500",
                        }}
                      >
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                        Copy Code
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Get Verification Code */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <div
                    className="inline-flex items-center justify-center text-xs font-medium text-gray-700 dark:text-[#C9CACC] bg-[#F8F8FB] dark:bg-[#23232399] border border-gray-300 dark:border-[#2F2F2F] rounded-full px-2 py-1"
                  >
                    Step 2
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-[#EBEEF5] text-xs sm:text-sm">
                    Get verification code
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-[#C9CACC] text-xs sm:text-sm leading-tight">
                  Enter 6-digit code you see in your authenticator app.
                </p>

                <div>
                  <p className="text-gray-900 dark:text-[#EBEEF5] font-medium text-xs sm:text-sm mb-2">
                    Enter code here
                  </p>
                  <div className="flex gap-1 sm:gap-2 justify-center">
                    {verificationCode.map((digit, index) => (
                      <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) =>
                          handleCodeChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-8 h-8 sm:w-10 sm:h-10 text-center border-2 border-gray-300 dark:border-[#2F2F2F] dark:bg-[#121413] dark:text-[#EBEEF5] rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-sm sm:text-base font-medium"
                        maxLength={1}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end bg-[#F8F8FB] dark:bg-[#23232399] gap-2 sm:gap-3 px-4 py-2.5 border-t border-gray-200 dark:border-[#2F2F2F] flex-shrink-0">
              <button
                onClick={() => setShowAuthenticatorPopup(false)}
                className="px-3 py-2 sm:px-4 text-gray-700 dark:text-[#C9CACC] bg-white dark:bg-[#121413] border border-gray-300 dark:border-[#2F2F2F] rounded hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAuthenticatorPopup(false)}
                className="px-3 py-2 sm:px-4 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium text-sm"
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

export default VerificationMethod;