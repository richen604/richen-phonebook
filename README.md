# richen-phonebook

Visit a production view of the application here at [richen-phonebook](https://richen-phonebook.herokuapp.com/)

Manage your own phone numbers and more with richen-phonebook! This application was built using [NodeJS](https://nodejs.org/en/), [ReactJS](https://reactjs.org/), [MongoDB](https://www.mongodb.com/), [ReduxJS](https://redux.js.org/), [ExpressJS](https://expressjs.com/) and also includes the following frameworks:

- [ReactStrap](https://reactstrap.github.io/) for pre-generated React components
- [Mongoose](https://mongoosejs.com/) for MongoDB
- [nodemon](https://www.npmjs.com/package/nodemon) for hot reloading node applications in development
- [eslint](https://www.npmjs.com/package/eslint) for linting

## Motivation

Originally making this for the [fso2020](https://fullstackopen.com/en/) course, I've decided to maintain it and showcase it.

It shows knowledge of React Hooks, form handling, MongoDB models, and routing in Express.
## Local Development

- `git fork` or `git clone` this repository and save it locally
- run `npm install` to get dependencies
- for development run `npm run dev-server` and `npm run dev-client`
    - make sure all files in `src/services/` point to the correct endpoints
- for production run `npm build` to build the ui and `npm run start` to start the server
    - make sure you change the endpoints in `src/services/` !!!

## Contributing

Fork this repository. Using the above local development changes.

Make a new branch for your changes and add it to the forked repository you created. Name it related to your fix / refactor `eg. hotfix-styling-inputs`. Then, make a pull request with your changes and our team will review it.

## TODO

The majority of the older commits seem vague and I plan to add a changelog to accommodate. However, for now the exercises in the application can be viewed:

- [Part 3: Programming a Server with Nodejs and Express](https://fullstackopen.com/en/part3)
 
 Note the links are for Full Stack Open 2021, and this project is based of Full Stack Open 2020. Nothing much has changed in the curriculum from the looks of it.

