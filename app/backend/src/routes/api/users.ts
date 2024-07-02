import { Request, Response } from 'express'
import pool from '../../../db/pool'

interface Users {
  name: 'string'
  surname: 'string'
}

const createUser = async (req: Request, res: Response): Promise<any> => {
  const { name, surname } = req.body
  try {
    const result = await pool.query('INSERT INTO person (name, surname) VALUES($1, $2) RETURNING *', [name, surname])
    const createdUser: Users = result.rows[0]
    console.log(result.rows, 'createdUser')
    res.status(201).json(createdUser)
  } catch (error) {
    res.status(500).json({ error: 'Error adding user' })
  }
}

export default {
  createUser
}
