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

  };