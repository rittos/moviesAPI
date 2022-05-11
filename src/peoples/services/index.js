import axios from 'axios';

export default {

    getPopularPeoples: async (query) => {
      const response = await axios.get(
          `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_KEY}&language=en-US&${query}`
        );
        return response.data;
    },
    getPeopleById: async (id) => {
      const response = await axios.get(
          `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_KEY}`
        );
        return response.data;
    },
    getMovieCredits: async (id) => {
      const response = await axios.get(
          `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${process.env.TMDB_KEY}`
        );
        return response.data;
    },
    getLatestPeoples: async () => {
      const response = await axios.get(
          `https://api.themoviedb.org/3/person/latest?api_key=${process.env.TMDB_KEY}`
        );
        return response.data;
    },
  };