import knex from "knex";

const connection = {
  host: process.env.DEV_DATABASE_HOST,
  port: process.env.DEV_DATABASE_POST,
  user: process.env.DEV_DATABASE_USER,
  password: process.env.DEV_DATABASE_PASSWORD,
  database: process.env.DEV_DATABASE_NAME,
};

switch (process.env.ENVIRONMENT) {
  case 'stg':
    connection.host = process.env.STG_DATABASE_HOST;
    connection.port = process.env.STG_DATABASE_PORT;
    connection.user = process.env.STG_DATABASE_USER;
    connection.password = process.env.STG_DATABASE_PASSWORD;
    connection.database = process.env.STG_DATABASE_NAME;
    break;
  case 'prod':
    connection.host = process.env.PROD_DATABASE_HOST;
    connection.port = process.env.PROD_DATABASE_PORT;
    connection.user = process.env.PROD_DATABASE_USER;
    connection.password = process.env.PROD_DATABASE_PASSWORD;
    connection.database = process.env.PROD_DATABASE_NAME;
    break;
}

const database = knex({
  client: process.env.DEV_DATABASE_CLIENT,
  connection,
});

export default database;