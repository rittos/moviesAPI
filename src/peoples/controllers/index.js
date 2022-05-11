import peoplesService from "./../services";

  export default (dependencies) => {

      const getPeopleById = async (request, response, next) => {
        try {
          //input
          const id = request.params.id;
          // Treatment
          const people = await peoplesService.getPeopleById(id, dependencies);
          //output
          response.status(200).json(people);
        } catch (err) {
            next(new Error(`People by id fetch ${err.message}`));
        }
      };
      const getPopularPeoples = async (request, response, next) => {
        try {
          //input
          const query = request.query;
          // Treatment
          const peoples = await peoplesService.getPopularPeoples(query, dependencies);
          //output
          response.status(200).json(peoples);
        } catch (err) {
            next(new Error(`Popular people fetch ${err.message}`));
        }
      };
      const getMovieCredits = async (request, response, next) => {
        try {
          //input
          const id = request.params.id;
          // Treatment
          const credits = await peoplesService.getMovieCredits(id, dependencies);
          //output
          response.status(200).json(credits);
        } catch (err) {
            next(new Error(`Movie credits by id fetch ${err.message}`));
        }
      };
      const getLatestPeoples = async (request, response, next) => {
        try {

          // Treatment
          const people = await peoplesService.getLatestPeoples(dependencies);
          //output
          response.status(200).json(people);
        } catch (err) {
            next(new Error(`Latest people fetch ${err.message}`));
        }
      };

      return {
          getPeopleById,
          getPopularPeoples,
          getMovieCredits,
          getLatestPeoples
      };
  };