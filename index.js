import dotenv from 'dotenv';
import express from 'express';
import errorHandler from './src/utils/ErrorHandler';
import createAccountsRouter from './src/accounts/routes';
import db from './src/config/db';
import createMoviesRouter from './src/movies/routes';
import AccountsRepositoryMongo from './src/accounts/repositories/mongo/AccountRepository';
import Authenticator from './src/accounts/security/bcrypt';
import TokenManager from './src/accounts/security/jwt';
import MovieRepository from './src/movies/repositories/mongo/movieRepository';
import accountsSchema from './src/accounts/validators';
import createPeoplesRouter from './src/peoples/routes';
import cors from 'cors';

dotenv.config();

const app = express();
db.init();
const port = process.env.PORT;

// const dependencies = buildDependencies();
const dependencies = {
  accountRepository : new AccountsRepositoryMongo(),
  authenticator: new Authenticator(),
  tokenManager: new TokenManager(),
  movieRepository: new MovieRepository(),
  accountsValidator: accountsSchema
};

// var allowedOrigins = ['http://localhost:3000',
//                       'https://web-development-moviesapp.azurewebsites.net'];
// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin 
//     // (like mobile apps or curl requests)
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       var msg = 'The CORS policy for this site does not ' +
//                 'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));

app.use(cors());

//Application Middleware
app.use(express.json());
app.get('/', (req, res) => { res.end('All Good!'); });

// app.use('/api/movies', moviesRouter);
app.use('/api/accounts', createAccountsRouter(dependencies));
app.use('/api/movies', createMoviesRouter(dependencies));
app.use('/api/people', createPeoplesRouter(dependencies));
app.use(errorHandler);
app.listen(port, () => {
  console.info(`Server running at ${port}`);
});