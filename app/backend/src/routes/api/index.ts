import todos from './books'
import users from './users'
import { Route } from '@/types/routes'

const routes: Route[] = [
  {
    handler: todos.createBook,
    method: 'post',
    path: '/'
  },
  {
    handler: users.createUser,
    method: 'post',
    path: '/users'
  }
]

export default routes
