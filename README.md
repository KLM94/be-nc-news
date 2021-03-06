# Northcoders NC News API

## Background

NC News is a Back-end project which is used for the Front-end web application. The web application displays articles, topics and comments hosted from the Back-end built API.

This project uses JavaScript, Express, Mocha, Chai, PSQL, Node.

## Links

Front-end repo: https://github.com/KLM94/FE-NC-NEWS2.git

Hosted version of the front-end: https://klm-nc-news.netlify.com

Hosted version of the back-end: https://kirstys-nc-news.herokuapp.com/api


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
Open directory in VS code and install dependancies.
*To see dependancies, see scripts in package-json.*
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

Run the following command to run tests on the database that checks functionality of all endpoints and written specs:

```bash
npm run test
```
## Endpoints:

**GET** /api/topics

**GET** /api/users/:username

**GET** /api/articles/:article_id

**PATCH** /api/articles/:article_id

**POST** /api/articles/:article_id/comments

**GET** /api/articles/:article_id/comments

**GET** /api/articles

**PATCH** /api/comments/:comment_id

**DELETE** /api/comments/:comment_id

**GET /api**

## Authors:
Kirsty McGlynn.
