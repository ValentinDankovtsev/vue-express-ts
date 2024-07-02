import { Request, Response } from 'express'
import pool from '../../../db/pool'

interface Book {
  title: string
  description: string
}

const createBook = async (req: Request, res: Response): Promise<any> => {
  const { task } = req.body
  // TypeScript type-based input validation
  if (typeof task !== 'string' || task.trim() === '') {
    return res.status(400).json({ error: 'Invalid task data' })
  }

  try {
    const text = 'INSERT INTO todo (description) VALUES($1)'
    const result = await pool.query(text, [task])
    const createdTodo: Book = result.rows[0]
    res.status(201).json(createdTodo)
  } catch (error) {
    console.error('Error adding todo', error)
    res.status(500).json({ error: 'Error adding todo' })
  }
}

export default {
  createBook
}
