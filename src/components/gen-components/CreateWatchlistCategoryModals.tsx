import React, { useState } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface CreateWatchlistCategoryModalsProps {
  showWatchlistModal: boolean;
  setShowWatchlistModal: (open: boolean) => void;
  showCategoryModal: boolean;
  setShowCategoryModal: (open: boolean) => void;
  onCreateCategory?: (name: string) => void;
  onCreateWatchlist?: (name: string) => void;
}

export const CreateWatchlistModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (name: string) => void;
}> = ({ isOpen, onClose, onCreate }) => {
  const [watchlistName, setWatchlistName] = useState('');
  const maxLength = 15;

  const handleCreate = () => {
    if (watchlistName.trim()) {
      onCreate?.(watchlistName);
      setWatchlistName('');
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setWatchlistName(value);
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[999999] p-4"
      style={{ 
        zIndex: 999999,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'auto'
      }}
    >
      <div className="bg-white rounded-lg shadow-md max-w-xs w-full mx-auto relative z-[999999]">
        {/* Header */}
        <div className="bg-[#EAF4F4] px-6 py-4 rounded-t-lg flex items-center justify-between border-b border-gray-200">
          <h2 className="text-[16px] font-medium text-[#1A1A1A]">Create Watchlist</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {/* Form */}
        <div className="py-3 px-4 space-y-3">
          <div>
            <label className="pt-2 block text-xs font-medium text-gray-700 mb-1">
              Enter Watchlist Name
            </label>
            <input
              type="text"
              value={watchlistName}
              onChange={handleInputChange}
              onKeyDown={e => { if (e.key === 'Enter' && watchlistName.trim()) handleCreate(); }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              placeholder="Enter watchlist name..."
              maxLength={maxLength}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {watchlistName.length}/{maxLength}
            </div>
          </div>
          <button
            onClick={handleCreate}
            disabled={!watchlistName.trim()}
            className={`w-full py-3 text-white font-semibold text-sm rounded-lg transition-all duration-200 bg-[#1DB954] hover:bg-[#00B649] disabled:cursor-not-allowed disabled:opacity-70`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export const CreateCategoryModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCreate?: (name: string) => void;
}> = ({ isOpen, onClose, onCreate }) => {
  const [categoryName, setCategoryName] = useState('');
  const maxLength = 50;

  const handleCreate = () => {
    if (categoryName.trim()) {
      onCreate?.(categoryName);
      setCategoryName('');
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setCategoryName(value);
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-[999999] p-4"
      style={{ 
        zIndex: 999999,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'auto'
      }}
    >
      <div className="bg-white rounded-lg shadow-md max-w-xs w-full mx-auto relative z-[999999]">
        {/* Header */}
        <div className="bg-[#EAF4F4] px-6 py-4 rounded-t-lg flex items-center justify-between border-b border-gray-200">
          <h2 className="text-[16px]] font-medium text-[#1A1A1A]">Create Category</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {/* Form */}
        <div className="py-3 px-4 space-y-3">
          <div>
            <label className="pt-2 block text-xs font-medium text-gray-700 mb-1">
              Enter Category Name
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={handleInputChange}
              onKeyDown={e => { if (e.key === 'Enter' && categoryName.trim()) handleCreate(); }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              placeholder="Enter category name..."
              maxLength={maxLength}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {categoryName.length}/{maxLength}
            </div>
          </div>
          <button
            onClick={handleCreate}
            disabled={!categoryName.trim()}
            className={`w-full py-3 text-white font-semibold text-sm rounded-lg transition-all duration-200 bg-[#1DB954] hover:bg-[#00B649] disabled:cursor-not-allowed disabled:opacity-70`}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

const CreateWatchlistCategoryModals: React.FC<CreateWatchlistCategoryModalsProps> = ({
  showWatchlistModal,
  setShowWatchlistModal,
  showCategoryModal,
  setShowCategoryModal,
  onCreateCategory,
  onCreateWatchlist,
}) => {
  return (
    <>
      <CreateWatchlistModal
        isOpen={showWatchlistModal}
        onClose={() => setShowWatchlistModal(false)}
        onCreate={onCreateWatchlist}
      />
      <CreateCategoryModal
        isOpen={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        onCreate={onCreateCategory}
      />
    </>
  );
};

export default CreateWatchlistCategoryModals; 