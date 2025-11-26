// src/components/SearchBar.jsx
/* eslint-disable react/prop-types */

function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <div
        className="
          rounded-full
          px-6 py-3
          flex items-center
          bg-slate-900/25
          border border-white/40
          backdrop-blur-lg
          shadow-lg
        "
      >
        <input
          type="text"
          placeholder="Search for Cities..."
          value={value}
          onChange={onChange}
          className="
            w-full
            bg-transparent
            outline-none
            text-sm lg:text-base
            text-slate-50
            placeholder:text-slate-200/70
          "
        />
      </div>
    </form>
  );
}

export default SearchBar;
