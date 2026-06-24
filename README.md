# Event Check-in & Access API

## Overview

This project is a backend API built using NestJS, TypeScript, PostgreSQL, Prisma, MongoDB, and JWT Authentication.

The system allows users to register, attend events, and retrieve the correct QR code based on active event access rules.

---

## Technologies Used

* NestJS
* TypeScript
* PostgreSQL
* Prisma ORM
* MongoDB
* Mongoose
* JWT Authentication
* Swagger

---

## Setup

### Install dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file based on `.env.example`

Example:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/checkin

JWT_SECRET=super-secret-key

MONGODB_URI=mongodb://localhost:27017/checkin
```

### Run Prisma Migration

```bash
npx prisma migrate dev
```

### Start Application

```bash
npm run start:dev
```

---

## API Documentation

Swagger documentation:

```text
http://localhost:3000/api
```

---

## Authentication Endpoints

### Register

```http
POST /auth/register
```

### Login

```http
POST /auth/login
```

### Current User

```http
GET /auth/me
```

---

## Event Endpoints

### Create Event

```http
POST /events
```

### Get All Events

```http
GET /events
```

### Get Event By Id

```http
GET /events/:id
```

### Update Event

```http
PATCH /events/:id
```

### Register For Event

```http
POST /events/:id/register
```

### View Attendees

```http
GET /events/:id/attendees
```

---

## QR Code Logic

Endpoint:

```http
GET /auth/qr-code
```

Rules:

* Each user has a permanent membership QR code.
* If the user is registered for a gated event and the event is currently active, the event gate QR code is returned instead.
* Otherwise, the membership QR code is returned.

---

## Database Design

### PostgreSQL

Used for relational data:

* Users
* Events
* EventRegistrations

### MongoDB

Used for audit logging:

* LOGIN
* QR_CODE_VIEWED
* EVENT_REGISTERED
* EVENT_CREATED
* EVENT_UPDATED

---

## Design Decisions

### Why PostgreSQL?

PostgreSQL was used for structured relational data because users, events, and registrations have clear relationships and constraints.

### Why MongoDB?

MongoDB was used for audit logs because log data grows independently and does not require complex relational queries.

### Why JWT?

JWT provides stateless authentication and is well suited for APIs.

---

## Future Improvements

* Pagination for events
* Event filtering (upcoming / past)
* Request validation using DTOs and class-validator
* Docker Compose setup
* CI/CD workflow
* Additional unit and integration tests

---

## Author

Yara Alfawaz




















<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
