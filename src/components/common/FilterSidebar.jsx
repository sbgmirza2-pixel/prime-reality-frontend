// reusable filter sidebar
// property listing page me filters ke liye use hoga

function FilterSidebar() {
  return (
    <aside className="bg-white rounded-[28px] p-6 shadow-lg border border-black/5 space-y-5">
      <h3 className="font-heading text-2xl font-bold text-[#0A1A2F]">
        Filter Properties
      </h3>

      <select className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#C9A03D]">
        <option>Property Type</option>
        <option>Apartment</option>
        <option>Villa</option>
        <option>Land</option>
        <option>Commercial</option>
      </select>

      <select className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#C9A03D]">
        <option>Bedrooms</option>
        <option>1 Bedroom</option>
        <option>2 Bedrooms</option>
        <option>3 Bedrooms</option>
        <option>4+ Bedrooms</option>
      </select>

      <input
        type="text"
        placeholder="Location"
        className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#C9A03D]"
      />

      <input
        type="number"
        placeholder="Max Price"
        className="w-full border border-gray-200 rounded-full px-4 py-3 text-sm outline-none focus:border-[#C9A03D]"
      />

      <button
        type="button"
        className="w-full bg-[#0A1A2F] text-white rounded-full py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#C9A03D] hover:text-[#0A1A2F] transition-all duration-300"
      >
        Apply Filters
      </button>
    </aside>
  );
}

export default FilterSidebar;