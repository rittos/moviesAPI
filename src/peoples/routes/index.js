import express from 'express';
import PeoplesController from '../controllers';
import AccountController from '../../accounts/controllers';

const createPeopleRouter = (dependencies) => {
    const router = express.Router();
    // load controllers with dependencies
    const peoplesController = PeoplesController(dependencies);
    const accountsController = AccountController(dependencies);

    // router.route('/*')
    //     .all(accountsController.verifyToken);

    router.route('/:id')
        .get(peoplesController.getPeopleById);

    router.route('/')
        .get(peoplesController.getPopularPeoples);

    router.route('/:id/movie_credits')
        .get(peoplesController.getMovieCredits);
    router.route('/latest/all')
        .get(peoplesController.getLatestPeoples);

    return router;
};
export default createPeopleRouter;