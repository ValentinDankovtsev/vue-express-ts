import { Pool } from 'pg'

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: 'ade7f54c',
  port: 5432,
  database: 'node_postgres'
})

export default pool
