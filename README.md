<img alt="Ignite" src="https://user-images.githubusercontent.com/17517028/167471059-c80ba610-7107-496d-a3f4-c2280983551a.png" />

<p align="center">Next Level Week #8</p>

<h3 align="center">
  NLW Return - Feedback Widget
</h3>

<p align="center">
  <a href="https://rocketseat.com.br">
    <img alt="NLW" src="https://img.shields.io/badge/NLW-08-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">
</p>

## Backend

### Technology Stack

<p align="left">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" />
</p>

[Go to project home page](https://github.com/mbagatini/nlw-return-impulse)

### How to run it?

Clone the repository to your machine.

Install the dependencies:

```bash
npm install
```

We need to save the records in the database, so in order to do it correctly, check the .env file wich contains the URL for the database connection. 

```env
DATABASE_URL="mysql://my_connection"
```

Change it to the database you want to connect. After that, it's time to run the migration:

```bash
npx prisma migrate dev
```

If the configuration is ready and connected to the database, let's start the application:
```bash
npm run dev
