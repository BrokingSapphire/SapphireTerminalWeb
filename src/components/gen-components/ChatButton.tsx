// components/ChatButton.tsx 
'use client';

import React from 'react';

interface ChatButtonProps {
  onClick?: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        width: '135px',
        height: '33px',
        borderRadius: '23030px',
        border: '1px solid #0472EC',
        gap: '6px',
        transform: 'rotate(0deg)',
        opacity: 1,
        padding: '8px',
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxSizing: 'border-box',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
        (e.target as HTMLButtonElement).style.backgroundColor = '#F0F8FF';
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
        (e.target as HTMLButtonElement).style.backgroundColor = 'transparent';
      }}
    >
      {/* Headphone Icon */}
      <img 
        src="/chaticon.png"
        alt="Headphone"
        style={{
          width: '16px',
          height: '16px',
          flexShrink: 0
        }}
      />
      
      {/* Text */}
      <span
        style={{
          width: '83px',
          height: '17px',
          transform: 'rotate(0deg)',
          opacity: 1,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          fontStyle: 'normal',
          fontSize: '14px',
          lineHeight: '100%',
          letterSpacing: '0%',
          color: '#0472EC',
          whiteSpace: 'nowrap',
          textAlign: 'center'
        }}
      >
        Chat with us
      </span>
    </button>
  );
};

export default ChatButton;