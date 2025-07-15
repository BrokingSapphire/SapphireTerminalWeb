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
      <div className={`w-[959px]  p-2 ${className}`}>
        <div className="bg-gray-50 dark:bg-[#121212] rounded-lg p-6 flex">
          {/* Shield Section */}
          <div className="flex flex-col items-center mr-4 text-center min-w-[280px]">
            <div className="mb-4">
              <div className="w-20 h-18 flex items-center justify-center mb-1">
                <img 
              src="/Shield.png" 
              alt="Shield"
              className="w-16 h-16 object-contain"
            />

              </div>
            </div>

            <div className="space-y-6">
              <h2
                className="text-gray-900 dark:text-[#ebeef5]"
                style={{
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "100%",
                  letterSpacing: "-0.43px",
                  textAlign: "center",
                }}
              >
                Protect your account
              </h2>
              <p
                className="leading-relaxed max-w-[250px] text-gray-600 dark:text-[#c9cacc]"
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "100%",
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
          <div className="flex-1 min-w-[400px]">
            <h2
              className="text-gray-900 dark:text-[#ebeef5] mb-6"
              style={{
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              Pick your Verification Method
            </h2>

            <div className="bg-white dark:bg-[#181A20] border border-gray-200 dark:border-[#2f2f2f] rounded-lg overflow-hidden">
              {/* Text Option */}
              <div
                className="p-4 flex items-center justify-between cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-[#181A20] border-b border-gray-200 dark:border-[#2f2f2f]"
                onClick={() => handleMethodClick("text")}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-gray-900 dark:text-[#ebeef5]"
                      style={{
                        fontFamily: "Inter",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "100%",
                        letterSpacing: "-0.43px",
                      }}
                    >
                      Text
                    </span>
                    {selectedMethod === "text" && (
                      <svg
                        className="w-4 h-4 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    )}
                  </div>
                  <span
                    className="text-gray-600 dark:text-[#c9cacc]"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 300,
                      fontSize: "14px",
                      lineHeight: "100%",
                      letterSpacing: "-0.43px",
                    }}
                  >
                    A code will be sent to your phone
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 dark:text-[#c9cacc]"
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
                className="p-4 flex items-center justify-between cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-[#181A20]"
                onClick={() => handleMethodClick("app")}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-gray-900 dark:text-[#ebeef5]"
                      style={{
                        fontFamily: "Inter",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "100%",
                        letterSpacing: "-0.43px",
                      }}
                    >
                      Authentication App
                    </span>
                    {selectedMethod === "app" && (
                      <svg
                        className="w-4 h-4 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    )}
                  </div>
                  <span
                    className="text-gray-600 dark:text-[#c9cacc]"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 300,
                      fontSize: "14px",
                      lineHeight: "100%",
                      letterSpacing: "-0.43px",
                    }}
                  >
                    Generate a code using authenticator app
                  </span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 dark:text-[#c9cacc]"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#181A20] shadow-2xl flex flex-col border border-gray-200 dark:border-[#2f2f2f]"
            style={{
              width: "500px",
              minHeight: "275px", // Changed from fixed height to minHeight
              borderTopLeftRadius: "4px",
              borderTopRightRadius: "4px",
              borderTopWidth: "1px",
              borderRightWidth: "1px",
              borderLeftWidth: "1px",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 px-4 pt-4">
              <h2 className="text-gray-900 dark:text-[#ebeef5]" style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "16px", lineHeight: "100%", letterSpacing: "0%" }}>
                Setup Two-Factor Authentication
              </h2>
              <button
                onClick={() => setShowTextPopup(false)}
                className="text-gray-400 dark:text-[#c9cacc] hover:text-gray-600 dark:hover:text-[#ebeef5] transition-colors"
              >
                <svg
                  className="w-6 h-6"
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
              <div className="space-y-6">
                {/* Description */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-[#121212] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-gray-600 dark:text-[#c9cacc]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-600 dark:text-[#c9cacc]" style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0%" }}>
                      Each time you log in, in addition to your password, you'll
                      use get an otp on you registered email and mobile number
                      to login into your account
                    </p>
                  </div>
                </div>

                {/* OTP Input Section */}
                <div className="space-y-3">
                  <p className="text-gray-900 dark:text-[#ebeef5]" style={{ fontFamily: "Inter", fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0%" }}>
                    Enter OTP sent to ******5678
                  </p>

                  <div className="flex gap-2">
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
                        className="w-10 h-10 text-center border-2 border-gray-300 dark:border-[#2f2f2f] rounded focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-[#181A20] text-base font-medium dark:text-[#ebeef5]"
                        maxLength={1}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end bg-[#F8F8FB] dark:bg-[#121212] gap-3 px-4 py-2.5 border-t border-gray-200 dark:border-[#2f2f2f]">
              <button
                onClick={() => setShowTextPopup(false)}
                className="px-4 py-2 text-gray-700 dark:text-[#c9cacc] bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2f2f2f] rounded hover:bg-gray-50 dark:hover:bg-[#23242a] transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowTextPopup(false)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Authenticator App Popup */}
      {showAuthenticatorPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#181A20] rounded-lg shadow-2xl w-[500px] h-[550px] flex flex-col border border-gray-200 dark:border-[#2f2f2f]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-200 dark:border-[#2f2f2f]">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-[#ebeef5]">
                Setup Authenticator App
              </h2>
              <button
                onClick={() => setShowAuthenticatorPopup(false)}
                className="text-gray-400 dark:text-[#c9cacc] hover:text-gray-600 dark:hover:text-[#ebeef5] transition-colors"
              >
                <svg
                  className="w-6 h-6"
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
            <div className="flex-1 px-4 py-2.5 space-y-3">
              {/* Description */}
              <p className="text-gray-600 dark:text-[#c9cacc] text-sm leading-tight">
                Each time you log in, in addition to your password, you'll use
                an authenticator app to generate a one-time code
              </p>

              {/* Step 1: Scan QR Code */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <div
                    className="inline-flex items-center justify-center text-xs font-medium text-gray-700 dark:text-[#c9cacc] bg-[#F8F8FB] dark:bg-[#121212] border border-gray-300 dark:border-[#2f2f2f] rounded-full"
                    style={{
                      width: "52px",
                      height: "23px",
                      paddingTop: "4px",
                      paddingRight: "8px",
                      paddingBottom: "4px",
                      paddingLeft: "8px",
                    }}
                  >
                    Step 1
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-[#ebeef5] text-sm">
                    Scan QR code
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-[#c9cacc] text-sm leading-tight">
                  Scan the QR below or manually enter the secret key into your
                  authenticator app.
                </p>

                {/* Gray container for QR section */}
                <div className="bg-[#F8F8FB] dark:bg-[#121212] rounded-lg p-2.5">
                  <div className="flex items-start gap-3">
                    {/* QR Code */}
                    <div className="flex-shrink-0">
                      <div
                        className="bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2f2f2f] rounded flex items-center justify-center"
                        style={{
                          width: "120px",
                          height: "120px",
                          borderRadius: "4px",
                        }}
                      >
                        <svg className="w-28 h-28" viewBox="0 0 100 100">
                          <rect width="100" height="100" fill="white" />
                          <rect
                            x="0"
                            y="0"
                            width="20"
                            height="20"
                            fill="black"
                          />
                          <rect
                            x="80"
                            y="0"
                            width="20"
                            height="20"
                            fill="black"
                          />
                          <rect
                            x="0"
                            y="80"
                            width="20"
                            height="20"
                            fill="black"
                          />
                          <rect
                            x="30"
                            y="10"
                            width="10"
                            height="10"
                            fill="black"
                          />
                          <rect
                            x="50"
                            y="20"
                            width="10"
                            height="10"
                            fill="black"
                          />
                          <rect
                            x="70"
                            y="30"
                            width="10"
                            height="10"
                            fill="black"
                          />
                          <rect
                            x="10"
                            y="40"
                            width="10"
                            height="10"
                            fill="black"
                          />
                          <rect
                            x="40"
                            y="50"
                            width="10"
                            height="10"
                            fill="black"
                          />
                          <rect
                            x="60"
                            y="60"
                            width="10"
                            height="10"
                            fill="black"
                          />
                          <rect
                            x="20"
                            y="70"
                            width="10"
                            height="10"
                            fill="black"
                          />
                          <rect
                            x="15"
                            y="15"
                            width="10"
                            height="10"
                            fill="black"
                          />
                          <rect
                            x="75"
                            y="15"
                            width="10"
                            height="10"
                            fill="black"
                          />
                          <rect
                            x="15"
                            y="75"
                            width="10"
                            height="10"
                            fill="black"
                          />
                          <rect
                            x="45"
                            y="45"
                            width="10"
                            height="10"
                            fill="black"
                          />
                          <rect
                            x="25"
                            y="35"
                            width="5"
                            height="5"
                            fill="black"
                          />
                          <rect
                            x="65"
                            y="25"
                            width="5"
                            height="5"
                            fill="black"
                          />
                          <rect
                            x="35"
                            y="65"
                            width="5"
                            height="5"
                            fill="black"
                          />
                          <rect
                            x="55"
                            y="75"
                            width="5"
                            height="5"
                            fill="black"
                          />
                          <rect
                            x="75"
                            y="55"
                            width="5"
                            height="5"
                            fill="black"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Can't Scan Section */}
                    <div className="flex-1 space-y-2">
                      <p className="text-gray-900 dark:text-[#ebeef5] font-medium text-sm">
                        Can't scan QR code?
                      </p>
                      <p className="text-gray-600 dark:text-[#c9cacc] text-sm">
                        Enter this secret code instead:
                      </p>

                      <div className="bg-[#F1F1FF] border border-gray-200 rounded p-2">
                        <code className="text-sm font-mono text-gray-800">
                          GGG-789-HJI-D34-879-FTH
                        </code>
                      </div>

                      <button
                        onClick={copyToClipboard}
                        className="inline-flex items-center gap-1 text-[#1A1A1A] hover:text-blue-700 transition-colors"
                        style={{
                          width: "111px",
                          height: "27px",
                          paddingTop: "6px",
                          paddingRight: "12px",
                          paddingBottom: "6px",
                          paddingLeft: "12px",
                          borderRadius: "6px",
                          borderWidth: "1px",
                          borderColor: "#e5e7eb",
                          backgroundColor: "#ffffff",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: "500",
                          fontSize: "12px",
                          lineHeight: "100%",
                        }}
                      >
                        <svg
                          className="w-4 h-4"
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
                    className="inline-flex items-center justify-center text-xs font-medium text-gray-700 dark:text-[#c9cacc] bg-[#F8F8FB] dark:bg-[#121212] border border-gray-300 dark:border-[#2f2f2f] rounded-full"
                    style={{
                      width: "55px",
                      height: "23px",
                      paddingTop: "4px",
                      paddingRight: "8px",
                      paddingBottom: "4px",
                      paddingLeft: "8px",
                    }}
                  >
                    Step 2
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-[#ebeef5] text-sm">
                    Get verification code
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-[#c9cacc] text-sm leading-tight">
                  Enter 6-digit code you see in your authenticator app.
                </p>

                <div>
                  <p className="text-gray-900 dark:text-[#ebeef5] font-medium text-sm mb-2">
                    Enter code here
                  </p>
                  <div className="flex gap-2">
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
                        className="w-10 h-10 text-center border-2 border-gray-300 dark:border-[#2f2f2f] rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-medium dark:bg-[#181A20] dark:text-[#ebeef5]"
                        maxLength={1}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end bg-[#F8F8FB] dark:bg-[#121212] gap-3 px-4 py-2.5 border-t border-gray-200 dark:border-[#2f2f2f]">
              <button
                onClick={() => setShowAuthenticatorPopup(false)}
                className="px-4 py-2 text-gray-700 dark:text-[#c9cacc] bg-white dark:bg-[#181A20] border border-gray-300 dark:border-[#2f2f2f] rounded hover:bg-gray-50 dark:hover:bg-[#23242a] transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAuthenticatorPopup(false)}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium"
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
