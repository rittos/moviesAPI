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

    // router.route('/:id')
    //     .get(moviesController.getMovie);

    // router.route('/')
    //     .get(moviesController.find);

    router.route('/:id/fantasymovie')
        .post(moviesController.addFantasyMovie);

    return router;
};
export default createMoviesRouter;