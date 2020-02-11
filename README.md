# Northcoders NC News API

## Background

NC News is a Back-end project which is used for the Front-end web application. The web application displays articles, topics and comments hosted from the Back-end built API.

This project uses JavaScript, Express, Mocha, Chai, PSQL, Node.

## Prerequisites:


[GitHub](http://github.com)

[NodeJS](https://nodejs.org/en/)

[PSQL](postgresql.org/download/)

[VSCode](https://code.visualstudio.com/)

## Installing:

 Clone the repository
```bash
git clone https://github.com/KLM94/be-nc-news.git
```
cd into the directory
```bash
cd be-nc-news
```
Open directory in VS code and install dependancies
```bash
npm install -g
```
Re-seed and run the database
```bash
npm run setup-dbs
```
```bash
npm run seed
```
## Running the tests:

Run the following command to run tests on the database that checks functionality of all endpoints and written specs.

```bash
npm run test
```

