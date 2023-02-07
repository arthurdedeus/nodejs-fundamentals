import http from 'node:http'
import { json } from './middlewares/json.js'

const users = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req
  await json(req, res)

  if (method === 'GET' && url === '/users') {
    return res.end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body
    const id = users.length + 1
    users.push({ id, name, email })
    return res.writeHead(201).end(JSON.stringify(users.find((user) => user.id === id)))
  }

  return res.writeHead(404).end()
})

server.listen(3333)
