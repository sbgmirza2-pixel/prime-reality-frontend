import React, { useState } from 'react';

const AdminDashboard = () => {
  // ⚡ Tab Management
  const [activeTab, setActiveTab] = useState('property-approvals');

  // 🏠 Mock Data: Properties for Approval (With Pending/Approved/Rejected Status)
  const [adminProperties, setAdminProperties] = useState([
    { id: 1, title: 'Luxury 3-BHK Villa', seller: 'Saleha (Seller)', price: '230000', type: 'villa', status: 'pending', isFeatured: false },
    { id: 2, title: 'Penthouse Studio', seller: 'John Doe', price: '450000', type: 'penthouse', status: 'approved', isFeatured: true },
    { id: 3, title: 'Modern 4-BHK Mansion', seller: 'Alex Smith', price: '890000', type: 'villa', status: 'pending', isFeatured: false },
    { id: 4, title: 'Commercial Office Space', seller: 'Zayan Malik', price: '150000', type: 'commercial', status: 'rejected', isFeatured: false }
  ]);

  // 👥 Mock Data: User Management
  const [usersList, setUsersList] = useState([
    { id: 101, name: 'Rahul Sharma', email: 'rahul@gmail.com', role: 'buyer', status: 'active' },
    { id: 102, name: 'Aisha Khan', email: 'aisha.k@yahoo.com', role: 'seller', status: 'active' },
    { id: 103, name: 'Zayan Malik', email: 'zayan@outlook.com', role: 'seller', status: 'active' },
    { id: 104, name: 'Kabir Malhotra', email: 'kabir@gmail.com', role: 'buyer', status: 'blocked' }
  ]);

  // 🛠️ Action Handlers: Property Status Change
  const handlePropertyStatus = (id, newStatus) => {
    const updated = adminProperties.map(prop => 
      prop.id === id ? { ...prop, status: newStatus } : prop
    );
    setAdminProperties(updated);
  };

  // ⭐ Action Handlers: Toggle Featured Switch
  const handleToggleFeatured = (id) => {
    const updated = adminProperties.map(prop => 
      prop.id === id ? { ...prop, isFeatured: !prop.isFeatured } : prop
    );
    setAdminProperties(updated);
  };

  // 🚫 Action Handlers: Toggle User Block/Unblock Status
  const handleToggleUserStatus = (id) => {
    const updated = usersList.map(user => 
      user.id === id ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' } : user
    );
    setUsersList(updated);
  };

  return (
    <section 
      className="min-h-screen w-full bg-[#F4F6F9] font-inter text-[#0A1A2F] flex overflow-x-hidden overflow-y-auto relative"
      style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
    >
      {/* FORCE HIDE ALL SCROLLBARS */}
      <style dangerouslySetInnerHTML={{__html: `
        html::-webkit-scrollbar, body::-webkit-scrollbar, section::-webkit-scrollbar, div::-webkit-scrollbar {
          display: none !important; width: 0 !important; background: transparent !important;
        }
        html, body, #root { overflow-x: hidden !important; margin: 0 !important; padding: 0 !important; }
      `}} />

      {/* ADMIN SIDEBAR NAVIGATION */}
      <div className="w-64 bg-[#0A1A2F] text-white flex flex-col justify-between hidden md:flex shrink-0 z-20 shadow-xl">
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
        <div className="p-6 border-t border-gray-800 text-gray-400 tracking-widest uppercase text-[10px]">Admin Control Panel</div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-grow p-6 md:p-10 overflow-y-auto h-screen">
        
        {/* TAB 1: PROPERTY APPROVALS SECTION */}
        {activeTab === 'property-approvals' && (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 animate-fadeIn">
            <div className="border-b border-gray-100 pb-4 mb-6">
              <h2 className="text-2xl font-serif font-bold text-[#0A1A2F] uppercase border-l-4 border-[#C9A03D] pl-3">
                PROPERTY VERIFICATION PIPELINE
              </h2>
              <p className="text-gray-400 text-xs font-semibold uppercase mt-1">Review, Approve, Reject or Feature incoming agent listings</p>
            </div>
            
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 tracking-widest uppercase bg-gray-50">
                    <th className="py-3 px-4">Listing Title</th>
                    <th className="py-3 px-4">Seller/Agent</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4 text-center">Verification Status</th>
                    <th className="py-3 px-4 text-center">Featured Switch</th>
                    <th className="py-3 px-4 text-center">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs font-medium">
                  {adminProperties.map((prop) => (
                    <tr key={prop.id} className="hover:bg-gray-50/50 transition">
                      <td className="py-4 px-4 font-bold text-[#0A1A2F]">
                        <div className="flex flex-col">
                          <span>{prop.title}</span>
                          <span className="text-[10px] uppercase font-bold text-gray-400 mt-0.5">{prop.type}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600 font-semibold">{prop.seller}</td>
                      <td className="py-4 px-4 font-bold text-gray-700">${Number(prop.price).toLocaleString()}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase ${
                          prop.status === 'pending' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                          prop.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                          'bg-red-50 text-red-600 border border-red-200'
                        }`}>
                          {prop.status}
                        </span>
                      </td>
                      {/* ⭐ Featured Toggle Switch */}
                      <td className="py-4 px-4 text-center">
                        <button 
                          disabled={prop.status !== 'approved'}
                          onClick={() => handleToggleFeatured(prop.id)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-[10px] tracking-wider uppercase transition cursor-pointer ${
                            prop.status !== 'approved' ? 'bg-gray-100 text-gray-300 cursor-not-allowed' :
                            prop.isFeatured ? 'bg-amber-400 text-[#0A1A2F] shadow-sm' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          {prop.isFeatured ? '★ Featured' : '☆ Standard'}
                        </button>
                      </td>
                      {/* 🛠️ Action Buttons */}
                      <td className="py-4 px-4 text-center space-x-2">
                        {prop.status === 'pending' ? (
                          <>
                            <button onClick={() => handlePropertyStatus(prop.id, 'approved')} className="px-3 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg font-bold text-[10px] uppercase tracking-wider transition cursor-pointer">
                              Approve
                            </button>
                            <button onClick={() => handlePropertyStatus(prop.id, 'rejected')} className="px-3 py-1.5 bg-red-500 text-white hover:bg-red-600 rounded-lg font-bold text-[10px] uppercase tracking-wider transition cursor-pointer">
                              Reject
                            </button>
                          </>
                        ) : (
                          <button onClick={() => handlePropertyStatus(prop.id, 'pending')} className="text-gray-400 hover:text-[#0A1A2F] underline text-[10px] font-bold uppercase tracking-wider transition">
                            Reset to Review
                          </button>
                        )}
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
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 animate-fadeIn">
            <div className="border-b border-gray-100 pb-4 mb-6">
              <h2 className="text-2xl font-serif font-bold text-[#0A1A2F] uppercase border-l-4 border-[#C9A03D] pl-3">
                PLATFORM USER ACCESS CONTROL
              </h2>
              <p className="text-gray-400 text-xs font-semibold uppercase mt-1">Manage platform accounts, review credentials and restrict access</p>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 tracking-widest uppercase bg-gray-50">
                    <th className="py-3 px-4">User ID</th>
                    <th className="py-3 px-4">Full Name</th>
                    <th className="py-3 px-4">Email Address</th>
                    <th className="py-3 px-4 text-center">Account Role</th>
                    <th className="py-3 px-4 text-center">Account Status</th>
                    <th className="py-3 px-4 text-center">Access Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs font-medium">
                  {usersList.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition">
                      <td className="py-4 px-4 text-gray-400 font-bold">#{user.id}</td>
                      <td className="py-4 px-4 font-bold text-[#0A1A2F]">{user.name}</td>
                      <td className="py-4 px-4 text-gray-500">{user.email}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          user.role === 'seller' ? 'bg-[#C9A03D]/10 text-[#C9A03D]' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase ${
                          user.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      {/* 🚫 Block/Unblock Button */}
                      <td className="py-4 px-4 text-center">
                        <button 
                          onClick={() => handleToggleUserStatus(user.id)}
                          className={`px-3 py-1.5 rounded-lg font-bold text-[10px] tracking-wider uppercase border transition cursor-pointer ${
                            user.status === 'active' 
                              ? 'border-red-200 text-red-500 hover:bg-red-50' 
                              : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                          }`}
                        >
                          {user.status === 'active' ? '🚫 Block User' : '✓ Unblock User'}
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