import React, { useState } from 'react';

const SearchHistory = () => {
  const [history, setHistory] = useState([
    { id: 1, query: '3-BHK Luxury Villa Casablanca', filters: 'Price: $200k-$500k', date: 'Aaj, 12:40 PM' },
    { id: 2, query: 'Penthouse with Infinity Pool Downtown', filters: 'Bedrooms: 2', date: 'Kal, 06:15 PM' }
  ]);

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h3 className="text-xl font-serif font-bold text-[#0A1A2F] uppercase border-l-4 border-[#C9A03D] pl-3">
          Recent Searches
        </h3>
        <p className="text-gray-400 text-xs font-semibold uppercase mt-1">Your recent search query tracks and applied filter logs</p>
      </div>

      <div className="space-y-3">
        {history.map((hist) => (
          <div key={hist.id} className="bg-white border border-gray-100 p-4 rounded-xl flex justify-between items-center shadow-sm">
            <div>
              <p className="text-xs font-bold text-[#0A1A2F]">🔍 {hist.query}</p>
              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-semibold">Active Filter: {hist.filters}</p>
            </div>
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{hist.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;