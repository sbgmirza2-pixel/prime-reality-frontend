// reusable search bar
// hero search, footer search aur property search me use hoga

function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Find your property",
  buttonLabel = "🔍",
  className = "",
}) {
  return (
    <form
      onSubmit={onSubmit}
      className={`w-full bg-white rounded-full p-1.5 flex items-center shadow-md ${className}`}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 bg-transparent px-5 py-3 text-[#0A1A2F] text-xs font-semibold tracking-widest uppercase outline-none placeholder:text-gray-400"
      />

      <button
        type="submit"
        className="w-10 h-10 rounded-full bg-[#0A1A2F] text-white flex items-center justify-center hover:bg-[#C9A03D] hover:text-[#0A1A2F] transition-all duration-300"
      >
        {buttonLabel}
      </button>
    </form>
  );
}

export default SearchBar;