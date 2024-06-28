import { Pool } from 'pg'

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'example-ts',
  password: '*****',
  port: 5432
})

export default pool
