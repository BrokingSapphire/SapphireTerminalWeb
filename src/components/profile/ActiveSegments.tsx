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
      className="bg-[#F8F8FB] dark:bg-[#121413] border border-gray-300 w-full"
      style={{
        height: '340px',
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
            height: '69px',
            justifyContent: 'space-between',
            opacity: 1,
            borderBottomWidth: index < derivatives.length - 1 ? '1px' : '0px',
            borderBottomColor: '#D1D5DB',
            padding: '12px'
          }}
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 
                className="font-normal text-gray-900 dark:text-white truncate"
                style={{
                  fontSize: '16px',
                  lineHeight: '100%',
                  color: '#1A1A1A',
                  fontWeight: 400,
                  letterSpacing: '-0.43px',
                  fontFamily: 'Inter',
                  ...(typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? { color: '#c9cacc' } : {})
                }}
              >
                {item.title}
              </h3>
              {item.enabled && (
                <div 
                  className="bg-green-500 rounded-full flex items-center justify-center"
                  style={{
                    width: '12px',
                    height: '12px'
                  }}
                >
                  <svg 
                    className="text-white" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    style={{
                      width: '8px',
                      height: '8px'
                    }}
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
              )}
            </div>
            <p 
              className="text-gray-500 dark:text-[#c9cacc]"
              style={{
                fontSize: '12px',
                lineHeight: '100%',
                color: '#6B7280',
                fontWeight: 400,
                fontFamily: 'Inter',
                marginTop: '12px'
              }}
            >
              {item.description}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <Switch 
              checked={item.enabled}
              onCheckedChange={() => handleToggle(item.id)}
              className="data-[state=checked]:bg-[#1DB954]"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DerivativeTrading;