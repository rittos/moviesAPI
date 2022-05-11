import express from 'express';
import MoviesController from '../controllers';
import AccountController from '../../accounts/controllers';

const createMoviesRouter = (dependencies) => {
    const router = express.Router();
    // load controllers with dependencies
    const moviesController = MoviesController(dependencies);
    const accountsController = AccountController(dependencies);

    // router.route('/*')
    //     .all(accountsController.verifyToken);

    router.route('/:id')
        .get(moviesController.getMovie);

    router.route('/')
        .get(moviesController.find);

    router.route('/:id/fantasymovie')
        .post(moviesController.addFantasyMovie);
    router.route('/:id/fantasymovie')
        .get(moviesController.getFantasyMovie);

    router.route('/genres/all')
        .get(moviesController.getGenres);
    router.route('/:id/movie_images')
        .get(moviesController.getMovieImages);
    router.route('/:id/movie_reviews')
        .get(moviesController.getMovieReviews);
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