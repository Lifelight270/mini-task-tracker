import React from "react";

function SearchAndFilter({
  search,
  setSearch,
  filter,
  setFilter,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="toolbar flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-8">
      <input
        className="border border-gray-300 rounded-lg sm:w-80 focus:outline-none focus:border-gray-600"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="dropdown1">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          <option>Pending</option>
          <option>Done</option>
        </select>
      </div>
      <div className="dropdown2">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="name">Sort by Name</option>
        </select>
      </div>
    </div>
  );
}

export default SearchAndFilter;
