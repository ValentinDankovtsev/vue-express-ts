import { Router, Request, Response } from 'express'
// import pool from './db'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the  App!')
})

export default router
