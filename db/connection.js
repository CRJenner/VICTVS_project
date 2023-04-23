const { Pool } = require("pg");
const PGDATABASE = process.env.PGDATABASE


if (!PGDATABASE){
  throw new Error('no database set')
}

const connection = new Pool

module.exports = connection;