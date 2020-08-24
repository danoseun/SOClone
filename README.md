# StackOverflow Clone

## Description
The objective of this project is to create a light version of the popular website stackoverflow



## Table of Content

- [Documentation](#documentation)
- [System Requirements](#system-requirements)
- [Technologies](#technologies)
- [Installation](#installation)
- [Testing](#testing)
- [ThoughtProcess](#thought process)

## Documentation
The API documentation is available [here](https://documenter.getpostman.com/view/4768886/TVCY5BLJ).

### System Requirements
Your system will need to have the following software installed. For mongoDB, a connection string from mongoDB atlas should do:

  * [Node](https://nodejs.org/en/download/)
  * [MongoDB](https://www.mongodb.com/cloud/atlas)

## Technologies
* nodeJS/express
* JWT(authentication)
* mongoDB
* pusher(notifications)
* redis
* mocha and chai

## Installation
#### Step 1: Clone the repository

```bash
git clone https://github.com/danoseun/SOClone
cd SOClone
```

#### Step 2: Setup database
Add the connection string gotten from mongoDB atlas to the .env file in your project.

#### Step 3: Setup environment variables
Include necessary variables as found in .env.sample into .env 

#### Step 4: Install NPM packages
```bash
npm i
```

#### Step 5: Start in development mode
```bash
npm run start:dev
```


## Testing
npm test(All tests are passing).

## ThoughtProcess
* For registration/signup, users have to provide their firstname,lastname,email,username and password.

* Login(username and password) returns only the token.

* Currently, you have to upvote a question before downvoting.

* You can also search for questions by title and users by username.

* All search requests are case insensitive and `like` searches which means it returns results similar to what you entered in the query string irrespective of the case orientation.

* Only the GET /questions route is unprotected, all other routes are private.


