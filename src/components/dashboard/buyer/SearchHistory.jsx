import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAccessToken } from '../../../utils/helpers/authHelper';

const SearchHistory = () => {
  // 🏠 Real Data States
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const API_BASE_URL = 'http://localhost:8000/api/v1';

  // 🔑 Auth Header Helper
  const getAuthHeader = () => {
    const token = getAccessToken();
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // 📥 Fetch Search History from Backend
  const fetchSearchHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/buyer/search-history`, getAuthHeader());
      // Safety handling array data
      setHistory(response.data.history || response.data || []);
      setErrorMsg('');
    } catch (err) {
      setErrorMsg('Search history load karne mein masla hua. Backend setup verify karein.');
    } finally {
      setLoading(false);
    }
  };

  // Automatically load history data when component mounts
  useEffect(() => {
    fetchSearchHistory();
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Header Panel */}
      <div className="border-b border-gray-100 pb-4">
        <h3 className="text-xl font-serif font-bold text-[#0A1A2F] uppercase border-l-4 border-[#C9A03D] pl-3">
          Recent Searches
        </h3>
        <p className="text-gray-400 text-xs font-semibold uppercase mt-1">
          Your recent search query tracks and applied filter logs
        </p>
      </div>

      {/* Error Message Alert */}
      {errorMsg && (
        <div className="p-4 bg-red-100 text-red-700 font-bold text-xs rounded-xl border border-red-200">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Loading Tracker Visual Spinner */}
      {loading ? (
        <div className="text-center py-10 text-sm font-semibold text-[#C9A03D] animate-pulse">
          🔄 Retrieving your active search logs from database...
        </div>
      ) : history.length === 0 ? (
        <div className="p-8 text-center text-gray-400 text-xs font-medium bg-gray-50 rounded-2xl border border-dashed">
          Aapne abhi tak kuch search nahi kiya. Prime listings explore karein!
        </div>
      ) : (
        /* DYNAMIC SEARCH HISTORY LOGS */
        <div className="space-y-3">
          {history.map((hist) => {
            const itemId = hist.id || hist._id;
            
            return (
              <div 
                key={itemId} 
                className="bg-white border border-gray-100 p-4 rounded-xl flex justify-between items-center shadow-sm hover:shadow-md transition"
              >
                <div>
                  <p className="text-xs font-bold text-[#0A1A2F]">🔍 {hist.query || hist.search_term || 'General Luxury Search'}</p>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                    Active Filter: {hist.filters || hist.applied_filters || 'None'}
                  </p>
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  {hist.date || hist.createdAt || 'Recent'}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchHistory;