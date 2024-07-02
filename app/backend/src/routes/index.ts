import { Express } from 'express'
import api from './api'

function routes(app: Express): void {
  api.forEach((route) => {
    const { method, path, handler } = route
    app[method](path, handler)
  })
}

export default routes
