# Assignment 2 - Web API.

Name: Ritto Poovathingal Thimothy

## Overview

APIs for interacting with tmdb endpoints, account creation, authentication, favorites feature & fantasy movie creation

## Installation Requirements

Describe what needs to be on the machine to run the API (Node v?, NPM, MongoDB instance, any other 3rd party software not in the package.json). 


Describe getting/installing the software, perhaps:

```bat
git clone http:\myrepo.git
```

followed by installation

```bat
git install
```

## API Configuration
Describe any configuration that needs to take place before running the API. For example, creating an ``.env`` and what variables to put in it. Give an example of how this might be structured/done.
REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE READ.ME., Just placeholders as indicated below:

```bat
NODE_ENV=development
PORT=8080
HOST=
mongoDB=YourMongoURL
secret=YourJWTSecret
```

## Start-up
Describe how to start/stop the API. You could go though the ``scripts:`` property of the *package.json* file.

## API Design
Give an overview of your web API design. If you have your design in Swagger, you can link it or you could use ``npx swagger-markdown -i ./your_swagger_file.yaml`` to generate a markdown version of it. 

[SwaggerHub Doc](https://app.swaggerhub.com/apis-docs/rittos/movies-api/1.0.0)

Alternatively, you could also do similar to the following: 

| PATH                          | GET                       | POST                          | PUT  | DELETE |
| ----------------------------- | ------------------------- | ----------------------------- | ---- | ------ |
| /api/movies                   | Gets a list of movies     | Add A Movie                   | N/A  | N/A    |
| /api/movies/{movieid}         | Get a Movie               | N/A                           | N/A  | N/A    |
| /api/movies/{movieid}/reviews | Get all reviews for movie | Create a new review for Movie | N/A  | N/A    |
| ...                           | ...                       | ...                           | ...  | ...    |

## Security and Authentication

.. Give details of any authentication/ security implemented on the API. Indicate which routes are protected.

json web token (jwt) based authentication 
When user login using emailid and password, security token api verifies the useremail and password with the data stored in mongo db.
If an account with same username and password exist, it returns a json token back.
This json token is stored in browser local storage of user.
The same token is used for authenticating subsequent request made by the same user.
json token is passed along with each request with Authorization header which is then verified using verify token middlewear at the api side.

Protected Routes :

| PATH                                 | GET                       | POST                          | PUT                      | DELETE                 |
| ------------------------------------ | ------------------------- | ----------------------------- | ------------------------ | ---------------------- |
| /api/accounts/email/{email}          | Fetch account by email    | N/A                           | N/A                      | N/A                    |
| /api/movies/{movieid}/movie_reviews  | Get Movie Reviews         | N/A                           | N/A                      | N/A                    |
| /api/accounts/{userid}/favourites    | Get favourites by userid  | Add new favorite movie        | N/A                      | N/A                    |
| /api/movies/{movieid}/movie_images   | Fetch movie images        | N/A                           | N/A                      | N/A                    |
| /api/people/{peopleid}/movie_credits | Fetch movie credits       | N/A                           | N/A                      | N/A                    |
| /api/people/{peopleid}               | Fetch people details      | N/A                           | N/A                      | N/A                    |
| /api/movies/{userid}/fantasymovie    | Fetch fantasy movie       | Add a fantasy movie           | Update fantasy movie     | Delete fantasy movie   |
| /api/movies/{movieid}                | Fetch movie details       | N/A                           | N/A                      | N/A                    |
| /api/accounts/{userid}               | Fetch an account by userid| N/A                           | N/A                      | N/A                    |
| /api/accounts/deleteFavourite        | N/A                       | Delete a favorite movie       | N/A                      | N/A                    |


### Design

.. Give details of the database you used and the Collections. Highlight any extra work you did, for example new Mongo Collections/Entities/Services/Controllers and routers or any changes/additions to existing components.

movie API uses mongoDB for persistence. There are 2 collections namely accounts and fantasymovies.
Nested document structure implemented for fantasymovies collection. posterimage is another document embedded inside fantasymovies document.
Seperate folder structure with new controller, services routes implemented for people related apis.
added new utils for uploading poster image to server.
joi validation added for fantasymovie including regular expression validation for date format.

## Integrating with React App

Describe how you integrated your React app with the API. Perhaps link to the React App repo and give an example of an API call from React App. For example: 

React App git hub link : https://github.com/rittos/moviesApp

~~~Javascript
export const addFantasyMovie = (userId, name, genreId, runtime, overview, releaseDt, actorIds) => {
    return fetch(`/api/movies//${userId}/fantasymovie`, {
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

. . Briefly explain any non-standard features, functional or non-functional (e.g. user registration, authentication) developed for the app

Used express-logging middlewear for better logging of requests and responses (https://www.npmjs.com/package/express-logging)
Used multer middlewear for handling multipart/form-data for poster image upload (https://www.npmjs.com/package/multer)


## Independent learning.

. . State the non-standard aspects of React/Express/Node (or other related technologies) that you researched and applied in this assignment . . 
azure hosting of React App & Nodejs API
Swagger Documentation
git hub branches, tags and release

 
