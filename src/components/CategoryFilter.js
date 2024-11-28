import React from 'react';

const CategoryFilter = ({ category, categories, handleCategoryChange }) => {
  return (
    <div className="category-filter">
      <label htmlFor="category">Category: </label>
      <select 
        id="category"
        value={category}
        onChange={handleCategoryChange}
      >
        {categories.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
