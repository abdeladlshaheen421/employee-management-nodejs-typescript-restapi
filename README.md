# Employee Management System

- an Backend Application using NodeJs-express

## MySQl Configration

1- change policy of password

### `SET GLOBAL validate_password.policy=LOW;`

2- create a new user

### `CREATE USER 'username'@'host' IDENTIFIED BY 'password';`

3- create database

### `CREATE DATABASE databaseName;`

4- give a user all privileges to database

### `grant all privileges on databaseName.* to 'userName'@'host';`

- Note : the migration will automatically migrate after running server

---

## Installation

1- install project dependencies

### `npm i` or `npm install`

2- create `.env` file like .env-example
FRONTEND_URL should be like http://localhost:3000 to enable cors origin for frontend

3- to build the project

### `npm run build`

4- to test the project

### `npm run test`

5- to run the project

### `npm start` or `npm run start` or `npm run dev` in development

6- to see swagger api documentation: hit the route `${HOST}:PORT/api-documentation/`
