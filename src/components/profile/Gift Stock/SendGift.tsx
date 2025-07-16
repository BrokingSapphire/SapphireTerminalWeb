import React, { useState } from 'react';

const GiftTransferPage: React.FC = () => {
  
  const [formData, setFormData] = useState({
    recipientName: '',
    recipientMobile: '',
    recipientEmail: '',
    giftMessage: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContinue = () => {
    console.log('Form submitted:', formData);
    // Navigate to the next page using window.location.href
    window.location.href = '/accounts/GiftStock/ChooseGiftStock';
  };

  return (
    <div className="bg-white dark:bg-[#121212] flex items-center justify-center p-2 sm:p-3 lg:p-1 lg:mr-16 lg:mb-6">
      <div 
        className="bg-[#F8F8FB] dark:bg-[#121413] dark:border dark:border-[#2F2F2F] rounded-xl flex flex-col lg:flex-row shadow-sm w-full max-w-[700px] min-h-[320px]"
        style={{ boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.06), 0px 0px 2px 0px rgba(0, 0, 0, 0.04)' }}
      >
        {/* Left Section - Gift Box and Instructions */}
        <div className="flex flex-col justify-between py-3 px-2 w-full lg:w-[150px] lg:h-[150px]">
          {/* Gift Box Icon - Using imported image */}
          <div className="flex justify-center mb-2 lg:mb-3 lg:ml-2">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center">
              <img 
                src="/Gift Box.png" 
                alt="Gift Box" 
                className="w-8 h-8 lg:w-10 lg:h-10 object-contain"
                onError={(e) => {
                  // Fallback to SVG if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.setAttribute('style', 'display: block');
                }}
              />
              {/* Fallback SVG (hidden by default) */}
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 40 40" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'none' }}
              >
                <path d="M35 15V32.5C35 33.8807 33.8807 35 32.5 35H7.5C6.11929 35 5 33.8807 5 32.5V15H35Z" stroke="#6B7280" strokeWidth="2"/>
                <path d="M35 10V15H5V10C5 8.61929 6.11929 7.5 7.5 7.5H32.5C33.8807 7.5 35 8.61929 35 10Z" stroke="#6B7280" strokeWidth="2"/>
                <path d="M20 7.5V35" stroke="#6B7280" strokeWidth="2"/>
                <path d="M15 7.5C15 5.01472 12.9853 3 10.5 3C8.01472 3 6 5.01472 6 7.5C6 9.98528 8.01472 12 10.5 12C12.9853 12 15 9.98528 15 7.5Z" stroke="#6B7280" strokeWidth="2"/>
                <path d="M34 7.5C34 5.01472 31.9853 3 29.5 3C27.0147 3 25 5.01472 25 7.5C25 9.98528 27.0147 12 29.5 12C31.9853 12 34 9.98528 34 7.5Z" stroke="#6B7280" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          {/* Instructions */}
          <div className="space-y-2 text-xs text-gray-600 dark:text-[#C9CACC] font-inter">
            <div className="flex items-start gap-1">
              <span className="text-gray-500 dark:text-[#C9CACC] mt-0.5 flex-shrink-0">1.</span>
              <p>Select the stocks or instruments you want to gift.</p>
            </div>
            <div className="flex items-start gap-1">
              <span className="text-gray-500 dark:text-[#C9CACC] mt-0.5 flex-shrink-0">2.</span>
              <p>We notify the recipient to accept it via their Sapphire Broking account.</p>
            </div>
            <div className="flex items-start gap-1">
              <span className="text-gray-500 dark:text-[#C9CACC] mt-0.5 flex-shrink-0">3.</span>
              <p>New to Sapphire? They can sign up and accept later.</p>
            </div>
            <div className="flex items-start gap-1">
              <span className="text-gray-500 dark:text-[#C9CACC] mt-0.5 flex-shrink-0">4.</span>
              <p>You confirm, and we transfer the securities to their demat account.</p>
            </div>
          </div>
        </div>
        {/* Right Section - Form */}
        <div className="bg-white dark:bg-[#121413] dark:border dark:border-[#2F2F2F] rounded-xl p-2 sm:p-3 flex flex-col justify-between w-full lg:w-[320px] lg:h-[200px] lg:ml-3">
          <div className="space-y-2">
            {/* Recipient's Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-[#EBEEF5] mb-0.5 font-inter">
                Recipient's name
              </label>
              <input
                type="text"
                name="recipientName"
                value={formData.recipientName}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full px-2 py-1.5 border border-gray-300 dark:border-[#2F2F2F] dark:bg-[#121413] dark:text-[#C9CACC] dark:placeholder-[#C9CACC] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent font-inter text-[14px]"
              />
            </div>
            {/* Recipient's Mobile */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-[#EBEEF5] mb-0.5 font-inter">
                Recipient's mobile
              </label>
              <input
                type="tel"
                name="recipientMobile"
                value={formData.recipientMobile}
                onChange={handleInputChange}
                placeholder="Mobile"
                className="w-full px-2 py-1.5 border border-gray-300 dark:border-[#2F2F2F] dark:bg-[#121413] dark:text-[#C9CACC] dark:placeholder-[#C9CACC] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent font-inter text-[14px]"
              />
            </div>
            {/* Recipient's Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-[#EBEEF5] mb-0.5 font-inter">
                Recipient's e-mail (optional)
              </label>
              <input
                type="email"
                name="recipientEmail"
                value={formData.recipientEmail}
                onChange={handleInputChange}
                placeholder="E-mail"
                className="w-full px-2 py-1.5 border border-gray-300 dark:border-[#2F2F2F] dark:bg-[#121413] dark:text-[#C9CACC] dark:placeholder-[#C9CACC] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent font-inter text-[14px]"
              />
            </div>
            {/* Gift Message */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-[#EBEEF5] mb-0.5 font-inter">
                Gift message (Optional)
              </label>
              <textarea
                name="giftMessage"
                value={formData.giftMessage}
                onChange={handleInputChange}
                placeholder="Message"
                rows={2}
                className="w-full px-2 py-1.5 border border-gray-300 dark:border-[#2F2F2F] dark:bg-[#121413] dark:text-[#C9CACC] dark:placeholder-[#C9CACC] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent resize-none font-inter text-[14px]"
              />
            </div>
          </div>
          {/* Continue Button */}
          <div className="flex justify-end mt-2">
            <button
              onClick={handleContinue}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-md font-semibold transition-colors duration-200 font-inter w-full sm:w-auto text-[14px]"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftTransferPage;