import moviesService from "./../services";

  export default (dependencies) => {

      const getMovie = async (request, response, next) => {
          //input
          const movieId = request.params.id;
          // Treatment
          const movie = await moviesService.getMovie(movieId, dependencies);
          //output
          response.status(200).json(movie);
      };
      const find = async (request, response, next) => {
          //input
          const query = request.query;
          // Treatment
          const accounts = await moviesService.find(query, dependencies);
          //output
          response.status(200).json(accounts);
      };

      const addFantasyMovie = async (request, response, next) => {
        try {
            const { name, genreId, runtime, overview, relaeseDt, actorIds } = request.body;
            const id = request.params.id;
            const fantasymovie = await moviesService.addFantasyMovie(id, name, genreId,runtime,overview,relaeseDt,actorIds, dependencies);
            response.status(201).json(fantasymovie);
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };

      return {
          getMovie,
          find,
          addFantasyMovie
      };
  };