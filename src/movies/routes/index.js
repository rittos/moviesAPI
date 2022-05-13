import express from 'express';
import MoviesController from '../controllers';
import AccountController from '../../accounts/controllers';
import MoviesValidator from '../controllers/validation';

const createMoviesRouter = (dependencies) => {
    const router = express.Router();
    // load controllers with dependencies
    const moviesController = MoviesController(dependencies);
    const accountsController = AccountController(dependencies);
    const moviesValidator = MoviesValidator(dependencies);
    // router.route('/*')
    //     .all(accountsController.verifyToken);

    router.route('/:id')
        .get(accountsController.verifyToken,moviesController.getMovie);
    router.route('/')
        .get(moviesController.find);
    router.route('/:id/fantasymovie')
        .post(moviesValidator.validateFantasyMovie, accountsController.verifyToken,moviesController.addFantasyMovie);
    router.route('/:id/fantasymovie')
        .get(accountsController.verifyToken,moviesController.getFantasyMovie);
    router.route('/genres/all')
        .get(moviesController.getGenres);
    router.route('/:id/movie_images')
        .get(accountsController.verifyToken,moviesController.getMovieImages);
    router.route('/:id/movie_reviews')
        .get(accountsController.verifyToken,moviesController.getMovieReviews);
    router.route('/upcoming/all')
        .get(moviesController.getUpcomingMovies);
    router.route('/languages/all')
        .get(moviesController.getLanguages);
    router.route('/search/all')
        .get(moviesController.searchMovies);
    router.route('/top/rated')
        .get(moviesController.getTopRatedMovies);
    router.route('/now/playing')
        .get(moviesController.getNowPlayingMovies);

    return router;
};
export default createMoviesRouter;