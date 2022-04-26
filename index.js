import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './src/movies';
import createAccountsRouter from './src/accounts/routes';
// import dependencies from "./src/config/dependencies";
import db from './src/config/db';
import createMoviesRouter from './src/movies/routes';
import AccountsRepositoryMongo from './src/accounts/repositories/mongo/AccountRepository';
import Authenticator from './src/accounts/security/bcrypt';
import TokenManager from './src/accounts/security/jwt';

dotenv.config();

const app = express();
db.init();
const port = process.env.PORT;

// const dependencies = buildDependencies();
const dependencies = {
  accountRepository : new AccountsRepositoryMongo(),
  authenticator: new Authenticator(),
  tokenManager: new TokenManager()
};

//Application Middleware
app.use(express.json());
app.get('/', (req, res) => { res.end('All Good!') });

app.use('/api/movies', moviesRouter);
app.use('/api/accounts', createAccountsRouter(dependencies));
app.use('/api/movies', createMoviesRouter(dependencies));

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});