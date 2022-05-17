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
import fantasyMovieSchema from './src/movies/validators';
import createPeoplesRouter from './src/peoples/routes';
import cors from 'cors';
import expressLogging  from 'express-logging';
// import logger  from 'logops';
import bunyanAzure from 'bunyan-azure';
import bunyan from 'bunyan';

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
  accountsValidator: accountsSchema,
  moviesValidator: fantasyMovieSchema
};

var logger = bunyan.createLogger({
  name: "moviesAPILogger",                     // logger name
  serializers: {
      req: bunyan.stdSerializers.req,     // standard bunyan req serializer
      err: bunyan.stdSerializers.err      // standard bunyan error serializer
  },
  streams: [
      {
          level: 'info',                  // loging level
          stream: process.stdout          // log INFO and above to stdout
      },
      {
        level: 'error',
        path: __dirname + '/logs/moviesAPI.log'  // log ERROR and above to a file
      },
      {
        level: 'error',
        stream: new bunyanAzure.AzureStream({
          account: process.env.AZURE_STORAGE_ACCOUNT_NAME,
          access_key: process.env.AZURE_STORAGE_ACCESS_KEY,
          table: process.env.AZURE_STORAGE_TABLE_NAME
        })
      }

  ]
});

logger.info({ message: "Application startup" });

app.use(cors());
// express logging middlewear
if(process.env.NODE_ENV === "development")
{
app.use(expressLogging(logger));
}
//Application Middleware
app.use(express.json());
app.get('/', (req, res) => { res.end('All Good!'); });

app.use('/api/accounts',function (req, res, next) {
  req.log = logger;
  next();
}, createAccountsRouter(dependencies));
app.use('/api/movies',function (req, res, next) {
  req.log = logger;
  next();
}, createMoviesRouter(dependencies));
app.use('/api/people',function (req, res, next) {
  req.log = logger;
  next();
}, createPeoplesRouter(dependencies));
app.use(errorHandler);
app.listen(port, () => {
  console.info(`Server running at ${port}`);
});