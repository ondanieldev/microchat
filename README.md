<div align="center">
  <a href="https://microchat.ondaniel.com.br/">
    <div>
      <h1><span style="font-size: 14px">micro</span>CHAT</h1>
    </div>
  </a>
  <hr>
</div>

## Introduction

[Microchat](https://microchat.ondaniel.com.br/) is a simple chat made with microservices architecture. First, it was being developed as a challenge to join [Ioasys](https://ioasys.com.br/). However, I was hired by another company, so I developed it just to learn more about sockets and microservices.

## Features

- Sign up
- Sign in
- Sign out
- Create rooms
- Index rooms
- Index user's rooms
- Join rooms
- Kick users out of rooms
- Leave room
- Send messages
- Index messages

## Endpoints

| METHOD | PATH                   | SHORT DESCRIPTION                     |
| ------ | ---------------------- | ------------------------------------- |
| GET    | /messages/{room_id}    | Index room's messages                 |
| POST   | /messages              | Send a message                        |
| GET    | /rooms                 | Index rooms                           |
| POST   | /rooms                 | Create a room                         |
| GET    | /rooms/users/me        | Index rooms the user is participating |
| GET    | /rooms/users/{room_id} | Index room's participants             |
| POST   | /rooms/users/kick      | Kick a user out of a room             |
| POST   | /rooms/users           | Join a room                           |
| DELETE | /rooms/users/{room_id} | Leave a room                          |
| GET    | /users                 | Show current user's data              |
| POST   | /users                 | Sign up                               |
| POST   | /users/sessions        | Sign in                               |
| DELETE | /users/sessions        | Sign out                              |

## How to run

### Backend

1. Go to `backend` folder

2. Run `yarn` or `npm install` to install project's dependecies

3. Run `docker-compose up -d` to setup containers and start them
   3.1. You can create a `docker-compose.override.yml` before running this command to change the values you want _(optional step)_

4. Copy `ormconfig.example.json` to a new `ormconfig.json` file and fill it with the data that you have setup inside `docker-compose.yml` and `docker-compose.override.yml`

5. Run `yarn typeorm migrations:run` to setup database tables

6. Copy `.env.example` to a new `.env` file and fill it with the data that you have setup inside `docker-compose.yml` and `docker-compose.override.yml`

7. Run `yarn dev` or `npm run dev` to start the project on the development mode

### Frontend

1. Go to `frontend` folder

2. Run `yarn` or `npm install` to install project's dependecies

3. Run `yarn start` or `npm run start` to start the project on the development mode

## How to build

### Backend

1. Go to `backend` folder

2. Run `yarn build` or `npm run build`

3. Run `yarn prod` or `npm run prod`

### Frontend

1. Go to `frontend` folder

2. Run `yarn build` or `npm run build`

3. Serve the static files using any serving lib or deploy it at any CDN

## How to contribute

If you want to contribute with me to improve it and add new features, you can open a pull request or contact me by any contact method listed in my [Github Profile](https://github.com/ondanieldev).

## License

MIT © [Daniel Oliveira](https://ondaniel.com.br/)
