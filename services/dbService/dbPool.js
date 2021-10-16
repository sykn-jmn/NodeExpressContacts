const { Pool } = require('pg')
const db = new Pool({
  database: 'postgres',
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  port: '5432'
})

module.exports = db