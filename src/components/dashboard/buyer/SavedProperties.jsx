import React, { useState } from 'react';

const SavedProperties = () => {
  const [savedList, setSavedList] = useState([
    { id: 1, title: 'Modern Marina Penthouse', price: '620,000', location: 'Marina Bay', type: 'penthouse', image: '✨' },
    { id: 2, title: 'Royal Green Estate Villa', price: '1,250,000', location: 'Beverly Hills', type: 'villa', image: '👑' }
  ]);

  const handleRemove = (id) => {
    setSavedList(savedList.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-100 pb-4">
        <h3 className="text-xl font-serif font-bold text-[#0A1A2F] uppercase border-l-4 border-[#C9A03D] pl-3">
          Saved Luxury Wishlist
        </h3>
        <p className="text-gray-400 text-xs font-semibold uppercase mt-1">Your curated selection of top high-end listings</p>
      </div>

      {savedList.length === 0 ? (
        <p className="text-sm text-gray-400 italic">Koi property saved nahi hai.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {savedList.map((prop) => (
            <div key={prop.id} className="bg-white border border-gray-100 rounded-2xl p-5 flex justify-between items-center shadow-sm hover:shadow-md transition">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#0A1A2F]/5 rounded-xl flex items-center justify-center text-xl">
                  {prop.image}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0A1A2F]">{prop.title}</h4>
                  <p className="text-[10px] text-gray-400 uppercase font-semibold">{prop.location} | <span className="text-[#C9A03D]">{prop.type}</span></p>
                  <p className="text-xs font-bold text-gray-700 mt-1">${prop.price}</p>
                </div>
              </div>
              <button onClick={() => handleRemove(prop.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer">
                ✕ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedProperties;