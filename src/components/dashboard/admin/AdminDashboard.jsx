import React, { useState } from 'react';

const AdminDashboard = () => {
  // ⚡ Tab Management
  const [activeTab, setActiveTab] = useState('property-approvals');

  // 📝 Form States with Validation
  const [announcement, setAnnouncement] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // 🏠 Mock Data: Properties for Approval
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

  // 🛠️ Action Handlers
  const handlePropertyStatus = (id, newStatus) => {
    setAdminProperties(adminProperties.map(prop => prop.id === id ? { ...prop, status: newStatus } : prop));
  };

  const handleToggleFeatured = (id) => {
    setAdminProperties(adminProperties.map(prop => prop.id === id ? { ...prop, isFeatured: !prop.isFeatured } : prop));
  };

  const handleToggleUserStatus = (id) => {
    setUsersList(usersList.map(user => user.id === id ? { ...user, status: user.status === 'active' ? 'blocked' : 'active' } : user));
  };

  // 📥 Form Submit Handler with Validation
  const handlePostAnnouncement = (e) => {
    e.preventDefault();
    if (announcement.trim().length < 10) {
      setFormError('Announcement must be at least 10 characters long!');
      setFormSuccess('');
      return;
    }
    setFormError('');
    setFormSuccess('System announcement broadcasted successfully!');
    setAnnouncement('');
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
        <div className="p-6 border-t border-gray-800 text-gray-400 tracking-widest uppercase text-[10px]">Admin Control Panel</div>
      </div>

      {/* MAIN MAIN MAIN CONTENT */}
      <div className="flex-grow p-6 md:p-10 overflow-y-auto h-screen">
        
        {/* 📊 ANALYTICS VISUAL CHARTS SECTION */}
        <div className="mb-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Platform Analytics Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Chart/Graph Card 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase">Approval Pipeline Ratio</span>
                <span className="text-emerald-500 font-bold text-xs">↑ 12%</span>
              </div>
              <div className="text-2xl font-bold mb-4">75% Approved</div>
              {/* Visual Graph CSS representation */}
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden flex">
                <div className="bg-emerald-500 h-full" style={{ width: '75%' }}></div>
                <div className="bg-amber-400 h-full" style={{ width: '15%' }}></div>
                <div className="bg-red-500 h-full" style={{ width: '10%' }}></div>
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-semibold uppercase">
                <span>Approved (2)</span> <span>Pending (2)</span>
              </div>
            </div>

            {/* Chart/Graph Card 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase">User Distribution Graph</span>
                <span className="text-blue-500 font-bold text-xs">Active Users</span>
              </div>
              <div className="text-2xl font-bold mb-4">4 Total Accounts</div>
              <div className="flex items-end space-x-2 h-12 pt-2">
                <div className="bg-blue-500 w-full rounded-t" style={{ height: '50%' }} title="Buyers: 2"></div>
                <div className="bg-[#C9A03D] w-full rounded-t" style={{ height: '50%' }} title="Sellers: 2"></div>
                <div className="bg-red-400 w-full rounded-t" style={{ height: '25%' }} title="Blocked: 1"></div>
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-semibold uppercase">
                <span>Buyers</span> <span>Sellers</span> <span>Blocked</span>
              </div>
            </div>

            {/* 📝 ADMIN BROADCAST FORM WITH VALIDATION */}
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
                      <td className="py-4 px-4 text-center space-x-2">
                        {prop.status === 'pending' ? (
                          <>
                            <button onClick={() => handlePropertyStatus(prop.id, 'approved')} className="px-3 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg font-bold text-[10px] uppercase tracking-wider transition">
                              Approve
                            </button>
                            <button onClick={() => handlePropertyStatus(prop.id, 'rejected')} className="px-3 py-1.5 bg-red-500 text-white hover:bg-red-600 rounded-lg font-bold text-[10px] uppercase tracking-wider transition">
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
                      <td className="py-4 px-4 text-center">
                        <button 
                          onClick={() => handleToggleUserStatus(user.id)}
                          className={`px-3 py-1.5 rounded-lg font-bold text-[10px] tracking-wider uppercase border transition ${
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