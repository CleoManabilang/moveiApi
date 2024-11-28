import React from 'react';

const Overlay = ({ movie, closeOverlay }) => {
  if (!movie) return null; // Don't render if no movie is provided

  return (
    <div className="modal-overlay" onClick={closeOverlay}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeOverlay}>
          ×
        </button>
        <div className="modal-body">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/200x300'}
            alt={movie.Title}
            className="modal-poster"
          />
          <div className="modal-details">
            <h2>{movie.Title}</h2>
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Type:</strong> {movie.Type}</p>
            <p><strong>IMDb ID:</strong> {movie.imdbID}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
