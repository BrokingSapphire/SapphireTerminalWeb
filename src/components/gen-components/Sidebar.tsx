"use client";
import React, { useState } from 'react';
import {
  createWatchlist,
  getAllWatchlists,
  updateWatchlistPosition,
  updateWatchlistName,
  deleteWatchlist,
  createCategory,
  getAllCategories,
  updateCategoryPosition,
  updateCategoryName,
  deleteCategory
} from '../../utils/watchlistApi';
import { Search, Filter, Plus, ChevronUp, ChevronDown, Edit2, Layers, Link, TrendingUp, Trash2, ChevronRight } from 'lucide-react';
import MarketDepth from './MarketDepth';
import CreateWatchlistCategoryModals from './CreateWatchlistCategoryModals';
import { initialWatchlistNames, initialCategories } from '../../constants/sidebar-data';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  rectSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Stock {
  id: string;
  name: string;
  symbol: string;
  exchange: string;
  price: number;
  change: number;
  changePercent: number;
  logo?: React.ReactNode;
}

interface Category {
  id: string;
  name: string;
  watchlists: Stock[];
}

const Sidebar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(3);
  const [expandedCategories, setExpandedCategories] = useState<{ [id: string]: boolean }>({});
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [openDepthId, setOpenDepthId] = useState<string | null>(null);
  const [showPopover, setShowPopover] = useState(false);
  const [showWatchlistModal, setShowWatchlistModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  // Track a pending watchlist ID for immediate category creation after watchlist creation
  const [pendingWatchlistId, setPendingWatchlistId] = useState<number | null>(null);
  const [hoveredPage, setHoveredPage] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });
  const buttonRefs = React.useRef<{ [key: number]: HTMLButtonElement | null }>({});
  const overlayInputRef = React.useRef<HTMLInputElement>(null);

  // Watchlist names and ids from API
  const [watchlists, setWatchlists] = useState<{ id: number; name: string }[]>([]);
  const [watchlistNames, setWatchlistNames] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Helper to add a new category (API)
  const addCategory = async (name: string, watchlistId?: number) => {
    console.log('[Sidebar] addCategory invoked', {
      name,
      watchlistId,
      currentWatchlistId,
      pendingWatchlistId
    });
    if (!watchlists || watchlists.length === 0) {
      alert('No watchlists exist. Please create a watchlist before adding a category.');
      console.error('[Sidebar] addCategory error: No watchlists exist');
      return;
    }
    let idToUse: number | undefined = undefined;
    if (typeof watchlistId === 'number' && !isNaN(watchlistId)) {
      idToUse = watchlistId;
    } else if (typeof currentWatchlistId === 'number' && !isNaN(currentWatchlistId)) {
      idToUse = currentWatchlistId;
    }
    console.log('[Sidebar] addCategory resolved idToUse', { idToUse });
    if (idToUse === undefined || isNaN(idToUse)) {
      alert('Please select a valid watchlist before creating a category.');
      console.error('[Sidebar] addCategory error: Invalid idToUse', { idToUse, watchlistId, currentWatchlistId, pendingWatchlistId });
      return;
    }
    try {
      await createCategory(idToUse, name);
      await fetchCategories(idToUse);
      console.log('[Sidebar] addCategory success');
    } catch (e) {
      console.error('[Sidebar] addCategory error', e);
    }
  };

  // Helper to add a new watchlist (API)
  const addWatchlist = async (name: string): Promise<number | undefined> => {
    console.log('[Sidebar] addWatchlist', { name });
    try {
      const newWatchlist = await createWatchlist(name);
      await fetchWatchlists();
      if (newWatchlist && newWatchlist.id) {
        const idNum = Number(newWatchlist.id);
        setCurrentWatchlistId(idNum);
        await fetchCategories(idNum);
        console.log('[Sidebar] addWatchlist success');
        return idNum;
      }
    } catch (e) {
      console.error('[Sidebar] addWatchlist error', e);
    }
    return undefined;
  };

  // Track current watchlistId (for category APIs)
  const [currentWatchlistId, setCurrentWatchlistId] = useState<number | null>(null);

  // Fetch all watchlists from API
  const fetchWatchlists = async () => {
    console.log('[Sidebar] fetchWatchlists');
    try {
      const response = await getAllWatchlists();
      // If backend returns { message, data: [...] }
      const data = response && response.data ? response.data : response;
      console.log('[Sidebar] fetchWatchlists raw API data:', data);
      if (!Array.isArray(data)) {
        throw new Error('Watchlists response is not an array: ' + JSON.stringify(data));
      }
      // Map backend's watchlistId to id for UI compatibility
      const mapped = data.map((w: any) => ({
        id: Number(w.watchlistId),
        name: w.name,
        ...w
      }));
      setWatchlists(mapped);
      setWatchlistNames(mapped.map((w: any) => w.name));
      if ((!currentWatchlistId || isNaN(currentWatchlistId)) && mapped.length > 0) {
        setCurrentWatchlistId(mapped[0].id);
      }
      console.log('[Sidebar] fetchWatchlists success', data);
    } catch (e) {
      console.error('[Sidebar] fetchWatchlists error', e);
      setWatchlists([]);
      setWatchlistNames([]);
    }
  };

  // Fetch all categories for a watchlist from API
  const fetchCategories = async (watchlistId: number) => {
    if (watchlistId === undefined || watchlistId === null || isNaN(watchlistId)) {
      console.error('[Sidebar] fetchCategories: watchlistId is not a valid number', watchlistId);
      return;
    }
    console.log('[Sidebar] fetchCategories', { watchlistId });
    try {
      const response = await getAllCategories(watchlistId); // pass as number
      console.log('[Sidebar] fetchCategories raw API data:', response);
      // The API returns { message, data: [...] }
      let data = response && response.data ? response.data : response;
      // Map backend's category fields to UI Category type
      // Each category: { id, categoryName, positionIndex }
      // UI expects: { id: string, name: string, watchlists: Stock[] }
      const mapped = Array.isArray(data)
        ? data.map((cat: any) => ({
            id: String(cat.id),
            name: cat.categoryName || 'Uncategorized',
            watchlists: cat.watchlists || []
          }))
        : [];
      setCategories(mapped);
      console.log('[Sidebar] fetchCategories success', mapped);
    } catch (e) {
      console.error('[Sidebar] fetchCategories error', e);
    }
  };

  // Fetch watchlists on mount
  React.useEffect(() => {
    fetchWatchlists();
  }, []);

  // Fetch categories when currentWatchlistId changes
  React.useEffect(() => {
    if (typeof currentWatchlistId === 'number' && !isNaN(currentWatchlistId)) {
      fetchCategories(currentWatchlistId);
    }
  }, [currentWatchlistId]);

  // Helper to reorder or move watchlists between categories (API)
  const handleDragEnd = async (event: DragEndEvent) => {
    console.log('[Sidebar] handleDragEnd', event);
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    let sourceCatIdx = -1, sourceIdx = -1, targetCatIdx = -1, targetIdx = -1;
    categories.forEach((cat, catIdx) => {
      const idx = cat.watchlists.findIndex(w => w.id === active.id);
      if (idx !== -1) {
        sourceCatIdx = catIdx;
        sourceIdx = idx;
      }
      if (over.data?.current?.categoryId && cat.id === over.data.current.categoryId) {
        targetCatIdx = catIdx;
      }
    });
    if (targetCatIdx === -1) {
      categories.forEach((cat, catIdx) => {
        const idx = cat.watchlists.findIndex(w => w.id === over.id);
        if (idx !== -1) {
          targetCatIdx = catIdx;
          targetIdx = idx;
        }
      });
    } else {
      targetIdx = categories[targetCatIdx].watchlists.length;
    }
    console.log('[Sidebar] handleDragEnd indices', { sourceCatIdx, sourceIdx, targetCatIdx, targetIdx });
    if (sourceCatIdx === -1 || targetCatIdx === -1 || sourceIdx === -1) return;
    if (sourceCatIdx === targetCatIdx) {
      try {
        const cat = categories[sourceCatIdx];
        const stock = cat.watchlists[sourceIdx];
        await updateWatchlistPosition(stock.id, targetIdx);
        await fetchCategories(currentWatchlistId!);
        console.log('[Sidebar] handleDragEnd reorder success');
      } catch (e) {
        console.error('[Sidebar] handleDragEnd reorder error', e);
      }
    } else {
      // Move between categories: update category and position if needed
      // You may need a dedicated API for moving between categories if available
      await fetchCategories(currentWatchlistId!);
      console.log('[Sidebar] handleDragEnd move between categories');
    }
  };

  // Calculate tooltip position based on button position
  const calculateTooltipPosition = (page: number) => {
    const button = buttonRefs.current[page];
    if (button) {
      const rect = button.getBoundingClientRect();
      const sidebarRect = button.closest('.sidebar-container')?.getBoundingClientRect();
      if (sidebarRect) {
        setTooltipPosition({
          left: rect.left - sidebarRect.left + rect.width / 2,
          top: rect.top - sidebarRect.top - 40 // 40px above the button
        });
      }
    }
  };

  // Combine all stocks for searching
  const allStocks: Stock[] = categories.flatMap(cat => cat.watchlists);

  // Filtered search results based on searchQuery
  const filteredSearchResults: Stock[] =
    searchQuery.trim() === ''
      ? []
      : allStocks.filter(stock =>
          stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stock.exchange.toLowerCase().includes(searchQuery.toLowerCase())
        );

  const handleSearchClick = () => {
    setShowSearchResults(true);
  };

  const handleBackToMain = () => {
    setShowSearchResults(false);
    setSearchQuery('');
  };

  const StockItem: React.FC<{ stock: Stock }> = ({ stock }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div 
        className="flex items-center justify-between p-3 transition-colors relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center space-x-3">
          <div>
            <div
              className="font-medium text-gray-900 dark:text-[#F4F4F9] text-sm mb-[4px]"
              style={{
                width: '156px',
                whiteSpace: 'normal',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
                display: 'block',
              }}
            >
              {stock.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {stock.symbol} • <span className='bg-[#F4F4F9] dark:bg-[#23272F] rounded-[3px] px-[6px] py-[2px]'>{stock.exchange}</span>
            </div>
          </div>
        </div>
        
        {/* Hover Action Buttons */}
        {isHovered && (
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#F4F4F9] dark:bg-[#23272F] flex flex-col items-center z-10 rounded-[3px] min-w-[120px] w-auto px-[6px] py-[6px] border border-gray-200 dark:border-[#23272F]"
          >
            <div className="flex items-center space-x-1">
              <button className="w-6 h-6 hover:bg-[#04B94E] text-white rounded flex items-center justify-center transition-colors shadow-sm bg-[#00CA52]">
                <span className="text-xs font-bold">B</span>
              </button>
              <button className="w-6 h-6 hover:bg-[#F84848] text-white rounded flex items-center justify-center transition-colors shadow-sm bg-[#FF5252]">
                <span className="text-xs font-bold">S</span>
              </button>
              <button className="w-6 h-6 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded flex items-center justify-center transition-colors shadow-sm border-[0.3px] border-[#8F8F8F]"
                onClick={e => { e.stopPropagation(); setOpenDepthId(openDepthId === stock.id ? null : stock.id); }}>
                <img src="/LayerIcon.svg" alt="Layer" className="w-3 h-3" style={{fontSize: '12px'}} />
              </button>
              <button className="w-6 h-6 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded flex items-center justify-center transition-colors shadow-sm border-[0.3px] border-[#8F8F8F]">
                <img src="/LinkIcon.svg" alt="Link" className="w-3 h-3" style={{fontSize: '12px'}} />
              </button>
              <button className="w-6 h-6 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded flex items-center justify-center transition-colors shadow-sm border-[0.3px] border-[#8F8F8F]">
                <img src="/GraphIcon.svg" alt="TrendingUp" className="w-3 h-3" style={{fontSize: '12px'}} />
              </button>
              <button className="w-6 h-6 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded flex items-center justify-center transition-colors shadow-sm border-[0.3px] border-[#8F8F8F]">
                <img src="/DustbinIcon.svg" alt="Trash" className="w-3 h-3" style={{fontSize: '12px'}} />
              </button>
              <button className="w-6 h-6 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded flex items-center justify-center transition-colors shadow-sm border-[0.3px] border-[#8F8F8F]">
                <ChevronRight className="w-3 h-3" style={{fontSize: '12px'}} />
              </button>
            </div>
          </div>
        )}

        <div className="text-right">
          <div className="font-semibold text-medium text-gray-900 text-[14px] mb-[4px]">{stock.price.toFixed(2)}</div>
          <div className={`text-[12px] ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}> 
            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(1)}%)
          </div>
        </div>
      </div>
    );
  };

  const SearchResultItem: React.FC<{ stock: Stock }> = ({ stock }) => (
    <div className="flex items-center justify-between py-3 hover:bg-gray-50 transition-colors border-b border-gray-100">
      <div className="flex items-center space-x-3 flex-1">
        <div className="flex-1">
          <div className="font-medium text-gray-900 dark:text-[#F4F4F9] text-sm mb-[4px]">
            {stock.name}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {stock.symbol} • <span className='bg-[#F4F4F9] dark:bg-[#23272F] rounded-[3px] px-[6px] py-[2px]'>{stock.exchange}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <button className="px-2 py-1 bg-green-500 text-white text-xs  rounded-[3px] transition-colors">
          B
        </button>
        <button className="px-2 py-1 bg-red-500 text-white text-xs  rounded-[3px] transition-colors">
          S
        </button>
        <button className="p-1 pl-0 text-gray-400 hover:text-gray-600 transition-colors">
          <img src="/BookmarkLogo.svg" alt="Bookmark" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );

  const SectionHeader: React.FC<{ title: string; isExpanded: boolean; onToggle: () => void; categoryId?: string }> = ({
    title,
    isExpanded,
    onToggle,
    categoryId
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [savedTitle, setSavedTitle] = useState(title);
    const [deleting, setDeleting] = useState(false);

    const handleTitleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsEditing(true);
    };

    const handleTitleSave = async () => {
      setSavedTitle(editedTitle);
      setIsEditing(false);
      if (categoryId && currentWatchlistId) {
        await updateCategoryName(currentWatchlistId, categoryId, editedTitle);
        await fetchCategories(currentWatchlistId);
      }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleTitleSave();
      }
      if (e.key === 'Escape') {
        setEditedTitle(savedTitle);
        setIsEditing(false);
      }
    };

    const handleDeleteCategory = async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!categoryId || !currentWatchlistId) return;
      if (!window.confirm('Are you sure you want to delete this category?')) return;
      setDeleting(true);
      try {
        await deleteCategory(currentWatchlistId, categoryId, true);
        await fetchCategories(currentWatchlistId);
      } catch (err) {
        // Optionally show error
      }
      setDeleting(false);
    };

    return (
      <div
        className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-100 transition-colors border-b border-gray-200 dark:border-[#23272F]"
        onClick={onToggle}
      >
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={handleKeyPress}
              className="text-xs font-semibold text-gray-600 uppercase tracking-wide bg-transparent border-none outline-none focus:ring-0 p-0"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide border-none">
              {savedTitle}
            </span>
          )}
          <button
            onClick={handleTitleClick}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            tabIndex={-1}
          >
            <Edit2 className="w-3 h-3" />
          </button>
          <button
            onClick={handleDeleteCategory}
            className="text-gray-400 hover:text-red-600 transition-colors p-1"
            tabIndex={-1}
            disabled={deleting}
            title="Delete Category"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </div>
    );
  };

  const FilterTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    
    return (
      <div className="flex items-center border-b border-gray-200 dark:border-[#23272F] mb-[6px]">
        {['All', 'Cash', 'Future', 'Option', 'MF'].map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(index)}
            className={`text-sm font-medium p-[10px] border-b-[2px] transition-colors w-16 ${
              activeTab === index 
                ? 'text-green-600 dark:text-green-400 border-green-500 dark:border-green-400' 
                : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  };

  // Modal handlers
  const handleCreateCategory = async (name: string, watchlistId?: number) => {
    // Use pendingWatchlistId if present, else use passed or current
    const idToUse = (pendingWatchlistId ?? watchlistId ?? currentWatchlistId);
    // Only pass idToUse if it's a number
    const idToPass = typeof idToUse === 'number' && !isNaN(idToUse) ? idToUse : undefined;
    console.log('[Sidebar] handleCreateCategory', name, idToPass);
    await addCategory(name, idToPass);
    setShowCategoryModal(false);
    setPendingWatchlistId(null); // Clear after use
  };

  const handleCreateWatchlist = async (name: string) => {
    console.log('[Sidebar] handleCreateWatchlist', name);
    const newId = await addWatchlist(name);
    setShowWatchlistModal(false);
    if (typeof newId === 'number' && !isNaN(newId)) {
      setPendingWatchlistId(newId);
      setShowCategoryModal(true); // Auto-open category modal for new watchlist
    }
  };

  React.useEffect(() => {
    if (showSearchResults && overlayInputRef.current) {
      overlayInputRef.current.focus();
    }
  }, [showSearchResults]);

  if (showSearchResults) {
    return (
      <div className="fixed top-20 left-0 w-[320px] h-[calc(100vh-64px)] bg-white dark:bg-[#181A20] ml-[18px] mt-[18px] flex flex-col overflow-hidden z-30">
        {/* Search Bar - Fixed */}
        <div className="mt-[18px] border-gray-200 flex-shrink-0 mb-2">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <button 
                onClick={() => setShowSearchResults(true)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#686868] z-10"
              >
                <Search className="w-4 h-4" />
              </button>
              <input
                ref={overlayInputRef}
                type="text"
                placeholder="Search everything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Escape') handleBackToMain(); }}
                className="w-full pl-9 py-2 border border-gray-300 dark:border-[#23272F] rounded-lg text-sm focus:outline-none text-[#686868] dark:text-[#F4F4F9] bg-white dark:bg-[#23272F]"
              />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <FilterTabs />

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto hide-scrollbar">
          {filteredSearchResults.length === 0 && searchQuery.trim() !== '' && (
            <div className="text-center text-gray-400 py-8">No results found.</div>
          )}
          {filteredSearchResults.map((stock) => (
            <SearchResultItem key={stock.id} stock={stock} />
          ))}
        </div>
      </div>
    );
  }

  // Sortable StockItem for drag-and-drop
  const SortableStockItem: React.FC<{ stock: Stock; categoryId: string }> = ({ stock, categoryId }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: stock.id, data: { categoryId } });
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
      zIndex: isDragging ? 100 : 'auto',
      background: isDragging ? '#f0f0f0' : undefined
    };
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <StockItem stock={stock} />
      </div>
    );
  };

  return (
    <>
      {/* Sidebar and content */}
      <div className="fixed flex top-16 mt-[28px] left-0 h-[calc(100vh-60px)] pl-[18px] z-30">
        <div className="w-[24vw] bg-white dark:bg-[#181A20] flex flex-col overflow-hidden sidebar-container">
          {/* Search Bar - Fixed */}
          <div className="border-gray-200 flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <button 
                  onClick={handleSearchClick}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#686868] z-10"
                >
                  <Search className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  placeholder="Search everything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchClick}
                  onKeyDown={(e) => { if (e.key === 'Escape') handleBackToMain(); }}
                  className="w-full pl-9 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#686868]"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1">
                  <Filter className="w-4 h-4 text-[#686868]" />
                </button>
              </div>
              <div className="relative">
                <button
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPopover((v) => !v)}
                >
                  <Plus className="w-5 h-5 text-[#686868]" />
                </button>
                {showPopover && (
                  <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#181A20] rounded-lg shadow-lg border border-gray-100 dark:border-[#23272F] z-50 flex flex-col py-2">
                    <button
                      className="px-4 py-2 text-left text-sm hover:bg-gray-100 text-gray-800"
                      onClick={() => { setShowWatchlistModal(true); setShowPopover(false); }}
                    >
                      Create Watchlist
                    </button>
                    <button
                      className="px-4 py-2 text-left text-sm hover:bg-gray-100 text-gray-800"
                      onClick={() => { setShowCategoryModal(true); setShowPopover(false); }}
                    >
                      Create Category
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pagination - Fixed */}
          <div className="py-3 flex-shrink-0">
            <div className="relative">
              <div className="flex items-center space-x-1 gap-3 overflow-x-auto hide-scrollbar pb-4">
          {watchlists.map((watchlist, idx) => (
            <div key={watchlist.id} className="relative group">
              <button
                ref={(el) => { buttonRefs.current[idx + 1] = el; }}
                onClick={() => {
                  setCurrentPage(idx + 1);
                  setCurrentWatchlistId(watchlist.id);
                  fetchCategories(watchlist.id);
                }}
                onMouseEnter={() => {
                  setHoveredPage(idx + 1);
                  calculateTooltipPosition(idx + 1);
                }}
                onMouseLeave={() => setHoveredPage(null)}
                className={`px-3 h-8 rounded text-sm font-medium transition-colors border-[0.5px] ${currentPage === idx + 1
                  ? 'bg-[#EEFFF2] text-green-700 border-green-200'
                  : 'text-gray-600 bg-[#F4F4F9] border-[#E5E7EB]'
                }`}
                style={{ position: 'relative', zIndex: 2 }}
              >
                {idx + 1}
              </button>
              {/* Show delete cross on hover */}
              <button
                className="absolute -top-[2px] -right-2 w-4 h-4 rounded-full bg-white border border-gray-300 text-gray-400 hover:text-red-600 hover:border-red-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ fontSize: 10, lineHeight: 1, zIndex: 99999 }}
                title="Delete Watchlist"
                tabIndex={-1}
                onClick={async (e) => {
                  e.stopPropagation();
                  if (!window.confirm('Are you sure you want to delete this watchlist?')) return;
                  try {
                    await deleteWatchlist(String(watchlist.id));
                    await fetchWatchlists();
                  } catch (err) {
                    // Optionally show error
                  }
                }}
              >
                <span style={{ fontWeight: 'bold', fontSize: 14, marginTop: -2 }}>×</span>
              </button>
            </div>
          ))}
              </div>
            </div>
          </div>

          {/* Dynamic Tooltip positioned above the hovered number, clamped to sidebar top */}
          {hoveredPage !== null && hoveredPage > 0 && (
            <div
              className="fixed z-[999999] pointer-events-none"
              style={{
                left: tooltipPosition.left + 'px',
                top: Math.max(tooltipPosition.top, 8) + 'px', // Clamp to min 8px from top
                transform: 'translateX(-50%)'
              }}
            >
              <div className="px-3 py-2 bg-white dark:bg-[#23272F] text-black dark:text-white text-xs rounded-[4px] whitespace-nowrap border-[#d9d9d9] dark:border-[#23272F] border-[1px] shadow">
                {watchlistNames[hoveredPage - 1]}
              </div>
            </div>
          )}

          {/* Scrollable Content Area */}
          <DndContext
            sensors={useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="flex-1 overflow-y-auto hide-scrollbar border border-gray-200 dark:border-[#23272F]">
              {/* Dynamic Category Sections */}
              {categories.map(category => (
                <SortableContext
                  key={category.id}
                  items={category.watchlists.map(w => w.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="border-none bg-white dark:bg-[#181A20]" key={category.id}>
                    <SectionHeader
                      title={category.name}
                      isExpanded={expandedCategories[category.id] ?? true}
                      onToggle={() => setExpandedCategories(prev => ({ ...prev, [category.id]: !(prev[category.id] ?? true) }))}
                      categoryId={category.id}
                    />
                    {(expandedCategories[category.id] ?? true) && (
                      <div className="divide-y divide-gray-100 dark:divide-[#23272F]" data-category-id={category.id}>
                        {category.watchlists.map((stock) => [
                          <SortableStockItem key={stock.id} stock={stock} categoryId={category.id} />,
                          openDepthId === stock.id && (
                            <div key={stock.id + '-depth'} className="w-full"><MarketDepth /></div>
                          )
                        ])}
                      </div>
                    )}
                  </div>
                </SortableContext>
              ))}
            </div>
          </DndContext>

          {/* Modals for Create Watchlist/Category */}
          <CreateWatchlistCategoryModals
            showWatchlistModal={showWatchlistModal}
            setShowWatchlistModal={setShowWatchlistModal}
            showCategoryModal={showCategoryModal}
            setShowCategoryModal={setShowCategoryModal}
            onCreateCategory={handleCreateCategory}
            onCreateWatchlist={handleCreateWatchlist}
          />
        </div>
      </div>
      {/* Vertical divider aligned with Navbar's left section divider */}
    </>
  );
};

const TooltipPositioner: React.FC<{ tooltipPosition: { left: number; top: number }, watchlistName: string }> = ({ tooltipPosition, watchlistName }) => {
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const sidebarRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => {
    sidebarRef.current = document.querySelector('.sidebar-container');
  }, []);

  const [style, setStyle] = React.useState<{ left: number; top: number; transform?: string }>({ left: tooltipPosition.left, top: tooltipPosition.top, transform: 'translateX(-50%)' });

  React.useEffect(() => {
    if (tooltipRef.current && sidebarRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      let left = tooltipPosition.left;
      let transform = 'translateX(-50%)';
      const margin = 8;
      // If tooltip would overflow left
      if (left - tooltipRect.width / 2 < margin) {
        left = tooltipRect.width / 2 + margin;
        transform = 'none';
      }
      // If tooltip would overflow right
      if (left + tooltipRect.width / 2 > sidebarRect.width - margin) {
        left = sidebarRect.width - tooltipRect.width / 2 - margin;
        transform = 'none';
      }
      setStyle({ left, top: tooltipPosition.top, transform });
    }
  }, [tooltipPosition]);

  return (
    <div
      ref={tooltipRef}
      className="absolute z-[999999] pointer-events-none"
      style={{
        left: style.left,
        top: style.top,
        transform: style.transform,
      }}
    >
      <div className="px-3 py-2 bg-white dark:bg-[#23272F] text-black dark:text-white text-xs rounded-[4px] whitespace-nowrap border-[#d9d9d9] dark:border-[#23272F] border-[1px]">
        {watchlistName}
      </div>
    </div>
  );
};

export default Sidebar;