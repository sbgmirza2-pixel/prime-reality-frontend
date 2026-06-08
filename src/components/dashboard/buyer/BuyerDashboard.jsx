import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SavedProperties from './SavedProperties';
import ScheduleViewing from './ScheduleViewing';
import SearchHistory from './SearchHistory';
import { getAccessToken, clearAuthData } from '../../../utils/helpers/authHelper'; // Path clear rakha hai

const BuyerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('my-inquiries');

  // 🏠 Real Data States
  const [myInquiries, setMyInquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // 🌐 Dynamic Environment API Base URL (Secure & Live)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // 🔑 Configuration for Axios Request Header
  const getAuthHeader = () => {
    const token = getAccessToken();
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // 📥 Fetch Buyer Inquiries (Real API Hit)
  const fetchMyInquiries = async () => {
    setLoading(true);
    try {
      // Assuming buyer inquiry endpoint structure from backend API documentation
      const response = await axios.get(`${API_BASE_URL}/buyer/inquiries`, getAuthHeader());
      setMyInquiries(response.data);
      setErrorMsg('');
    } catch (err) {
      setErrorMsg('Failed to fetch your inquiries. Please check your network connection or login again.');
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Load Data Automatically When Tab is 'my-inquiries'
  useEffect(() => {
    if (activeTab === 'my-inquiries') {
      fetchMyInquiries();
    }
  }, [activeTab]);

  // 🔒 LOGOUT BUTTON HANDLER
  const handleLogout = () => {
    clearAuthData(); // LocalStorage clear karega (token & role vanished)
    navigate('/login'); // Login route par redirect
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F6F9] text-[#0A1A2F] flex animate-fadeIn">
      
      {/* BUYER INTERNAL DASHBOARD SIDEBAR */}
      <div className="w-64 bg-[#0A1A2F] text-white flex flex-col justify-between hidden md:flex shrink-0 shadow-xl z-10">
        <div className="p-6">
          <div className="text-xl font-serif font-bold tracking-[0.2em] text-[#C9A03D] uppercase border-b border-gray-800 pb-4">
            PRIME REALITY
          </div>
          <nav className="mt-8 space-y-2">
            <button onClick={() => setActiveTab('my-inquiries')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold text-sm transition ${activeTab === 'my-inquiries' ? 'bg-[#C9A03D]/20 text-[#C9A03D]' : 'hover:bg-white/5 text-gray-300'}`}>
              <span>💌</span> <span>My Inquiries Track</span>
            </button>
            <button onClick={() => setActiveTab('saved-properties')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold text-sm transition ${activeTab === 'saved-properties' ? 'bg-[#C9A03D]/20 text-[#C9A03D]' : 'hover:bg-white/5 text-gray-300'}`}>
              <span>⭐</span> <span>Saved Wishlist</span>
            </button>
            <button onClick={() => setActiveTab('schedules')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold text-sm transition ${activeTab === 'schedules' ? 'bg-[#C9A03D]/20 text-[#C9A03D]' : 'hover:bg-white/5 text-gray-300'}`}>
              <span>📅</span> <span>Viewing Schedules</span>
            </button>
            <button onClick={() => setActiveTab('history')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold text-sm transition ${activeTab === 'history' ? 'bg-[#C9A03D]/20 text-[#C9A03D]' : 'hover:bg-white/5 text-gray-300'}`}>
              <span>🔍</span> <span>Search History</span>
            </button>
          </nav>
        </div>

        {/* 🚪 SYSTEM LOGOUT IN SIDEBAR LOWER PANEL */}
        <div className="p-6 border-t border-gray-800 space-y-4">
          <button 
            onClick={handleLogout}
            className="w-full bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2"
          >
            <span>🚪</span> <span>Logout Hub</span>
          </button>
          <div className="text-gray-400 tracking-widest uppercase text-[10px] text-center">Buyer Hub</div>
        </div>
      </div>

      {/* DYNAMIC CONTENT AREA */}
      <div className="flex-grow p-6 md:p-10 overflow-y-auto">
        
        {/* Error Alerts Display */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 font-bold text-xs rounded-xl border border-red-200">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Loading Visual Indicator */}
        {loading && (
          <div className="text-sm font-semibold text-[#C9A03D] mb-4 animate-pulse">
            🔄 Loading real-time inquiry logs from database...
          </div>
        )}

        {/* Dynamic Sub-tab Conditions */}
        {activeTab === 'my-inquiries' && (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
            <div className="border-b border-gray-100 pb-4">
              <h2 className="text-2xl font-serif font-bold uppercase border-l-4 border-[#C9A03D] pl-3">My Inquiries Track</h2>
              <p className="text-gray-400 text-xs font-semibold uppercase mt-1">Live updates on responses from estate owners</p>
            </div>

            <div className="space-y-4">
              {myInquiries.length === 0 && !loading ? (
                <div className="p-6 text-center text-gray-400 text-xs font-medium">
                  You haven't sent any inquiries yet. Explore listings to clear doubts!
                </div>
              ) : (
                myInquiries.map((inq) => (
                  <div key={inq.id || inq._id} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-2.5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-sm text-[#0A1A2F]">{inq.property_title || inq.property}</h4>
                        <p className="text-[10px] text-gray-400 uppercase font-bold mt-0.5">
                          Agent/Seller ID: {inq.agent_id || inq.agent || 'System Managed'}
                        </p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        (inq.status === 'Pending' || inq.status === 'pending') ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                      }`}>{inq.status}</span>
                    </div>
                    <p className="text-xs text-gray-600 italic bg-white p-3 rounded-xl border border-gray-100 shadow-inner">
                      "My Message: {inq.message}"
                    </p>
                    
                    {(inq.status === 'Replied' || inq.reply_message || inq.replyMessage) && (
                      <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 mt-2">
                        <p className="text-xs font-bold text-emerald-800">💬 Response from Agent:</p>
                        <p className="text-xs text-emerald-700 mt-1">
                          "{inq.reply_message || inq.replyMessage || 'No text content provided.'}"
                        </p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* SUB-COMPONENTS SECTIONS */}
        {activeTab === 'saved-properties' && (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <SavedProperties />
          </div>
        )}

        {activeTab === 'schedules' && (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <ScheduleViewing />
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <SearchHistory />
          </div>
        )}

      </div>
    </div>
  );
};

export default BuyerDashboard;