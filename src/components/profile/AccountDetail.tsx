import React from 'react';
import { Plus } from 'lucide-react';

const BankAccountInterface = () => {
  return (
    <div className="w-full">
      <div 
        className="rounded-lg w-full"
        style={{
          background: '#F8F8FB',
          border: '1px solid #D1D5DB',
          boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.06), 0px 0px 4px rgba(0, 0, 0, 0.04)',
          borderRadius: '8px',
          padding: '24px'
        }}
      >
        {/* Inner container for bank accounts */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
          style={{
            gap: '32px'
          }}
        >
          {/* Bank of Baroda */}
          <div 
            className="bg-white rounded-lg border border-gray-200 relative w-full"
            style={{
              borderRadius: '8px',
              borderWidth: '1px',
              padding: '16px',
              minHeight: '131px'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded flex items-center justify-center overflow-hidden">
                  <img 
                    src="/bank-logos/BOB.png" 
                    alt="Bank of Baroda" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.nextSibling) {
                        (target.nextSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  <div className="w-full h-full bg-orange-500 rounded hidden items-center justify-center">
                    <span className="text-white text-xs font-bold">BoB</span>
                  </div>
                </div>
                <div>
                  <span 
                    className="text-gray-900"
                    style={{
                      width: '172px',
                      height: '19px',
                      opacity: 1,
                      fontFamily: 'Inter',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '16px',
                      lineHeight: '100%',
                      letterSpacing: '0%'
                    }}
                  >
                    Bank of Baroda - 8639
                  </span>
                  <span className="ml-2 bg-orange-100 text-orange-600 px-2 py-0.5 rounded text-xs font-medium">
                    Primary
                  </span>
                </div>
              </div>
              <div className="text-gray-400 cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="3" r="1.5" fill="currentColor"/>
                  <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                  <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
                </svg>
              </div>
            </div>

            {/* Account details */}
            <div className="space-y-2 ml-12">
              <div className="flex justify-between">
                <span 
                  className="text-gray-600"
                  style={{
                    width: '75px',
                    height: '15px',
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%'
                  }}
                >
                  A/c Number :
                </span>
                <span 
                  className="text-gray-900"
                  style={{
                    width: '105px',
                    height: '15px',
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    textAlign: 'right'
                  }}
                >
                  78888832882
                </span>
              </div>
              <div className="flex justify-between">
                <span 
                  className="text-gray-600"
                  style={{
                    width: '75px',
                    height: '15px',
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%'
                  }}
                >
                  IFS Code :
                </span>
                <span 
                  className="text-gray-900"
                  style={{
                    width: '105px',
                    height: '15px',
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    textAlign: 'right'
                  }}
                >
                  BARBOMANEWA
                </span>
              </div>
              <div className="flex justify-between">
                <span 
                  className="text-gray-600"
                  style={{
                    width: '75px',
                    height: '15px',
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%'
                  }}
                >
                  Branch :
                </span>
                <span 
                  className="text-gray-900"
                  style={{
                    width: '105px',
                    height: '15px',
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    textAlign: 'right'
                  }}
                >
                  Manewada
                </span>
              </div>
            </div>
          </div>

          {/* IDFC Bank */}
          <div 
            className="bg-white rounded-lg border border-gray-200 relative w-full"
            style={{
              borderRadius: '8px',
              borderWidth: '1px',
              padding: '16px',
              minHeight: '131px'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded flex items-center justify-center overflow-hidden">
                  <img 
                    src="/bank-logos/IDFC.png" 
                    alt="IDFC Bank" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.nextSibling) {
                        (target.nextSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  <div className="w-full h-full bg-red-600 rounded hidden items-center justify-center">
                    <span className="text-white text-xs font-bold">IDFC</span>
                  </div>
                </div>
                <span 
                  className="text-gray-900"
                  style={{
                    width: '172px',
                    height: '19px',
                    opacity: 1,
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontSize: '16px',
                    lineHeight: '100%',
                    letterSpacing: '0%'
                  }}
                >
                  IDFC Bank- 8639
                </span>
              </div>
              <div className="text-gray-400 cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="3" r="1.5" fill="currentColor"/>
                  <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                  <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
                </svg>
              </div>
            </div>

            {/* Account details */}
            <div className="space-y-2 ml-12">
              <div className="flex justify-between">
                <span 
                  className="text-gray-600"
                  style={{
                    width: '75px',
                    height: '15px',
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%'
                  }}
                >
                  A/c Number :
                </span>
                <span 
                  className="text-gray-900"
                  style={{
                    width: '105px',
                    height: '15px',
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    textAlign: 'right'
                  }}
                >
                  78888832882
                </span>
              </div>
              <div className="flex justify-between">
                <span 
                  className="text-gray-600"
                  style={{
                    width: '75px',
                    height: '15px',
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%'
                  }}
                >
                  IFS Code :
                </span>
                <span 
                  className="text-gray-900"
                  style={{
                    width: '105px',
                    height: '15px',
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    textAlign: 'right'
                  }}
                >
                  BARBOMANEWA
                </span>
              </div>
              <div className="flex justify-between">
                <span 
                  className="text-gray-600"
                  style={{
                    width: '75px',
                    height: '15px',
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%'
                  }}
                >
                  Branch :
                </span>
                <span 
                  className="text-gray-900"
                  style={{
                    width: '105px',
                    height: '15px',
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    textAlign: 'right'
                  }}
                >
                  Manewada
                </span>
              </div>
            </div>
          </div>

          {/* Yes Bank */}
          <div 
            className="bg-white rounded-lg border border-gray-200 relative w-full"
            style={{
              borderRadius: '8px',
              borderWidth: '1px',
              padding: '16px',
              minHeight: '131px'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded flex items-center justify-center overflow-hidden">
                  <img 
                    src="/bank-logos/Yes.png" 
                    alt="Yes Bank" 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      if (target.nextSibling) {
                        (target.nextSibling as HTMLElement).style.display = 'flex';
                      }
                    }}
                  />
                  <div className="w-full h-full bg-red-600 rounded hidden items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.5 4.5L6 12L2.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <span 
                  className="text-gray-900"
                  style={{
                    width: '172px',
                    height: '19px',
                    opacity: 1,
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontStyle: 'normal',
                    fontSize: '16px',
                    lineHeight: '100%',
                    letterSpacing: '0%'
                  }}
                >
                  Yes Bank - 8639
                </span>
              </div>
              <div className="text-gray-400 cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="3" r="1.5" fill="currentColor"/>
                  <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
                  <circle cx="8" cy="13" r="1.5" fill="currentColor"/>
                </svg>
              </div>
            </div>

            {/* Account details */}
            <div className="space-y-2 ml-12">
              <div className="flex">
                <span 
                  className="text-gray-600"
                  style={{
                    width: '75px',
                    height: '15px',
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%'
                  }}
                >
                  A/c Number :
                </span>
                <span 
                  className="text-gray-900 ml-auto"
                  style={{
                    width: '105px',
                    height: '15px',
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    textAlign: 'right'
                  }}
                >
                  78888832882
                </span>
              </div>
              <div className="flex">
                <span 
                  className="text-gray-600"
                  style={{
                    width: '75px',
                    height: '15px',
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%'
                  }}
                >
                  IFS Code :
                </span>
                <span 
                  className="text-gray-900 ml-auto"
                  style={{
                    width: '105px',
                    height: '15px',
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    textAlign: 'right'
                  }}
                >
                  BARBOMANEWA
                </span>
              </div>
              <div className="flex">
                <span 
                  className="text-gray-600"
                  style={{
                    width: '75px',
                    height: '15px',
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%'
                  }}
                >
                  Branch :
                </span>
                <span 
                  className="text-gray-900 ml-auto"
                  style={{
                    width: '105px',
                    height: '15px',
                    fontFamily: 'Inter',
                    fontWeight: 400,
                    fontSize: '12px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    textAlign: 'right'
                  }}
                >
                  Manewada
                </span>
              </div>
            </div>
          </div>

          {/* Empty fourth slot */}
          <div></div>
        </div>

        {/* Add Bank Account button */}
        <div className="flex items-center mt-4 w-full pt-4 pb-4 pl-1">
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
            <div className="w-5 h-5 rounded-full border-2 border-blue-600 flex items-center justify-center">
              <Plus size={12} />
            </div>
            <span className="font-medium text-sm">Add Bank Account</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankAccountInterface;