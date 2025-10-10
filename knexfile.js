import "dotenv/config";

export default {
  development: {
    client: process.env.DEV_DATABASE_CLIENT,
    connection: {
      host: process.env.DEV_DATABASE_HOST,
      port: process.env.DEV_DATABASE_POST,
      user: process.env.DEV_DATABASE_USER,
      password: process.env.DEV_DATABASE_PASSWORD,
      database: process.env.DEV_DATABASE_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/server/database/migrations",
      extension: 'cjs'
    },
    seeds: {
      directory: "./src/server/database/seeds",
    },
  },
  staging: {
    client: process.env.STG_DATABASE_CLIENT,
    connection: {
      host: process.env.STG_DATABASE_HOST,
      port: process.env.STG_DATABASE_POST,
      user: process.env.STG_DATABASE_USER,
      password: process.env.STG_DATABASE_PASSWORD,
      database: process.env.STG_DATABASE_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/server/database/migrations",
      extension: 'cjs'
    },
    seeds: {
      directory: "./src/server/database/seeds",
    },
  },
  production: {
    client: process.env.PROD_DATABASE_CLIENT,
    connection: {
      host: process.env.PROD_DATABASE_HOST,
      port: process.env.PROD_DATABASE_POST,
      user: process.env.PROD_DATABASE_USER,
      password: process.env.PROD_DATABASE_PASSWORD,
      database: process.env.PROD_DATABASE_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/server/database/migrations",
      extension: 'cjs'
    },
    seeds: {
      directory: "./src/server/database/seeds",
      extension: 'cjs'
    },
  },
};