import React from "react";

const FilterBar = ({ filter, onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filter, [name]: value });
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <select
        name="category"
        value={filter.category}
        onChange={handleChange}
        className="border px-4 py-2 rounded"
      >
        <option value="">All Categories</option>
        <option value="Rent">Rent</option>
        <option value="Utility">Utility</option>
        <option value="Grocery">Grocery</option>
        <option value="Misc">Miscellaneous</option>
      </select>

      <input
        type="text"
        name="search"
        placeholder="Search by title..."
        value={filter.search}
        onChange={handleChange}
        className="border px-4 py-2 rounded"
      />
    </div>
  );
};

export default FilterBar;
