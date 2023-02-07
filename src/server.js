import { Database } from './database.js'
import http from 'node:http'
import { json } from './middlewares/json.js'
import { randomUUID } from 'node:crypto'

const database = new Database()

const server = http.createServer(async (req, res) => {
  const { method, url } = req
  await json(req, res)

  if (method === 'GET' && url === '/users') {
    const users = database.select('users')
    return res.end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body
    const userData = { id: randomUUID(), name, email }
    const user = database.insert('users', userData)
    return res.writeHead(201).end(JSON.stringify(user))
  }

  return res.writeHead(404).end()
})

server.listen(3333)
