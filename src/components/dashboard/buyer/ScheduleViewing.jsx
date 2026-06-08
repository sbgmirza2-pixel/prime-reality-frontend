import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAccessToken } from '../../../utils/helpers/authHelper';

const ScheduleViewing = () => {
  // 🏠 Real Data States
  const [viewings, setViewings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const API_BASE_URL = 'http://localhost:8000/api/v1';

  // 🔑 Auth Header Helper
  const getAuthHeader = () => {
    const token = getAccessToken();
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // 📥 Fetch Scheduled Viewings from Backend
  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/buyer/schedules`, getAuthHeader());
      // Safety checks backends arrays ke liye
      setViewings(response.data.schedules || response.data || []);
      setErrorMsg('');
    } catch (err) {
      setErrorMsg('Schedules load karne mein masla hua. Apna network ya backend check karein.');
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch data when component mounts
  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Header Panel */}
      <div className="border-b border-gray-100 pb-4">
        <h3 className="text-xl font-serif font-bold text-[#0A1A2F] uppercase border-l-4 border-[#C9A03D] pl-3">
          Viewing Schedules
        </h3>
        <p className="text-gray-400 text-xs font-semibold uppercase mt-1">
          Track your upcoming private site tours and luxury walkthroughs
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
          🔄 Fetching your luxury site walkthroughs from database...
        </div>
      ) : viewings.length === 0 ? (
        <div className="p-8 text-center text-gray-400 text-xs font-medium bg-gray-50 rounded-2xl border border-dashed">
          Filhal koi viewing tour scheduled nahi hai. Properties browse karke tour book kijiye!
        </div>
      ) : (
        /* TABLE DISPLAY FOR LIVE SCHEDULES */
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 tracking-widest uppercase bg-gray-50">
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4">Agent/Host</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs font-medium">
                {viewings.map((v) => {
                  const itemId = v.id || v._id;
                  
                  return (
                    <tr key={itemId} className="hover:bg-gray-50/50 transition">
                      <td className="py-4 px-4 font-bold text-[#0A1A2F]">
                        {v.property_title || v.property}
                      </td>
                      <td className="py-4 px-4 text-gray-500">
                        {v.agent_name || v.agent || 'System Agent'}
                      </td>
                      <td className="py-4 px-4 font-semibold text-gray-700">
                        {v.date} at {v.time}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          (v.status === 'Confirmed' || v.status === 'confirmed') 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                            : 'bg-amber-50 text-amber-600 border border-amber-200'
                        }`}>
                          {v.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleViewing;