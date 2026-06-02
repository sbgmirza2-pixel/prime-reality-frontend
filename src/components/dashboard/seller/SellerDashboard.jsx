import React, { useState } from 'react';
// 📂 Naye chote component ko import kar rahe hain
import AddProperty from '../../../components/dashboard/seller/AddProperty'; 

const SellerDashboard = () => {
  // ⚡ Tab & State Management
  const [activeTab, setActiveTab] = useState('overview'); 
  const [propertyImages, setPropertyImages] = useState([]); 

  // Dynamic Properties State
  const [propertiesList, setPropertiesList] = useState([
    { id: 1, title: 'Luxury 3-BHK Villa', property_type: 'villa', price: '230000', bedrooms: '3', bathrooms: '3', area_sqft: '2500', address: 'Casablanca', status: 'pending' },
    { id: 2, title: 'Penthouse Studio', property_type: 'penthouse', price: '450000', bedrooms: '2', bathrooms: '2', area_sqft: '1800', address: 'Downtown', status: 'approved' }
  ]);

  // Dynamic Inquiries State
  const [inquiriesList, setInquiriesList] = useState([
    { id: 1, buyer: 'Rahul Sharma', email: 'rahul@gmail.com', phone: '+212 612-3456', property: 'Luxury 3-BHK Villa, Casablanca', message: 'Hi, I am interested in this villa. Please share final pricing and visit schedule.', date: 'Aaj, 4:30 PM', status: 'Pending' },
    { id: 2, buyer: 'Aisha Khan', email: 'aisha.k@yahoo.com', phone: '+212 678-9012', property: 'Penthouse Studio, Downtown', message: 'Is this unit negotiable? Ready to make an advance deposit this week.', date: 'Kal, 11:15 AM', status: 'Replied' },
    { id: 3, buyer: 'Zayan Malik', email: 'zayan@outlook.com', phone: '+212 654-3210', property: 'Modern 4-BHK Villa, Coastline', message: 'Please provide the floor plan and registration documents.', date: '25 May, 6:00 PM', status: 'Replied' }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    property_type: 'apartment',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area_sqft: '',
    address: '',
    description: ''
  });

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Image Upload Preview Engine
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    setPropertyImages([...propertyImages, ...newPreviews]);
  };

  const removeImage = (index) => {
    setPropertyImages(propertyImages.filter((_, i) => i !== index));
  };

  // FORM SUBMIT: Property Add Karna
  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newProperty = {
      id: Date.now(), 
      title: formData.title,
      property_type: formData.property_type,
      price: formData.price,
      bedrooms: formData.bedrooms,
      bathrooms: formData.bathrooms,
      area_sqft: formData.area_sqft,
      address: formData.address,
      status: 'pending' 
    };

    setPropertiesList([newProperty, ...propertiesList]);
    alert(`🎉 Success! "${formData.title}" add ho gayi hai.`);
    
    setFormData({ title: '', property_type: 'apartment', price: '', bedrooms: '', bathrooms: '', area_sqft: '', address: '', description: '' });
    setPropertyImages([]);
    setActiveTab('manage-listings');
  };

  // 🗑️ Property Delete Logic
  const handleDeleteProperty = (id, title) => {
    const confirmDelete = window.confirm(`Kya aap waqai "${title}" ko delete karna chahti hain?`);
    if (confirmDelete) {
      setPropertiesList(propertiesList.filter(prop => prop.id !== id));
    }
  };

  // 💬 INQUIRY STATUS TOGGLE
  const toggleInquiryStatus = (id) => {
    const updatedInquiries = inquiriesList.map(inq => {
      if (inq.id === id) {
        return { ...inq, status: inq.status === 'Pending' ? 'Replied' : 'Pending' };
      }
      return inq;
    });
    setInquiriesList(updatedInquiries);
  };

  return (
    <section 
      className="min-h-screen w-full bg-[#F4F6F9] font-inter text-[#0A1A2F] flex overflow-x-hidden overflow-y-auto relative"
      style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        html::-webkit-scrollbar, body::-webkit-scrollbar, section::-webkit-scrollbar, div::-webkit-scrollbar {
          display: none !important; width: 0 !important; background: transparent !important;
        }
        html, body, #root { overflow-x: hidden !important; margin: 0 !important; padding: 0 !important; }
      `}} />

      {/* SIDEBAR BLOCK */}
      <div className="w-64 bg-[#0A1A2F] text-white flex flex-col justify-between hidden md:flex shrink-0 z-20 shadow-xl">
        <div className="p-6">
          <div className="text-xl font-serif font-bold tracking-[0.2em] text-[#C9A03D] uppercase border-b border-gray-800 pb-4">
            PRIME REALITY
          </div>
          <nav className="mt-8 space-y-2">
            <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold text-sm transition ${activeTab === 'overview' ? 'bg-[#C9A03D]/20 text-[#C9A03D]' : 'hover:bg-white/5 text-gray-300'}`}>
              <span>📊</span> <span>Overview Dashboard</span>
            </button>
            
            <button onClick={() => setActiveTab('manage-listings')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold text-sm transition ${activeTab === 'manage-listings' ? 'bg-[#C9A03D]/20 text-[#C9A03D]' : 'hover:bg-white/5 text-gray-300'}`}>
              <span>📋</span> <span>Manage Listings</span>
            </button>
            <button onClick={() => setActiveTab('track-inquiries')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold text-sm transition ${activeTab === 'track-inquiries' ? 'bg-[#C9A03D]/20 text-[#C9A03D]' : 'hover:bg-white/5 text-gray-300'}`}>
              <span>💌</span> <span>Track Inquiries</span>
            </button>
            <button onClick={() => setActiveTab('add-property')} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-semibold text-sm transition ${activeTab === 'add-property' ? 'bg-[#C9A03D]/20 text-[#C9A03D]' : 'hover:bg-white/5 text-gray-300'}`}>
              <span>➕</span> <span>Add Property</span>
            </button>
          </nav>
        </div>
        <div className="p-6 border-t border-gray-800 text-gray-400 tracking-widest uppercase text-[10px]">Seller Panel</div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-grow p-6 md:p-10 overflow-y-auto h-screen">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-wide uppercase">Seller Overview</h1>
                <p className="text-gray-500 text-xs font-semibold uppercase mt-1">Live listings health status</p>
              </div>
              <button onClick={() => setActiveTab('add-property')} className="bg-[#0A1A2F] text-[#C9A03D] text-xs font-bold tracking-widest px-5 py-3 rounded-xl uppercase shadow-md">
                + New Listing
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <span className="text-gray-400 text-xs font-bold uppercase block">Total Properties</span>
                <span className="text-3xl font-bold block mt-2">{propertiesList.length}</span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <span className="text-gray-400 text-xs font-bold uppercase block">Pending Approval</span>
                <span className="text-3xl font-bold text-amber-500 block mt-2">
                  {propertiesList.filter(p => p.status === 'pending').length}
                </span>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <span className="text-gray-400 text-xs font-bold uppercase block">Pending Inquiries</span>
                <span className="text-3xl font-bold text-blue-500 block mt-2">
                  {inquiriesList.filter(i => i.status === 'Pending').length}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 🎬 TAB 2: CLEAN DETACHED ADD PROPERTY COMPONENT */}
        {activeTab === 'add-property' && (
          <AddProperty 
            formData={formData}
            handleInputChange={handleInputChange}
            handleImageChange={handleImageChange}
            propertyImages={propertyImages}
            removeImage={removeImage}
            handleFormSubmit={handleFormSubmit}
          />
        )}

        {/* TAB 3: MANAGE LISTINGS */}
        {activeTab === 'manage-listings' && (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 animate-fadeIn">
            <h2 className="text-xl font-serif font-bold text-[#0A1A2F] uppercase border-l-4 border-[#C9A03D] pl-3 mb-6">
              MANAGE MY LISTINGS
            </h2>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-bold text-gray-400 tracking-widest uppercase bg-gray-50">
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Beds/Baths</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs font-medium">
                  {propertiesList.map((prop) => (
                    <tr key={prop.id} className="hover:bg-gray-50/50 transition">
                      <td className="py-4 px-4 font-bold text-[#0A1A2F]">{prop.title}</td>
                      <td className="py-4 px-4 text-gray-500 uppercase text-[10px] font-bold">{prop.property_type}</td>
                      <td className="py-4 px-4 font-bold text-gray-700">${Number(prop.price).toLocaleString()}</td>
                      <td className="py-4 px-4 text-gray-400">{prop.bedrooms}B / {prop.bathrooms}B ({prop.area_sqft} sqft)</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase ${
                          prop.status === 'pending' ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        }`}>
                          {prop.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button onClick={() => handleDeleteProperty(prop.id, prop.title)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg text-[10px] tracking-wider border border-transparent hover:border-red-200 cursor-pointer uppercase font-bold">
                          🗑️ Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: TRACK INQUIRIES */}
        {activeTab === 'track-inquiries' && (
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 animate-fadeIn">
            <h2 className="text-xl font-serif font-bold text-[#0A1A2F] uppercase border-l-4 border-[#C9A03D] pl-3 mb-6">
              BUYER INQUIRIES LOG
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {inquiriesList.map((inq) => (
                <div key={inq.id} className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-sm transition">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center space-x-3">
                      <span className="font-bold text-sm text-[#0A1A2F]">{inq.buyer}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider ${
                        inq.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {inq.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">
                      📧 {inq.email} | 📞 {inq.phone}
                    </p>
                    <p className="text-xs text-gray-500 font-bold border-l-2 border-gray-300 pl-2">
                      🏠 Asset: <span className="text-[#0A1A2F]">{inq.property}</span>
                    </p>
                    <p className="text-xs text-gray-600 bg-white p-3 rounded-xl border border-gray-100 shadow-inner mt-1 italic">
                      "{inq.message}"
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row md:flex-col items-end justify-between shrink-0 gap-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{inq.date}</span>
                    <button 
                      onClick={() => toggleInquiryStatus(inq.id)}
                      className={`px-4 py-2 rounded-xl font-bold text-[10px] tracking-wider uppercase border transition cursor-pointer ${
                        inq.status === 'Pending' 
                          ? 'bg-[#0A1A2F] text-white hover:bg-[#C9A03D] hover:text-[#0A1A2F]' 
                          : 'bg-white text-gray-400 border-gray-200 hover:text-red-500 hover:bg-red-50'
                      }`}
                    >
                      {inq.status === 'Pending' ? '✓ Mark as Replied' : '↺ Mark Pending'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default SellerDashboard;