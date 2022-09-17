const { Pool } = require("pg");

let client = new Pool({
  user: JSON.parse(process.env.USER),
  host: JSON.parse(process.env.HOST),
  database: JSON.parse(process.env.DATABASE),
  password: JSON.parse(process.env.PASSWORD),
  port: JSON.parse(process.env.DBPORT),
});

module.exports = client;
