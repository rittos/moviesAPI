import moviesService from "./../services";
import fs from 'fs';
import path from 'path';

  export default (dependencies) => {

      const getMovie = async (request, response, next) => {
        try {
          //input
          const movieId = request.params.id;
          // Treatment
          const movie = await moviesService.getMovie(movieId, dependencies);
          //output
          response.status(200).json(movie);
        } catch (err) {
            next(new Error(`Movies fetch ${err.message}`));
        }
      };
      const find = async (request, response, next) => {
        try {
          //input
          const query = request.query;
          // Treatment
          const accounts = await moviesService.find(query, dependencies);
          //output
          response.status(200).json(accounts);
        } catch (err) {
            next(new Error(`Movies fetch ${err.message}`));
        }
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

    const getGenres = async (request, response, next) => {
      try {
      // Treatment
      const genres = await moviesService.getGenres(dependencies);
      //output
      response.status(200).json(genres);
    } catch (err) {
      next(new Error(`Genres fetch ${err.message}`));
  }
    };
    const getMovieImages = async (request, response, next) => {
      try {
        //input
        const id = request.params.id;
        // Treatment
        const movieimages = await moviesService.getMovieImages(id, dependencies);
        //output
        response.status(200).json(movieimages);
      } catch (err) {
          next(new Error(`Movie images fetch ${err.message}`));
      }
    };
    const getMovieReviews = async (request, response, next) => {
      try {
      //input
      const movieId = request.params.id;
      // Treatment
      const reviews = await moviesService.getMovieReviews(movieId, dependencies);
      //output
      response.status(200).json(reviews);
      } catch (err) {
          next(new Error(`Movie reviews by id fetch ${err.message}`));
      }
   };
   const getUpcomingMovies = async (request, response, next) => {
    try {
      //input
      const query = request.query;
      // Treatment
      const upcomingmovies = await moviesService.getUpcomingMovies(query, dependencies);
      //output
      response.status(200).json(upcomingmovies);
      } catch (err) {
          next(new Error(`Upcoming movies fetch ${err.message}`));
      }
    };
    const getLanguages = async (request, response, next) => {
      try {
        // Treatment
        const languages = await moviesService.getLanguages(dependencies);
        //output
        response.status(200).json(languages);
        } catch (err) {
            next(new Error(`Languages fetch ${err.message}`));
        }
    };
    const searchMovies = async (request, response, next) => {
      try {
        //input
        const query = request.query;
        // Treatment
        const movies = await moviesService.searchMovies(query, dependencies);
        //output
        response.status(200).json(movies);
        } catch (err) {
            next(new Error(`Search movies ${err.message}`));
        }
    };
    const getTopRatedMovies = async (request, response, next) => {
      try {
        //input
        const query = request.query;
        // Treatment
        const movies = await moviesService.getTopRatedMovies(query, dependencies);
        //output
        response.status(200).json(movies);
        } catch (err) {
            next(new Error(`Top rated movies fetch ${err.message}`));
        }
    };
    const getNowPlayingMovies = async (request, response, next) => {
      try {
        //input
        const query = request.query;
        // Treatment
        const movies = await moviesService.getNowPlayingMovies(query, dependencies);
        //output
        response.status(200).json(movies);
        } catch (err) {
            next(new Error(`Now playing movies fetch ${err.message}`));
        }
    };
    const uploadPoster = async (request, response, next) => {
      try {
          // const { name, genreId, runtime, overview, releaseDt, actorIds } = request.body;
          var posterObj = {
            userid: request.params.id, //'testname',// req.body.name,
            img: {
                data: fs.readFileSync(path.join(__dirname+'../../../../imageuploads/' + request.file.filename)),
                contentType: 'image/png'
            }
          };
          const fantasymovie = await moviesService.uploadPoster(posterObj, dependencies);
          response.status(201).json(fantasymovie);
      } catch (err) {
          next(new Error(`Invalid Data ${err.message}`));
      }
    };
      return {
          getMovie,
          find,
          addFantasyMovie,
          getFantasyMovie,
          getGenres,
          getMovieImages,
          getMovieReviews,
          getUpcomingMovies,
          getLanguages,
          searchMovies,
          getTopRatedMovies,
          getNowPlayingMovies,
          uploadPoster
      };
  };