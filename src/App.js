import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Favourites from './components/Favourites';
import Overlay from './components/Overlay';
import Header from './components/Header'; // Import the new Header component

const API_KEY = '263d22d8';
const BASE_URL = 'http://www.omdbapi.com/';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      favourites: [],
      loading: true,
      page: 1,
      searchValue: '',
      showFavourites: false,
      category: 'All',
      categories: ['All', 'Action', 'Comedy', 'Drama', 'Horror', 'Romance'],
      selectedMovie: null,
    };
  }

  fetchMovies = async () => {
    const { page, searchValue, category } = this.state;
    const categoryQuery = category !== 'All' ? `&genre=${category}` : '';
    const url = `${BASE_URL}?s=${searchValue || 'movie'}&apikey=${API_KEY}&page=${page}${categoryQuery}`;

    try {
      const response = await axios.get(url);
      const newMovies = response.data.Search || [];

      this.setState((prevState) => ({
        movies: [...prevState.movies, ...newMovies],
        loading: false,
      }));
    } catch (error) {
      console.error('Error fetching movies:', error);
      this.setState({ loading: false });
    }
  };

  handleSearchChange = (newSearchValue) => {
    this.setState({ searchValue: newSearchValue, movies: [], page: 1 }, this.fetchMovies);
  };

  addFavouriteMovie = (movie) => {
    const { favourites } = this.state;
    const updatedFavourites = [...favourites, movie];
    this.setState({ favourites: updatedFavourites });
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };

  removeFavouriteMovie = (movie) => {
    const { favourites } = this.state;
    const updatedFavourites = favourites.filter((favourite) => favourite.imdbID !== movie.imdbID);
    this.setState({ favourites: updatedFavourites });
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  };

  loadMoreMovies = () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
        loading: true,
      }),
      this.fetchMovies
    );
  };

  toggleShowFavourites = () => {
    this.setState((prevState) => ({
      showFavourites: !prevState.showFavourites,
    }));
  };

  handleCategoryChange = (selectedCategory) => {
    this.setState({ category: selectedCategory, movies: [], page: 1 }, this.fetchMovies);
  };

  showMovieDetails = (movie) => {
    this.setState({ selectedMovie: movie });
  };

  closeOverlay = () => {
    this.setState({ selectedMovie: null });
  };

  componentDidMount() {
    this.fetchMovies();
    const savedFavourites = JSON.parse(localStorage.getItem('favourites'));
    if (savedFavourites) {
      this.setState({ favourites: savedFavourites });
    }
  }

  render() {
    const {
      movies,
      favourites,
      loading,
      searchValue,
      showFavourites,
      category,
      categories,
      selectedMovie,
    } = this.state;

    const displayMovies = showFavourites ? favourites : movies;

    return (
      <div className="app-container">
        <Header
          searchValue={searchValue}
          setSearchValue={this.handleSearchChange}
          toggleShowFavourites={this.toggleShowFavourites}
          showFavourites={showFavourites}
          categories={categories}
          category={category}
          handleCategoryChange={this.handleCategoryChange}
        />

        {!showFavourites && (
          <div className="movie-list">
            {displayMovies.map((movie) => (
              <div
                key={movie.imdbID}
                className="movie-item"
                onClick={() => this.showMovieDetails(movie)}
              >
                <img
                  src={
                    movie.Poster !== 'N/A'
                      ? movie.Poster
                      : 'https://via.placeholder.com/200x300'
                  }
                  alt={movie.Title}
                  className="movie-poster"
                />
                <div className="movie-details">
                  <h3>{movie.Title}</h3>
                  <p>{movie.Year}</p>
                  <p>{movie.Type}</p>
                  <button
                    className="btn-add"
                    onClick={(e) => {
                      e.stopPropagation();
                      this.addFavouriteMovie(movie);
                    }}
                  >
                    Add to Favourites
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showFavourites && (
          <Favourites
            favourites={favourites}
            removeFavouriteMovie={this.removeFavouriteMovie}
          />
        )}

        {loading && <div className="loading">Loading...</div>}
        {!loading && !showFavourites && (
          <button className="load-more-btn" onClick={this.loadMoreMovies}>
            Load More Movies
          </button>
        )}

        {selectedMovie && (
          <Overlay movie={selectedMovie} closeOverlay={this.closeOverlay} />
        )}
      </div>
    );
  }
}

export default App;
