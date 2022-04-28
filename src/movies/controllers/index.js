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
            const { name, genreId, runtime, overview, releaseDt, actorIds } = request.body;
            const id = request.params.id;
            const fantasymovie = await moviesService.addFantasyMovie(id, name, genreId,runtime,overview,releaseDt,actorIds, dependencies);
            response.status(201).json(fantasymovie);
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };
    const getFantasyMovie = async (request, response, next) => {
        //input
        const userId = request.params.id;
        // Treatment
        const fantasymovie = await moviesService.getFantasyMovie(userId, dependencies);
        //output
        response.status(200).json(fantasymovie);
    };

      return {
          getMovie,
          find,
          addFantasyMovie,
          getFantasyMovie
      };
  };