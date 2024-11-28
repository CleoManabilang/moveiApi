import React from 'react';

const Favourites = ({ favourites, removeFavouriteMovie }) => {
  return (
    <div className="favourites-section">
      <h2>Favourites</h2>
      <div className="movie-list">
        {favourites.length === 0 ? (
          <p>No favourites added yet.</p>
        ) : (
          favourites.map((movie) => (
            <div key={movie.imdbID} className="movie-item">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200x300'}
                alt={movie.Title}
                className="movie-poster"
              />
              <div className="movie-details">
                <h3>{movie.Title}</h3>
                <button
                  className="btn-remove"
                  onClick={() => removeFavouriteMovie(movie)}
                >
                  Remove from Favourites
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favourites;
