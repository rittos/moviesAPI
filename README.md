# Assignment 2 - Web API.

Name: Ritto Poovathingal Thimothy

## Overview

> APIs for interacting with tmdb endpoints, account creation, authentication, favorites feature & fantasy movie feature

## Installation Requirements

- Download and install Node.js by selecting the relevant installer for your OS:
- Download link : https://nodejs.org/dist/v14.17.6/

Clone API repository from Git Hub.
```bat
git clone https://github.com/rittos/moviesAPI.git
```

- Navigate to cloned repository using terminal and run below command to install all required dependancies.
```bat
npm install
```

- Download and install MongoDB by selecting the relevant installer for your OS: https://www.mongodb.com/download-center/community
- Follow the instructions and accept all defaults.
- This should create and start the Mongodb service on your local host.

## API Configuration

Create a .env file in the root folder and replace below configuration with correponding values.

- Provide mongo db url for DATABASE_URL.
- Provide TMDB API Access key for TMDB_KEY
- Provide Authentcation secret encryption/decryption key for JWT_SECRET_KEY
- Provide API host name for HOST
- Provide API hosting port for PORT
- Provide environment name for NODE_ENV
- Provide azure storage account name for AZURE_STORAGE_ACCOUNT_NAME
- Provide azure storage access key for AZURE_STORAGE_ACCESS_KEY
- Provide azure storage table name for AZURE_STORAGE_TABLE_NAME
- Errors are logged into console, local storage file and azure storage as well.Implemented error log levels are given below.  
error : Only log request and response details along with error when error occured.  
info  : Log complete info including each request and response.  

```bat
NODE_ENV=development
PORT=8080
HOST=localhost
TMDB_KEY=
DATABASE_URL=
DATABASE_DIALECT=mongo
JWT_SECRET_KEY=
AZURE_STORAGE_ACCOUNT_NAME=
AZURE_STORAGE_ACCESS_KEY=
AZURE_STORAGE_TABLE_NAME=
AZURE_ERROR_LOG_LEVEL = error
File_ERROR_LOG_LEVEL = error
CONSOLE_ERROR_LOG_LEVEL = info
```

## Start-up

- To start the API navigate to root folder type below command in terminal.

```bat
npm start
```
- The above command will invoke start script "nodemon --exec babel-node index.js".
- To stop the API use CTRL + C in the terminal.

## API Design

[SwaggerHub Doc](https://app.swaggerhub.com/apis-docs/rittos/movies-api/1.0.0)

## Security and Authentication

- implemented json web token (jwt) based authentication 
- When user login using emailid and password, security token api verifies the user email and password with the data stored in the mongo db.
- If an account with same username and password exist in database, it uses a secret key (JWT_SECRET_KEY) from .env for encryption and decryption and returns a json token back.
- This json token is stored in browser local storage of user.
- The same token is used for authenticating subsequent request made by the same user.
- json token is passed along with each request with Authorization header which is then verified using verify token middlewear at the api side.

Protected Routes :

| PATH                                           | GET                       | POST                          | PUT                      | DELETE                 |
| -----------------------------------------------| ------------------------- | ----------------------------- | ------------------------ | ---------------------- |
| /api/accounts/email/{email}                    | Fetch account by email    | N/A                           | N/A                      | N/A                    |
| /api/movies/{movieid}/movie_reviews            | Get Movie Reviews         | N/A                           | N/A                      | N/A                    |
| /api/accounts/{userid}/favourites              | Get favourites by userid  | Add new favorite movie        | N/A                      | N/A                    |
| /api/movies/{movieid}/movie_images             | Fetch movie images        | N/A                           | N/A                      | N/A                    |
| /api/people/{peopleid}/movie_credits           | Fetch movie credits       | N/A                           | N/A                      | N/A                    |
| /api/people/{peopleid}                         | Fetch people details      | N/A                           | N/A                      | N/A                    |
| /api/movies/{userid}/fantasymovie              | Fetch fantasy movie       | Add a fantasy movie           | Update fantasy movie     | Delete fantasy movie   |
| /api/movies/{movieid}                          | Fetch movie details       | N/A                           | N/A                      | N/A                    |
| /api/accounts/{userid}                         | Fetch an account by userid| N/A                           | N/A                      | N/A                    |
| /api/accounts/deleteFavourite                  | N/A                       | Delete a favorite movie       | N/A                      | N/A                    |
| /api/movies/{userid}/fantasymovie/uploadposter | N/A                       | upload fantasy movie poster   | N/A                      | N/A                    |


### Design

- movie API uses mongoDB for persistence. There are 2 collections namely accounts and fantasymovies.
- Nested document structure implemented for fantasymovies collection. Posterimage is another document embedded inside fantasymovies document.
- Seperate folder structure with new controller, services routes implemented for people related apis.
- Added new utils component for uploading poster image to server.
- joi validation added for fantasymovie including regular expression validation for date format.

## Integrating with React App

- Authorization header used to send JWT Bearer token on protected API calls.
- Host Server Base url provided as environment configuration in react app API_BASE_URL
- React App git hub link : https://github.com/rittos/moviesApp

~~~Javascript
export const addFantasyMovie = (userId, name, genreId, runtime, overview, releaseDt, actorIds) => {
    return fetch(`${API_BASE_URL}/api/movies//${userId}/fantasymovie`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method: 'post',
        body: JSON.stringify({ userId: userId, name: name, genreId: genreId, runtime: runtime, overview: overview, releaseDt: releaseDt,actorIds: actorIds })
    }).then(res => res.json())
};

~~~

## Extra features

- User Registration implemented using email & password.
- Authentication to API is implemented using JWT Token and added validation of the token passed on protected routes.
- Used 3rd party package bunyan for better logging of info or error based on cofiguration in console, local storage file (https://www.npmjs.com/package/bunyan)
- Used 3rd party bunyan-azure package for logging info error based on configuration in azure storage portal (https://npm.io/package/bunyan-azure)
- Used multer package for handling multipart/form-data for poster image upload (https://www.npmjs.com/package/multer)
- joi validation added for fantasymovie including regular expression validation for date format.
- Poster image file uplaod using multer miidlewear.
- Delete API implementation using "post" action verb for deleting favorites and using action verb "delete" for fantasy movie deletion.
- Integration Testing using postman test cases.
- Newman Automation report generated and committed to git hub (https://github.com/rittos/moviesAPI/blob/master/tests/reports/report.html)

## Independent learning.

- azure hosting and logging of React App (https://web-development-moviesapp.azurewebsites.net) & Nodejs API (https://web-development-moviesapi.azurewebsites.net)
- error logging to azure storage tables and local storage files.
- Swagger Documentation and published in swagger hub. All api can be accessed from swagger documentation.
- git hub develop and release branches, tags and releases.
- cors package added and used for allowing calls to API from different host.

 
