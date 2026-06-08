import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {getAccessToken, clearAuthData } from '../../../utils/helpers/authHelper';
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('property-approvals');

  // 📝 Form States with Validation
  const [announcement, setAnnouncement] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // 🏠 Real Data States
  const [adminProperties, setAdminProperties] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Base API URL
  const API_BASE_URL = 'http://localhost:8000/api/v1';

  // 🔑 Configuration for Axios Request Header
  const getAuthHeader = () => {
    const token = getToken();
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // 📥 Fetch Pending Properties (Endpoint 7)
  const fetchPendingProperties = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/properties/pending`, getAuthHeader());
      setAdminProperties(response.data); // Real backend array map ho jayega
      setErrorMsg('');
    } catch (err) {
      setErrorMsg('Failed to load pending properties. Make sure you are logged in as Admin.');
    } finally {
      setLoading(false);
    }
  };

  // 👥 Fetch All Users (Endpoint 7)
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/users`, getAuthHeader());
      setUsersList(response.data);
      setErrorMsg('');
    } catch (err) {
      setErrorMsg('Failed to load user management control panel.');
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Load Data Based on Tab Change
  useEffect(() => {
    if (activeTab === 'property-approvals') {
      fetchPendingProperties();
    } else if (activeTab === 'user-management') {
      fetchUsers();
    }
  }, [activeTab]);

  // 🛠️ Action Handlers (Connecting Real API Endpoints)
  
  // Approve Property (PUT /api/v1/admin/properties/{id}/approve)
  const handleApproveProperty = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/admin/properties/${id}/approve`, {}, getAuthHeader());
      // Refresh tree after action
      fetchPendingProperties();
    } catch (err) {
      alert('Error approving property.');
    }
  };

  // Reject Property (PUT /api/v1/admin/properties/{id}/reject)
  const handleRejectProperty = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/admin/properties/${id}/reject`, {}, getAuthHeader());
      fetchPendingProperties();
    } catch (err) {
      alert('Error rejecting property.');
    }
  };

  // Toggle Feature Property (PUT /api/v1/admin/properties/{id}/feature)
  const handleToggleFeatured = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/admin/properties/${id}/feature`, {}, getAuthHeader());
      fetchPendingProperties();
    } catch (err) {
      alert('Error changing featured status.');
    }
  };

  // Delete/Block Account (DELETE /api/v1/admin/users/buyers or /sellers)
  const handleDeleteUser = async (id, role) => {
    if (!window.confirm(`Are you sure you want to permanently delete this ${role} account?`)) return;
    try {
      const endpointRole = role === 'seller' ? 'sellers' : 'buyers';
      await axios.delete(`${API_BASE_URL}/admin/users/${endpointRole}/${id}`, getAuthHeader());
      fetchUsers();
    } catch (err) {
      alert('Error performing account action.');
    }
  };

  // 🔒 LOGOUT BUTTON HANDLER
  const handleLogout = () => {
    clearAuthData(); // LocalStorage clean karega token aur role
    navigate('/login'); // Login screen par wapas phenk dega
  };

  // 📥 Mock Call for AI/Mock alert broadcast
  const handlePostAnnouncement = async (e) => {
    e.preventDefault();
    if (announcement.trim().length < 10) {
      setFormError('Announcement must be at least 10 characters long!');
      setFormSuccess('');
      return;
    }
    // Mocking text generation trigger from Section 8 endpoint
    try {
      setFormError('');
      setFormSuccess('System announcement broadcasted successfully via Backend hooks!');
      setAnnouncement('');
    } catch (err) {
      setFormError('Failed to broadcast.');
    }
  };

  return (
    <section className="min-h-screen w-full bg-[#F4F6F9] font-inter text-[#0A1A2F] flex overflow-x-hidden overflow-y-auto">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-[#0A1A2F] text-white flex flex-col justify-between hidden md:flex shrink-0 shadow-xl">
        <div className="p-6">
          <div className="text-xl font-serif font-bold tracking-[0.2em] text-[#C9A03D] uppercase border-b border-gray-800 pb-4">
            PRIME REALITY
          </div>
          <nav className="mt-8 space-y-2">
            <button onClick={() => setActiveTab('property-approvals')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold text-sm transition ${activeTab === 'property-approvals' ? 'bg-[#C9A03D]/20 text-[#C9A03D]' : 'hover:bg-white/5 text-gray-300'}`}>
              <span>🏢</span> <span>Property Approvals</span>
            </button>
            <button onClick={() => setActiveTab('user-management')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold text-sm transition ${activeTab === 'user-management' ? 'bg-[#C9A03D]/20 text-[#C9A03D]' : 'hover:bg-white/5 text-gray-300'}`}>
              <span>👥</span> <span>User Management</span>
            </button>
          </nav>
        </div>
        
        {/* 🚪 LOGOUT BUTTON IN SIDEBAR CONTAINER */}
        <div className="p-6 border-t border-gray-800 space-y-4">
          <button 
            onClick={handleLogout}
            className="w-full bg-red-600/20 text-red-400 hover:bg-red-600 hover:text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center space-x-2"
          >
            <span>🚪</span> <span>Logout System</span>
          </button>
          <div className="text-gray-400 tracking-widest uppercase text-[10px] text-center">Admin Control Panel</div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-grow p-6 md:p-10 overflow-y-auto h-screen">
        
        {/* Error Notification Bar */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 font-bold text-xs rounded-xl border border-red-200">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="text-sm font-semibold text-[#C9A03D] mb-4 animate-pulse">
            🔄 Contacting Prime Reality Backend API Pipeline...
          </div>
        )}

        {/* 📊 ANALYTICS OVERVIEW */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Platform Analytics Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase">Live Queue Size</span>
              </div>
              <div className="text-2xl font-bold mb-4">{adminProperties.length} Pending Approval</div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full" style={{ width: adminProperties.length > 0 ? '50%' : '0%' }}></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase">Total Access Accounts</span>
              </div>
              <div className="text-2xl font-bold mb-4">{usersList.length} Registered</div>
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            {/* BROADCAST ALERT */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <span className="text-xs font-bold text-gray-400 uppercase block mb-2">System Broadcast Form</span>
              <form onSubmit={handlePostAnnouncement} className="space-y-2">
                <input 
                  type="text" 
                  placeholder="Type system-wide alert..." 
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  className="w-full text-xs p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9A03D]"
                />
                <button type="submit" className="w-full py-1.5 bg-[#0A1A2F] text-white rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-opacity-90 transition">
                  Broadcast Alert
                </button>
              </form>
              {formError && <p className="text-red-500 text-[10px] font-bold mt-1">⚠️ {formError}</p>}
              {formSuccess && <p className="text-emerald-600 text-[10px] font-bold mt-1">✓ {formSuccess}</p>}
            </div>

          </div>
        </div>

        {/* TAB 1: PROPERTY APPROVALS SECTION */}
        {activeTab === 'property-approvals' && (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="border-b border-gray-100 pb-4 mb-6">
              <h2 className="text-2xl font-serif font-bold text-[#0A1A2F] uppercase border-l-4 border-[#C9A03D] pl-3">
                PROPERTY VERIFICATION PIPELINE
              </h2>
            </div>
            
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 tracking-widest uppercase bg-gray-50">
                    <th className="py-3 px-4">Listing Title</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4 text-center">Verification Status</th>
                    <th className="py-3 px-4 text-center">Featured Switch</th>
                    <th className="py-3 px-4 text-center">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs font-medium">
                  {adminProperties.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-400">No properties currently pending review.</td>
                    </tr>
                  ) : adminProperties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-gray-50/50 transition">
                      <td className="py-4 px-4 font-bold text-[#0A1A2F]">
                        <div className="flex flex-col">
                          <span>{prop.title || 'Untitled Property'}</span>
                          <span className="text-[10px] uppercase font-bold text-gray-400 mt-0.5">{prop.property_type || prop.type}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-bold text-gray-700">${Number(prop.price).toLocaleString()}</td>
                      <td className="py-4 px-4 text-center">
                        <span className="px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase bg-amber-50 text-amber-600 border border-amber-200">
                          {prop.status || 'pending'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button 
                          onClick={() => handleToggleFeatured(prop.id)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-[10px] tracking-wider uppercase transition cursor-pointer ${
                            prop.is_featured || prop.isFeatured ? 'bg-amber-400 text-[#0A1A2F] shadow-sm' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          {(prop.is_featured || prop.isFeatured) ? '★ Featured' : '☆ Standard'}
                        </button>
                      </td>
                      <td className="py-4 px-4 text-center space-x-2">
                        <button onClick={() => handleApproveProperty(prop.id)} className="px-3 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg font-bold text-[10px] uppercase tracking-wider transition">
                          Approve
                        </button>
                        <button onClick={() => handleRejectProperty(prop.id)} className="px-3 py-1.5 bg-red-500 text-white hover:bg-red-600 rounded-lg font-bold text-[10px] uppercase tracking-wider transition">
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: USER MANAGEMENT SECTION */}
        {activeTab === 'user-management' && (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="border-b border-gray-100 pb-4 mb-6">
              <h2 className="text-2xl font-serif font-bold text-[#0A1A2F] uppercase border-l-4 border-[#C9A03D] pl-3">
                PLATFORM USER ACCESS CONTROL
              </h2>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 tracking-widest uppercase bg-gray-50">
                    <th className="py-3 px-4">User ID</th>
                    <th className="py-3 px-4">Full Name</th>
                    <th className="py-3 px-4">Email Address</th>
                    <th className="py-3 px-4 text-center">Account Role</th>
                    <th className="py-3 px-4 text-center">Access Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs font-medium">
                  {usersList.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-400">No registered users returned from backend.</td>
                    </tr>
                  ) : usersList.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition">
                      <td className="py-4 px-4 text-gray-400 font-bold">#{user.id}</td>
                      <td className="py-4 px-4 font-bold text-[#0A1A2F]">{user.full_name || user.name}</td>
                      <td className="py-4 px-4 text-gray-500">{user.email}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          user.role === 'seller' ? 'bg-[#C9A03D]/10 text-[#C9A03D]' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button 
                          onClick={() => handleDeleteUser(user.id, user.role)}
                          className="px-3 py-1.5 rounded-lg font-bold text-[10px] tracking-wider uppercase border border-red-200 text-red-500 hover:bg-red-50 transition"
                        >
                          🚫 Delete Account
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default AdminDashboard;