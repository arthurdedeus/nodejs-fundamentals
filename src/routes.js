import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'
import { randomUUID } from 'node:crypto'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: async (req, res) => {
      const users = database.select('users')
      return res.end(JSON.stringify(users))
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: async (req, res) => {
      const { name, email } = req.body
      const userData = { id: randomUUID(), name, email }
      const user = database.insert('users', userData)
      return res.writeHead(201).end(JSON.stringify(user))
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: async (req, res) => {
      const { id } = req.params
      database.delete('users', id)
      return res.writeHead(204).end()
    },
  },
]
