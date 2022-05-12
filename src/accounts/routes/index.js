import express from 'express';
import AccountsController from '../controllers';
import AccountsValidator from '../controllers/validation';

const createRouter = (dependencies) => {
    const router = express.Router();
    // load controller with dependencies
    const accountsController = AccountsController(dependencies);
    const accountsValidator = AccountsValidator(dependencies);

    // router.route('/')
    // .post(accountsValidator.validateAccount, accountsController.createAccount);

    router.route('/')
        .post(accountsController.createAccount);

    router.route('/')
        .get(accountsController.verifyToken,accountsController.listAccounts);

    router.route('/:id')
        .get(accountsController.verifyToken,accountsController.getAccount);

    // router.route('/:id')
    //     .post(accountsController.getAccount);

    router.route('/security/token')
        .post(accountsController.authenticateAccount);

    router.route('/:id/favourites')
        .post(accountsController.verifyToken,accountsController.addFavourite);
    router.route('/:id/favourites')
        .get(accountsController.verifyToken,accountsController.getFavourites);
    
    router.route('/email/:id')
        .get(accountsController.verifyToken,accountsController.findByEmail);
        

    return router;
};
export default createRouter;