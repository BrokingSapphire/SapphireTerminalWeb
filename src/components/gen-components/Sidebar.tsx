"use client";
import React, { useState } from 'react';
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
  const [hoveredPage, setHoveredPage] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });
  const buttonRefs = React.useRef<{ [key: number]: HTMLButtonElement | null }>({});
  const overlayInputRef = React.useRef<HTMLInputElement>(null);

  // Watchlist names mapping for tooltips - now state-based
  const [watchlistNames, setWatchlistNames] = useState(initialWatchlistNames);

  // Initial categories state
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  // Helper to add a new category
  const addCategory = (name: string) => {
    setCategories(prev => [
      ...prev,
      { id: Date.now().toString(), name, watchlists: [] }
    ]);
  };

  // Helper to add a new watchlist (stock) to the selected category
  const addWatchlist = (name: string) => {
    if (!selectedCategoryId && categories.length > 0) {
      setSelectedCategoryId(categories[0].id);
    }
    setCategories(prev => prev.map(cat =>
      cat.id === (selectedCategoryId || categories[0].id)
        ? { ...cat, watchlists: [...cat.watchlists, { id: Date.now().toString(), name, symbol: name.toUpperCase(), exchange: 'NSE', price: 0, change: 0, changePercent: 0 }] }
        : cat
    ));
  };

  // Helper to reorder or move watchlists between categories
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    // Find source and target category and indices
    let sourceCatIdx = -1, sourceIdx = -1, targetCatIdx = -1, targetIdx = -1;
    categories.forEach((cat, catIdx) => {
      const idx = cat.watchlists.findIndex(w => w.id === active.id);
      if (idx !== -1) {
        sourceCatIdx = catIdx;
        sourceIdx = idx;
      }
      // Use over.data?.current?.categoryId for dnd-kit v6+
      if (over.data?.current?.categoryId && cat.id === over.data.current.categoryId) {
        targetCatIdx = catIdx;
      }
    });
    // If dropped on a stock, get its category and index
    if (targetCatIdx === -1) {
      categories.forEach((cat, catIdx) => {
        const idx = cat.watchlists.findIndex(w => w.id === over.id);
        if (idx !== -1) {
          targetCatIdx = catIdx;
          targetIdx = idx;
        }
      });
    } else {
      // If dropped on category droppable area (not a stock), add to end
      targetIdx = categories[targetCatIdx].watchlists.length;
    }
    if (sourceCatIdx === -1 || targetCatIdx === -1 || sourceIdx === -1) return;
    // If same category, reorder
    if (sourceCatIdx === targetCatIdx) {
      setCategories(prev => prev.map((cat, idx) =>
        idx === sourceCatIdx
          ? { ...cat, watchlists: arrayMove(cat.watchlists, sourceIdx, targetIdx) }
          : cat
      ));
    } else {
      // Move between categories
      setCategories(prev => {
        const sourceCat = prev[sourceCatIdx];
        const targetCat = prev[targetCatIdx];
        const moved = sourceCat.watchlists[sourceIdx];
        const newSource = { ...sourceCat, watchlists: sourceCat.watchlists.filter((_, i) => i !== sourceIdx) };
        const newTarget = { ...targetCat, watchlists: [...targetCat.watchlists.slice(0, targetIdx), moved, ...targetCat.watchlists.slice(targetIdx)] };
        return prev.map((cat, idx) =>
          idx === sourceCatIdx ? newSource : idx === targetCatIdx ? newTarget : cat
        );
      });
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
              className="font-medium text-gray-900 text-sm mb-[4px]"
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
            <div className="text-xs text-gray-500">
              {stock.symbol} • <span className='bg-[#F4F4F9] rounded-[3px] px-[6px] py-[2px]'>{stock.exchange}</span>
            </div>
          </div>
        </div>
        
        {/* Hover Action Buttons */}
        {isHovered && (
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#F4F4F9] flex flex-col items-center z-10 rounded-[3px] min-w-[120px] w-auto px-[6px] py-[6px] border border-gray-200"
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
          <div className="font-medium text-gray-900 text-sm mb-[4px]">
            {stock.name}
          </div>
          <div className="text-xs text-gray-500">
            {stock.symbol} • <span className='bg-[#F4F4F9] rounded-[3px] px-[6px] py-[2px]'>{stock.exchange}</span>
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

  const SectionHeader: React.FC<{ title: string; isExpanded: boolean; onToggle: () => void }> = ({
    title,
    isExpanded,
    onToggle
  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [savedTitle, setSavedTitle] = useState(title);

    const handleTitleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsEditing(true);
    };

    const handleTitleSave = () => {
      setSavedTitle(editedTitle);
      setIsEditing(false);
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

    return (
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full p-3 text-left hover:bg-gray-100 transition-colors border-b border-gray-200"
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
          >
            <Edit2 className="w-3 h-3" />
          </button>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>
    );
  };

  const FilterTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    
    return (
      <div className="flex items-center border-b border-gray-200 mb-[6px]">
        {['All', 'Cash', 'Future', 'Option', 'MF'].map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(index)}
            className={`text-sm font-medium p-[10px] border-b-[2px] transition-colors w-16 ${
              activeTab === index 
                ? 'text-green-600 border-green-500' 
                : 'text-gray-500 border-transparent hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  };

  // Modal handlers
  const handleCreateCategory = (name: string) => {
    addCategory(name);
    setShowCategoryModal(false);
  };
  const handleCreateWatchlist = (name: string) => {
    addWatchlist(name);
    setWatchlistNames(prev => [...prev, name]);
    setShowWatchlistModal(false);
  };

  React.useEffect(() => {
    if (showSearchResults && overlayInputRef.current) {
      overlayInputRef.current.focus();
    }
  }, [showSearchResults]);

  if (showSearchResults) {
    return (
      <div className="fixed top-20 left-0 w-[320px] h-[calc(100vh-64px)] bg-white ml-[18px] mt-[18px] flex flex-col overflow-hidden z-30">
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
                className="w-full pl-9 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none text-[#686868]"
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
        <div className="w-[24vw] bg-white flex flex-col overflow-hidden sidebar-container">
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
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-100 z-50 flex flex-col py-2">
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
                {Array.from({ length: watchlistNames.length }, (_, i) => i + 1).map((page) => (
                  <div key={page} className="relative">
                    <button
                      ref={(el) => { buttonRefs.current[page] = el; }}
                      onClick={() => setCurrentPage(page)}
                      onMouseEnter={() => {
                        setHoveredPage(page);
                        calculateTooltipPosition(page);
                      }}
                      onMouseLeave={() => setHoveredPage(null)}
                      className={`px-3 h-8 rounded text-sm font-medium transition-colors border-[0.5px] ${currentPage === page
                        ? 'bg-[#EEFFF2] text-green-700 border-green-200'
                        : 'text-gray-600 bg-[#F4F4F9] border-[#E5E7EB]'
                      }`}
                    >
                      {page}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Tooltip positioned above the hovered number */}
          {hoveredPage && (
            <div 
              className="fixed z-[999999] pointer-events-none"
              style={{ 
                left: `${tooltipPosition.left}px`, 
                top: `${tooltipPosition.top}px`,
                transform: 'translateX(-50%)'
              }}
            >
              <div className="px-3 py-2 bg-white text-black text-xs rounded-[4px] whitespace-nowrap  border-[#d9d9d9] border-[1px]">
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
            <div className="flex-1 overflow-y-auto hide-scrollbar border border-gray-200">
              {/* Dynamic Category Sections */}
              {categories.map(category => (
                <SortableContext
                  key={category.id}
                  items={category.watchlists.map(w => w.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="border-none" key={category.id}>
                    <SectionHeader
                      title={category.name}
                      isExpanded={expandedCategories[category.id] ?? true}
                      onToggle={() => setExpandedCategories(prev => ({ ...prev, [category.id]: !(prev[category.id] ?? true) }))}
                    />
                    {(expandedCategories[category.id] ?? true) && (
                      <div className="divide-y divide-gray-100" data-category-id={category.id}>
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
      <div className="px-3 py-2 bg-white text-black text-xs rounded-[4px] whitespace-nowrap border-[#d9d9d9] border-[1px]">
        {watchlistName}
      </div>
    </div>
  );
};

export default Sidebar;