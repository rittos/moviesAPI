import accountService from "../services";
import logger  from 'logops';

export default (dependencies) => {

    const createAccount = async (request, response, next) => {
        try{
        // Input
        const { firstName, lastName, email, password } = request.body;
        // Treatment
        const account = await accountService.registerAccount(firstName, lastName, email, password, dependencies);
        //const output = dependencies.accountsSerializer.serialize(account);
        //output
        response.status(201).json(account)
        }catch(err){
            next(new Error(`Create account ${err.message}`));
        }
    };
    const getAccount = async (request, response, next) => {
        try{
        //input
        const accountId = request.params.id;
        // Treatment
        const account = await accountService.getAccount(accountId, dependencies);
        // const output = dependencies.accountsSerializer.serialize(account);
        //output
        response.status(200).json(account);
        }catch(err){
            next(new Error(`Fetch account ${err.message}`));
        }
    };
    const listAccounts = async (request, response, next) => {
        try{
        // Treatment
        const accounts = await accountService.find(dependencies);
        //output
        response.status(200).json(accounts);
        }catch(err){
            next(new Error(`Fetch all account ${err.message}`));
        }
    };

    const authenticateAccount = async (request, response, next) => {
        try {
            const { email, password } = request.body;
            // console.info("email:" + email);
            // console.info("pwd:" + password);
            const token = await accountService.authenticate(email, password, dependencies);
            response.status(200).json({ token: `BEARER ${token}` });
        } catch (error) {
            request.log.error("Unauthorised");
            response.status(401).json({ message: 'Unauthorised' });
        }
    };
    const verifyToken = async (request, response, next) => {
        try { 
            // Input
            const authHeader = request.headers.authorization;
            // Treatment
            const accessToken = authHeader.split(" ")[1];
            const user = await accountService.verifyToken(accessToken, dependencies);

            //output
            next();
        }catch(err){
            //Token Verification Failed
            next(new Error(`Verification Failed ${err.message}`));
            }
        };
    const addFavourite = async (request, response, next) => {
        try {
            const { movieId } = request.body;
            const id = request.params.id;
            const account = await accountService.addFavourite(id, movieId, dependencies);
            response.status(200).json(account);
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };
    const getFavourites = async (request, response, next) => {
        try {
            const id = request.params.id;
            
            const favourites = await accountService.getFavourites(id, dependencies);
            response.status(200).json(favourites);
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };

    const deleteFavourite = async (request, response, next) => {
        try {
            const { userId, movieId } = request.body;
            const account = await accountService.deleteFavourite(userId, movieId, dependencies);
            response.status(200).json(account);
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };

    const findByEmail = async (request, response, next) => {
        try{
        //input
        const emailId = request.params.id;
        // Treatment
        const account = await accountService.findByEmail(emailId, dependencies);
        // const output = dependencies.accountsSerializer.serialize(account);
        //output
        response.status(200).json(account);
        }catch(err){
            next(new Error(`find by email ${err.message}`));
        }
    };


    return {
        createAccount,
        getAccount,
        listAccounts,
        authenticateAccount,
        verifyToken,
        addFavourite,
        getFavourites,
        findByEmail,
        deleteFavourite
    };
};