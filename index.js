import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './src/movies';
import createAccountsRouter from './src/accounts/routes';
import db from './src/config/db';
import createMoviesRouter from './src/movies/routes';
import AccountsRepositoryMongo from './src/accounts/repositories/mongo/AccountRepository';
import Authenticator from './src/accounts/security/bcrypt';
import TokenManager from './src/accounts/security/jwt';
import MovieRepository from './src/movies/repositories/mongo/movieRepository';

dotenv.config();

const app = express();
db.init();
const port = process.env.PORT;

// const dependencies = buildDependencies();
const dependencies = {
  accountRepository : new AccountsRepositoryMongo(),
  authenticator: new Authenticator(),
  tokenManager: new TokenManager(),
  movieRepository: new MovieRepository()
};
const errorHandler1 = (err, req, res, next) => {
  console.log('in error handler');
  console.log(err);
  res.status(500).end('something went wrong!');
};
//Application Middleware
app.use(express.json());
app.get('/', (req, res) => { res.end('All Good!'); });

// app.use('/api/movies', moviesRouter);
app.use('/api/accounts', createAccountsRouter(dependencies));
app.use('/api/movies', createMoviesRouter(dependencies));
app.use(errorHandler1);
app.listen(port, () => {
  console.info(`Server running at ${port}`);
});