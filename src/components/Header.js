import React from 'react';

const Header = ({ 
  searchValue, 
  setSearchValue, 
  toggleShowFavourites, 
  showFavourites, 
  categories, 
  category, 
  handleCategoryChange 
}) => {
  return (
    <header className="app-header">
      <h1>All Movies</h1>
      <div className="search-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="search-input"
          />
        </div>
        <button className="favourites-btn" onClick={toggleShowFavourites}>
          {showFavourites ? 'Show All Movies' : 'Show Favourites'}
        </button>
      </div>

      {/* Category filter buttons */}
      <div className="category-buttons">
        {categories.map((cat) => (
          <button 
            key={cat} 
            className={`category-btn ${category === cat ? 'active' : ''}`} 
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Header;
