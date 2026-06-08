import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAccessToken } from '../../../utils/helpers/authHelper';

const SavedProperties = () => {
  // 🏠 Real Data States
  const [savedList, setSavedList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  const API_BASE_URL = 'http://localhost:8000/api/v1';

  // 🔑 Auth Header Helper
  const getAuthHeader = () => {
    const token = getAccessToken();
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // 📥 1. Fetch Saved Wishlist from Backend
  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/buyer/wishlist`, getAuthHeader());
      setSavedList(response.data.wishlist || response.data || []);
      setErrorMsg('');
    } catch (err) {
      setErrorMsg('Wishlist load karne mein masla hua. Backend check karein.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // ✕ 2. Remove Property from Real Database Wishlist
  const handleRemove = async (id) => {
    setActionLoading(id);
    try {
      await axios.delete(`${API_BASE_URL}/buyer/wishlist/remove/${id}`, getAuthHeader());
      setSavedList(savedList.filter(item => (item.id || item._id) !== id));
    } catch (err) {
      alert('Property ko wishlist se remove nahi kiya ja saka. Dubara koshish karein.');
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="border-b border-gray-100 pb-4">
        <h3 className="text-xl font-serif font-bold text-[#0A1A2F] uppercase border-l-4 border-[#C9A03D] pl-3">
          Saved Luxury Wishlist
        </h3>
        <p className="text-gray-400 text-xs font-semibold uppercase mt-1">
          Your curated selection of top high-end listings
        </p>
      </div>

      {/* Error Message Alert */}
      {errorMsg && (
        <div className="p-4 bg-red-100 text-red-700 font-bold text-xs rounded-xl border border-red-200">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Loading Tracker */}
      {loading ? (
        <div className="text-center py-10 text-sm font-semibold text-[#C9A03D] animate-pulse">
          🔄 Fetching your saved luxury properties from database...
        </div>
      ) : savedList.length === 0 ? (
        <p className="text-sm text-gray-400 italic bg-gray-50 p-6 rounded-2xl text-center border border-dashed">
          Aapki wishlist abhi khali hai. Kuch dilkash properties save kijiye!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {savedList.map((prop) => {
            const itemId = prop.id || prop._id;
            
            return (
              <div 
                key={itemId} 
                className="bg-white border border-gray-100 rounded-2xl p-5 flex justify-between items-center shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#0A1A2F]/5 rounded-xl flex items-center justify-center overflow-hidden">
                    {prop.images && prop.images[0] ? (
                      <img src={prop.images[0]} alt="property" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xl">🏢</span>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-sm text-[#0A1A2F]">{prop.title || prop.property_title}</h4>
                    <p className="text-[10px] text-gray-400 uppercase font-semibold">
                      {prop.location || 'Prime Sector'} | <span className="text-[#C9A03D]">{prop.type || 'Luxury'}</span>
                    </p>
                    <p className="text-xs font-bold text-gray-700 mt-1">
                      ${prop.price ? Number(prop.price).toLocaleString() : 'TBD'}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => handleRemove(itemId)} 
                  disabled={actionLoading === itemId}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer disabled:opacity-50"
                >
                  {actionLoading === itemId ? '⏳ Wait...' : '✕ Remove'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavedProperties;