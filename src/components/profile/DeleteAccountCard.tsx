import React from 'react';
import { ChevronLeft, Trash2, MessageCircle, AlertTriangle } from 'lucide-react';

export default function DeleteAccountPage() {
  const handleDeleteAccount = () => {
    // Handle account deletion logic here
    console.log('Account deletion requested');
  };

  const handleChatWithUs = () => {
    // Handle chat support logic here
    console.log('Chat support requested');
  };

  const handleGoBack = () => {
    // Handle navigation back
    console.log('Navigate back');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button 
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span className="text-xl font-semibold text-gray-900">Delete Account</span>
          </button>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Trash Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
          </div>

          {/* Main Message */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Your about to delete your account
            </h1>
            <p className="text-gray-600">
              This action cannot be undone
            </p>
          </div>

          {/* Warning Box */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-orange-800 mb-2">
                  This is extremely important
                </h3>
                <p className="text-orange-700 text-sm leading-relaxed">
                  Deleting your account will permanently remove your profile, linked bank accounts, and all trading 
                  history. However, your past trades, statements, and tax documents may still be retained for 
                  regulatory purposes.
                </p>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="flex items-center justify-between py-4 border-t border-gray-200 mb-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Need help? Chat with us now!
              </h3>
            </div>
            <button
              onClick={handleChatWithUs}
              className="flex items-center px-4 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat with us
            </button>
          </div>

          {/* Note Section */}
          <div className="border-t border-gray-200 pt-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-2">Note:</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Once your account is successfully deleted, you will not be able to create a new account 
              using the same details for the next 180 days.
            </p>
          </div>

          {/* Delete Button */}
          <div className="flex justify-end">
            <button
              onClick={handleDeleteAccount}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
            >
              Delete account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}