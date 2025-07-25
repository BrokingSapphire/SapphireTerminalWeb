
"use client";

import React, { useState, useEffect } from 'react';
import FixedColumnTable from '@/components/gen-components/table/FixedColumnTable';
import GridViewTable from '@/components/gen-components/table/GridViewTable';
import SearchFilterControls from '@/components/gen-components/SearchFilterControl';

interface ClosedTrade {
  date: string;
  time: string;
  security: string;
  type: 'BUY' | 'SELL';
  entryPrice: string;
  exitPrice: string;
  quantity: string;
  duration: string;
  net: string;
  status: string;
  postedBy: string;
  marginReq: string;
}

export default function ClosedTradesList() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTrades, setFilteredTrades] = useState<ClosedTrade[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState<'BUY' | 'SELL' | ''>('');
  const [filterDuration, setFilterDuration] = useState<string>('');

  const closedTradesData: ClosedTrade[] = [
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'MRF',
      type: 'BUY',
      entryPrice: '₹2,042.63',
      exitPrice: '₹2,042.63',
      quantity: '₹2,042.63',
      duration: '1 month',
      net: '+1',
      status: "Target Miss",
      postedBy: "Nakul",
      marginReq: "₹1,34,099"
    },
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'TATASTEEL',
      type: 'SELL',
      entryPrice: '₹8223.60',
      exitPrice: '₹8223.60',
      quantity: '₹8223.60',
      duration: '2 months',
      net: '-1',
      status: "Target Miss",
      postedBy: "Nakul",
      marginReq: "₹1,34,099"
    },
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'ITC',
      type: 'BUY',
      entryPrice: '₹92,467.00',
      exitPrice: '₹92,467.00',
      quantity: '₹92,467.00',
      duration: '1 year',
      net: '+8',
      status: "Target Miss",
      postedBy: "Nakul",
      marginReq: "₹1,34,099"
    },
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'MOTILALOSWL',
      type: 'SELL',
      entryPrice: '₹88.50',
      exitPrice: '₹88.50',
      quantity: '₹88.50',
      duration: '6 months',
      net: '-1',
      status: "closed",
      postedBy: "Nakul",
      marginReq: "₹1,34,099"
    },
    {
      date: '24 Jan 2025',
      time: '12:30',
      security: 'WIPRO',
      type: 'BUY',
      entryPrice: '₹924.5',
      exitPrice: '₹924.5',
      quantity: '₹924.5',
      duration: '4 year',
      net: '-1',
      status: "closed",
      postedBy: "Nakul",
      marginReq: "₹1,34,099"   
    }
    // ... other items
  ];

  useEffect(() => {
    let filtered = [...closedTradesData];
    if (filterType) filtered = filtered.filter(trade => trade.type === filterType);
    if (filterDuration) filtered = filtered.filter(trade => trade.duration === filterDuration);
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(trade =>
        trade.security.toLowerCase().includes(q) ||
        trade.date.toLowerCase().includes(q) ||
        trade.type.toLowerCase().includes(q) ||
        trade.entryPrice.toLowerCase().includes(q) ||
        trade.exitPrice.toLowerCase().includes(q) ||
        trade.quantity.toLowerCase().includes(q) ||
        trade.duration.toLowerCase().includes(q) ||
        trade.net.toLowerCase().includes(q)
      );
    }
    setFilteredTrades(filtered);
  }, [searchQuery, filterType, filterDuration]);

  useEffect(() => {
    setFilteredTrades(closedTradesData);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value);

  const resetFilters = () => {
    setFilterType('');
    setFilterDuration('');
    setShowFilters(false);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filterType) count++;
    if (filterDuration) count++;
    return count;
  };

  const uniqueDurations = Array.from(new Set(closedTradesData.map(trade => trade.duration)));

  return (
    <div className="w-full max-w-[1100px] mx-auto px-2 max-[550px]:px-2 max-[550px]:max-w-full max-[550px]:w-full">
      <SearchFilterControls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchChange={handleSearchChange}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filterType={filterType}
        setFilterType={setFilterType}
        filterDuration={filterDuration}
        setFilterDuration={setFilterDuration}
        uniqueDurations={uniqueDurations}
        resetFilters={resetFilters}
        getActiveFiltersCount={getActiveFiltersCount}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {filteredTrades.length === 0 ? (
        <div className="w-full max-w-[1100px] bg-white p-6 text-center rounded-lg border mx-auto max-[550px]:max-w-full max-[550px]:w-full">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No trades found</h3>
          <p className="mt-1 text-sm text-gray-500">Try adjusting your search parameters.</p>
          <div className="mt-3">
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
              onClick={() => {
                setSearchQuery('');
                resetFilters();
              }}
            >
              Clear all filters
            </button>
          </div>
        </div>
      ) : viewMode === 'list' ? (
        <div className="w-full max-w-[1100px] mx-auto max-[550px]:max-w-full max-[550px]:w-full max-[550px]:overflow-x-auto">
          <FixedColumnTable filteredTrades={filteredTrades} />
        </div>
      ) : (
        <div className="w-full max-w-[1100px] mx-auto max-[550px]:max-w-full max-[550px]:w-full max-[550px]:overflow-x-auto">
          <GridViewTable
            trades={filteredTrades.map(trade => ({
              ...trade,
              status: trade.status,
              postedBy: trade.postedBy,
              marginReq: trade.marginReq,
            }))}
          />
        </div>
      )}
    </div>
  );
}