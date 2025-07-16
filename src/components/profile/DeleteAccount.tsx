'use client';

import React, { useState } from 'react';
import ChatButton from '../gen-components/ChatButton';

// Simple Checkbox component since we don't have the UI library
const Checkbox = ({ checked, onCheckedChange, id }: { 
  checked: boolean; 
  onCheckedChange: () => void; 
  id: string;
}) => (
  <input
    type="checkbox"
    id={id}
    checked={checked}
    onChange={onCheckedChange}
    className="w-3.5 h-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-[#2f2f2f] dark:bg-[#181A20]"
  />
);

// Delete Account Popup Component
interface CheckboxOption {
  id: string;
  label: string;
  checked: boolean;
}

const DeleteAccountPopup: React.FC<{ onClose: () => void; onConfirmDelete: () => void }> = ({
  onClose,
  onConfirmDelete
}) => {
  const [checkboxes, setCheckboxes] = useState<CheckboxOption[]>([
    { id: 'complicated', label: 'I find investing too complicated.', checked: false },
    { id: 'not-helpful', label: 'The app is not helpful for my trading or investment needs.', checked: false },
    { id: 'accidental', label: 'I accidentally created this accounts.', checked: false },
    { id: 'dont-understand', label: "I don't understand how to use the app.", checked: false },
    { id: 'safety-concerns', label: 'I have concerns about the safety or privacy of my information.', checked: false },
    { id: 'too-many-messages', label: 'I receive too many messages or notifications.', checked: false },
    { id: 'too-much-time', label: "I'm spending too much time checking the markets.", checked: false },
    { id: 'other', label: 'Other', checked: false }
  ]);

  const handleCheckboxChange = (id: string) => {
    setCheckboxes(prev => 
      prev.map(checkbox => 
        checkbox.id === id 
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  const handleCancel = () => {
    onClose();
  };

  const handleDelete = () => {
    const selectedReasons = checkboxes.filter(cb => cb.checked).map(cb => cb.label);
    console.log('Delete account confirmed with reasons:', selectedReasons);
    onConfirmDelete();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
    >
      <div style={{ position: 'relative' }}>
        {/* Main popup container */}
        <div 
          className="bg-white dark:bg-[#121413] border border-gray-300 dark:border-[#2f2f2f]"
          style={{
            borderRadius: '4px 4px 0 0',
            borderBottom: 'none',
            padding: '15px',
            width: '436px',
            height: '400px',
            boxSizing: 'border-box'
          }}
        >
          {/* Outer div */}
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '404px',
              height: '393px',
              gap: '26px'
            }}
          >
            {/* Header section */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '404px',
                height: '57px',
                gap: '4px'
              }}
            >
              <h2 className="text-[#111827] dark:text-[#ebeef5]" style={{ fontSize: '15px', fontWeight: '600', margin: 0, fontFamily: 'inter' }}>
                Delete Account
              </h2>
              <p className="text-[#6B7280] dark:text-[#c9cacc]" style={{ fontSize: '12px', margin: 0, lineHeight: '1.4', fontFamily: 'inter' }}>
                Let us know why you are leaving, so we can improve our app for all investors
              </p>
            </div>
            {/* Checkbox section */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '404px',
                height: '286px',
                gap: '12px'
              }}
            >
              {checkboxes.map((checkbox) => (
                <div key={checkbox.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <Checkbox
                    id={checkbox.id}
                    checked={checkbox.checked}
                    onCheckedChange={() => handleCheckboxChange(checkbox.id)}
                  />
                  <label
                    htmlFor={checkbox.id}
                    onClick={() => handleCheckboxChange(checkbox.id)}
                    className="text-[#6B7280] dark:text-[#c9cacc] text-xs"
                    style={{  
                      fontSize: '11px',
                      lineHeight: '1.3',
                      cursor: 'pointer',
                      flex: 1,
                      fontWeight:'400',
                      fontFamily: 'inter'
                    }}
                  >
                    {checkbox.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Button container */}
        <div 
          className="bg-[#F8F8FB] dark:bg-[#181A20] border border-gray-300 dark:border-[#2f2f2f]"
          style={{
            borderTop: 'none',
            borderRadius: '0 0 4px 4px',
            padding: '12px',
            width: '436px',
            height: '57px',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '12px',
            position: 'absolute',
            bottom: '-57px',
            left: 0
          }}
        >
          <button
            onClick={handleCancel}
            className="border border-[#D1D5DB] dark:border-[#2f2f2f] text-[#374151] dark:text-[#c9cacc] bg-transparent dark:bg-[#181A20] text-xs"
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '11px',
              cursor: 'pointer',
              fontWeight: '500',
              fontFamily: 'inter'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-[#E53935] border border-[#E53935] text-white dark:bg-[#E53935] dark:border-[#E53935] dark:text-white text-xs"
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '11px',
              cursor: 'pointer',
              fontWeight: '500',
              fontFamily: 'inter'
            }}
          >
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Account Deletion Dialog Component
interface AccountDeletionDialogProps {
  onChatClick?: () => void;
  onDeleteClick?: () => void;
}

const AccountDeletionDialog: React.FC<AccountDeletionDialogProps> = ({
  onChatClick,
  onDeleteClick
}) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleDeleteClick = () => {
    setShowDeletePopup(true);
  };

  const handleClosePopup = () => {
    setShowDeletePopup(false);
  };

  const handleConfirmDelete = () => {
    // Close popup first
    setShowDeletePopup(false);
    // Then call the original onDeleteClick if provided
    if (onDeleteClick) {
      onDeleteClick();
    }
    // Add your actual account deletion logic here
    console.log('Account deletion confirmed');
  };

  return (
    <>
      <div 
        className="w-full bg-white dark:bg-[#121413] border border-gray-300 dark:border-[#2f2f2f]"
        style={{
          height: '430px',
          borderRadius: '4px',
          boxShadow: '0px 4px 16px 0px #0000000F, 0px 0px 4px 0px #0000000A',
          transform: 'rotate(0deg)',
          opacity: 1,
          padding: '16px',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif',
          boxSizing: 'border-box'
        }}
      >
        <div 
          className="w-full"
          style={{
            height: '390px',
            gap: '18px',
            transform: 'rotate(0deg)',
            opacity: 1,
            position: 'relative'
          }}
        >
          {/* Lock Icon */}
          <div 
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '55px',
              height: '55px',
              borderRadius: '50%',
              backgroundColor: '#FEE2E2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img 
              src="/dustbin.png" 
              alt="Delete Icon" 
              style={{
                width: '29px',
                height: '29px'
              }}
            />
          </div>
          {/* Title Section */}
          <div 
            className="w-full"
            style={{
              height: '30px',
              gap: '4px',
              transform: 'rotate(0deg)',
              opacity: 1,
              position: 'absolute',
              top: '80px',
              left: '0px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <h2 className="text-[#1A1A1A] dark:text-[#ebeef5]" style={{ fontSize: '16px', fontWeight: '600', textAlign: 'center', margin: 0, lineHeight: '1.2', fontFamily: 'inter' }}>
              Your about to delete your account
            </h2>
            <p className="text-[#6B7280] dark:text-[#c9cacc]" style={{ fontSize: '14px', textAlign: 'center', margin: 0, lineHeight: '1.4', fontFamily: 'inherit' }}>
              This action cannot be undone
            </p>
          </div>
          {/* Warning Box */}
          <div 
            className="w-full bg-[#FEF7EC] dark:bg-[#181A20] border dark:border-[#2f2f2f]"
            style={{
              height: '73px',
              borderRadius: '6px',
              gap: '8px',
              transform: 'rotate(0deg)',
              opacity: 1,
              padding: '12px',
              position: 'absolute',
              top: '140px',
              left: '0px',
              display: 'flex',
              alignItems: 'flex-start',
              boxSizing: 'border-box'
            }}
          >
            {/* Warning Icon */}
            <div 
              style={{
                width: '16px',
                height: '14px',
                marginTop: ' 1px',
                flexShrink: 0
              }}
            >
              <img 
                src="/warning.png" 
                alt="Warning Icon" 
                style={{
                  width: '16px',
                  height: '14px'
                }}
              />
            </div>
            {/* Warning Text */}
            <div style={{ marginLeft: '1px' }}>
              <p className="text-[#C73C0D] dark:text-[#ffb380]" style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px', lineHeight: '1.4', fontFamily: 'inter', margin: 0 }}>
                This is extremely important
              </p>
              <p className="text-[#AD411C] dark:text-[#ffb380]" style={{ fontSize: '12px', lineHeight: '1.4', fontFamily: 'Inter, sans-serif', fontWeight: '400', margin: 0 }}>
                Deleting your account will permanently remove your profile, linked bank accounts, and all trading history. However, your past trades, statements, and tax documents may still be retained for regulatory purposes.
              </p>
            </div>
          </div>
          {/* Chat Support Section */}
          <div 
            className="w-full"
            style={{
              height: '30px',
              gap: '4px',
              transform: 'rotate(0deg)',
              opacity: 1,
              position: 'absolute',
              top: '241px',
              left: '0px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <span className="text-[#1A1A1A] dark:text-[#ebeef5]" style={{ fontSize: '16px', fontWeight: '500', fontFamily: 'Inter, sans-serif' }}>
              Need help? Chat with us now!
            </span>
            {/* Custom Chat Button */}
            <ChatButton onClick={onChatClick} />
          </div>
          {/* Partition Line */}
          <div 
            className="w-full border border-[#D1D5DB] dark:border-[#2f2f2f]"
            style={{
              height: '0px',
              transform: 'rotate(0deg)',
              opacity: 1,
              position: 'absolute',
              top: '291px',
              left: '0px'
            }}
          />
          {/* Note Section */}
          <div 
            className="w-full"
            style={{
              height: '40px',
              gap: '4px',
              transform: 'rotate(0deg)',
              opacity: 1,
              position: 'absolute',
              top: '301px',
              left: '0px'
            }}
          >
            <p className="text-[#111827] dark:text-[#ebeef5]" style={{ fontSize: '16px', fontWeight: '600', gap: '4px', fontFamily: 'inter', margin: 0 }}>
              Note:
            </p>
            <p className="text-[#6B7280] dark:text-[#c9cacc]" style={{ fontSize: '14px', lineHeight: '1.4', margin: 0, fontWeight: '400', fontFamily: 'inter' }}>
              Once your account is successfully deleted, you will not be able to create a new account using the same details for the next 180 days.
            </p>
          </div>
          {/* Delete Button Section */}
          <div 
            className="w-full flex justify-end items-center"
            style={{
              height: '41px',
              gap: '184px',
              transform: 'rotate(0deg)',
              opacity: 1,
              position: 'absolute',
              top: '360px',
              left: '0px'
            }}
          >
            <button
              onClick={handleDeleteClick}
              className="bg-[#E53935] text-white dark:bg-[#E53935] dark:text-white rounded-[6px] px-5 py-2 text-[14px] font-medium hover:bg-[#DC2626] transition-colors"
              style={{
                border: 'none',
                fontFamily: 'inter'
              }}
            >
              Delete account
            </button>
          </div>
        </div>
      </div>
      {/* Delete Account Popup */}
      {showDeletePopup && (
        <DeleteAccountPopup 
          onClose={handleClosePopup}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default AccountDeletionDialog;