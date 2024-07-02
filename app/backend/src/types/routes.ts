import { Request, Response } from 'express'

export type Handler = (req: Request, res: Response) => any

type Method = 'get' | 'head' | 'post' | 'put' | 'delete' | 'connect' | 'options' | 'trace' | 'patch'

export type Middleware = (req: Request, res: Response, next: any) => any

export type Route = {
  method: Method
  path: string | RegExp
  middleware?: Middleware[]
  handler: Handler
}
