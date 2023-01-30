import http from 'node:http'

const users = []

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/users') {
    return res
    .setHeader('Content-Type', 'application/json')
    .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const user = {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@email.com',
    }
    users.push(user)
    return res
    .setHeader('Content-Type', 'application/json')
    .end(JSON.stringify(user))
  }

  return res.end('Hello World')
})

server.listen(3333)
