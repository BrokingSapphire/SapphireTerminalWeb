'use client';

import React, { useState } from 'react';
import { Switch } from '../ui/switch';

interface DerivativeOption {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  hasCheckmark?: boolean;
}

const DerivativeTrading: React.FC = () => {
  const [derivatives, setDerivatives] = useState<DerivativeOption[]>([
    {
      id: 'cash-mutual-funds',
      title: 'Cash/Mutual Funds',
      description: 'Get access to derivative trading',
      enabled: false,
      hasCheckmark: false
    },
    {
      id: 'future-option',
      title: 'Future and Option',
      description: 'Get access to derivative trading',
      enabled: true,
      hasCheckmark: true
    },
    {
      id: 'debt',
      title: 'Debt',
      description: 'Get access to derivative trading',
      enabled: false,
      hasCheckmark: false
    },
    {
      id: 'commodity-derivatives',
      title: 'Commodity Derivatives',
      description: 'Get access to derivative trading',
      enabled: false,
      hasCheckmark: false
    },
    {
      id: 'currency',
      title: 'Currency',
      description: 'Get access to derivative trading',
      enabled: false,
      hasCheckmark: false
    }
  ]);

  const handleToggle = (id: string) => {
    setDerivatives(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, enabled: !item.enabled, hasCheckmark: !item.enabled }
          : item
      )
    );
  };

  return (
    <div 
      className="bg-[#F8F8FB] dark:bg-[#121413] border border-gray-300 w-full mt-0 mb-0"
      style={{
        // Remove height property so the box grows with content
        borderRadius: '4px',
        borderWidth: '1px',
        paddingLeft: '16px',
        paddingRight: '16px',
        opacity: 1
      }}
    >
      {derivatives.map((item, index) => (
        <div 
          key={item.id} 
          className={`flex items-center justify-between w-full ${
            index < derivatives.length - 1 ? 'border-b' : ''
          }`}
          style={{
            height: '52px',
            justifyContent: 'space-between',
            opacity: 1,
            borderBottomWidth: index < derivatives.length - 1 ? '1px' : '0px',
            borderBottomColor: '#D1D5DB',
            padding: '10px 0'
          }}
        >
          <div className="flex-1 min-w-0">
            <div className="flex flex-col justify-center">
              <span 
                className="font-medium text-gray-900 dark:text-white text-[14px] leading-[20px] truncate"
                style={{
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#1A1A1A',
                  fontWeight: 500,
                  letterSpacing: '-0.43px',
                  fontFamily: 'Inter',
                  ...(typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? { color: '#c9cacc' } : {})
                }}
              >
                {item.title}
              </span>
              <span 
                className="text-gray-500 dark:text-[#c9cacc] text-[12px] leading-[16px] mt-1"
                style={{
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: '#6B7280',
                  fontWeight: 400,
                  fontFamily: 'Inter',
                  marginTop: '4px',
                  marginBottom: '0px'
                }}
              >
                {item.description}
              </span>
            </div>
          </div>
          <div className="ml-3 flex-shrink-0">
            <Switch 
              checked={item.enabled}
              onCheckedChange={() => handleToggle(item.id)}
              className="data-[state=checked]:bg-[#1DB954] scale-100"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DerivativeTrading;