import axios from 'axios';
import FantasyMovie from '../entities/FantasyMovie';

export default {
    getMovie: async (movieId) => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_KEY}`
          );
          return response.data;
    },
    find: async (query) => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&${query}`
          );
          return response.data;
    },
    addFantasyMovie: async  (userId, name, genreId, runtime,overview, releaseDt, actorIds , {movieRepository}) => {
        const fantasyMovie = new FantasyMovie(undefined,userId, name, genreId, runtime, overview, releaseDt,actorIds);
        return movieRepository.persist(fantasyMovie);
      },
    getFantasyMovie: async (userId, {movieRepository}) => {
      return movieRepository.get(userId);
    },

    getGenres: async () => {
      const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}`
        );
        return response.data;
    },
    getMovieImages: async (id, query) => {
      const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}&${query}`
        );
        return response.data;
    },
    getMovieReviews: async (movieId) => {
      const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${process.env.TMDB_KEY}`
        );
        return response.data;
    },
    getUpcomingMovies: async (query) => {
      const response = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&${query}`
        );
        return response.data;
    },
    getLanguages: async () => {
      const response = await axios.get(
          `https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.TMDB_KEY}`
        );
        return response.data;
    },
    searchMovies: async (query) => {
      const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&${query}`
        );
        return response.data;
    },
    getTopRatedMovies: async (query) => {
      const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&${query}`
        );
        return response.data;
    },
    getNowPlayingMovies: async (query) => {
      const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&${query}`
        );
        return response.data;
    },

  };