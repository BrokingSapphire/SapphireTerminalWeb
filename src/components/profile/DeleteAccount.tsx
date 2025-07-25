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
    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#121212] rounded-lg shadow-lg flex flex-col">
        {/* Header */}
        <div className="px-6 pt-6 pb-2 border-b border-gray-200 dark:border-[#2F2F2F]">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-[#EBEEF5]">Delete Account</h2>
          <p className="text-sm text-gray-500 dark:text-[#A0AEC0] mt-1">Let us know why you are leaving, so we can improve our app for all investors</p>
        </div>
        {/* Checkbox section */}
        <div className="flex-1 px-6 py-4 overflow-y-auto flex flex-col gap-3">
          {checkboxes.map((checkbox) => (
            <label key={checkbox.id} className="flex items-start gap-3 cursor-pointer select-none">
              <Checkbox
                id={checkbox.id}
                checked={checkbox.checked}
                onCheckedChange={() => handleCheckboxChange(checkbox.id)}
              />
              <span className="text-sm text-gray-700 dark:text-[#A0AEC0] font-normal">{checkbox.label}</span>
            </label>
          ))}
        </div>
        {/* Buttons */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-[#2F2F2F] bg-gray-50 dark:bg-[#232323] rounded-b-lg">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded border border-gray-300 dark:border-[#2F2F2F] text-gray-700 dark:text-[#EBEEF5] bg-white dark:bg-[#121212] font-medium hover:bg-gray-100 dark:hover:bg-[#232323] transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-[#E53935] text-white font-medium hover:bg-[#DC2626] transition"
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
      {/* Desktop Layout (Original Design) */}
      <div className="hidden sm:block w-full">
        <div 
          className="w-full"
          style={{
            height: '430px',
            borderRadius: '4px',
            border: `0.5px solid ${typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#2F2F2F' : '#D1D5DB'}`,
            boxShadow: '0px 4px 16px 0px #0000000F, 0px 0px 4px 0px #0000000A',
            transform: 'rotate(0deg)',
            opacity: 1,
            padding: '16px',
            backgroundColor: typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#121212' : '#FFFFFF',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
              <h2 
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#EBEEF5' : '#1A1A1A',
                  textAlign: 'center',
                  margin: 0,
                  lineHeight: '1.2',
                  fontFamily: 'inter'
                }}
              >
                Your about to delete your account
              </h2>
              <p 
                style={{
                  fontSize: '14px',
                  color: typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#A0AEC0' : '#6B7280',
                  textAlign: 'center',
                  margin: 0,
                  lineHeight: '1.4',
                  fontFamily: 'inherit'
                }}
              >
                This action cannot be undone
              </p>
            </div>

            {/* Warning Box */}
            <div 
              className="w-full"
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
                backgroundColor: typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#232323' : '#FEF7EC',
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
                <p 
                  style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#F87171' : '#C73C0D',
                    marginBottom: '4px',
                    lineHeight: '1.4',
                    fontFamily: 'inter',
                    margin: 0
                  }}
                >
                  This is extremely important
                </p>
                <p 
                  style={{
                    fontSize: '12px',
                    color: typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#FDBA74' : '#AD411C',
                    lineHeight: '1.4',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '400',
                    margin: 0
                  }}
                >
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
              <span 
                style={{
                  fontSize: '16px',
                  color: typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#EBEEF5' : '#1A1A1A',
                  fontWeight: '500',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Need help? Chat with us now!
              </span>
              
              {/* Custom Chat Button */}
              <ChatButton onClick={onChatClick} />
            </div>

            {/* Partition Line */}
            <div 
              className="w-full"
              style={{
                height: '0px',
                border: `1px solid ${typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#2F2F2F' : '#D1D5DB'}`,
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
              <p 
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#EBEEF5' : '#111827',
                  gap: '4px',
                  fontFamily: 'inter',
                  margin: 0
                }}
              >
                Note:
              </p>
              <p 
                style={{
                  fontSize: '14px',
                  color: typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? '#A0AEC0' : '#6B7280',
                  lineHeight: '1.4',
                  margin: 0,
                  fontWeight: '400',
                  fontFamily: 'inter'
                }}
              >
                Once your account is successfully deleted, you will not be able to create a new account using the same details for the next 180 days.
              </p>
            </div>

            {/* Delete Button Section */}
            <div 
              className="w-full"
              style={{
                height: '41px',
                gap: '184px',
                transform: 'rotate(0deg)',
                opacity: 1,
                position: 'absolute',
                top: '360px',
                left: '0px',
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              <button
                onClick={handleDeleteClick}
                style={{
                  backgroundColor: '#E53935',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  fontFamily: 'inter'
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#DC2626';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  (e.target as HTMLButtonElement).style.backgroundColor = '#E53935';
                }}
              >
                Delete account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout (Responsive Design) */}
      <div className="block sm:hidden w-full max-w-2xl mx-auto bg-white dark:bg-[#121212] rounded-lg border border-gray-200 dark:border-[#2F2F2F] shadow-lg p-4">
        <div className="flex flex-col items-center gap-6">
          {/* Icon */}
          <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
            <img 
              src="/dustbin.png" 
              alt="Delete Icon" 
              className="w-7 h-7"
            />
          </div>

          {/* Title Section */}
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-[#EBEEF5] mb-2">
              Your about to delete your account
            </h2>
            <p className="text-sm text-gray-500 dark:text-[#A0AEC0]">
              This action cannot be undone
            </p>
          </div>

          {/* Warning Box */}
          <div className="w-full bg-orange-50 dark:bg-[#232323] border border-orange-200 dark:border-[#2F2F2F] rounded-lg p-4">
            <div className="flex gap-3">
              <img 
                src="/warning.png" 
                alt="Warning Icon" 
                className="w-4 h-4 mt-0.5 flex-shrink-0"
              />
              <div>
                <p className="text-sm font-semibold text-orange-800 dark:text-[#F87171] mb-2">
                  This is extremely important
                </p>
                <p className="text-sm text-orange-700 dark:text-[#FDBA74] leading-relaxed">
                  Deleting your account will permanently remove your profile, linked bank accounts, and all trading history. However, your past trades, statements, and tax documents may still be retained for regulatory purposes.
                </p>
              </div>
            </div>
          </div>

          {/* Chat Support Section */}
          <div className="w-full flex items-center justify-between">
            <span className="text-base font-medium text-gray-900 dark:text-[#EBEEF5]">
              Need help? Chat with us now!
            </span>
            <ChatButton onClick={onChatClick} />
          </div>

          {/* Divider */}
          <div className="w-full border-t border-gray-200 dark:border-[#2F2F2F]" />

          {/* Note Section */}
          <div className="w-full">
            <p className="text-base font-semibold text-gray-900 dark:text-[#EBEEF5] mb-2">
              Note:
            </p>
            <p className="text-sm text-gray-500 dark:text-[#A0AEC0] leading-relaxed">
              Once your account is successfully deleted, you will not be able to create a new account using the same details for the next 180 days.
            </p>
          </div>

          {/* Delete Button */}
          <div className="w-full flex justify-end">
            <button
              onClick={handleDeleteClick}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
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