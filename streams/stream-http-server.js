import { Transform } from 'node:stream'
import http from 'node:http'

class OppositeNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const opposite = Number(chunk.toString()) * -1
    console.log(opposite)
    callback(null, Buffer.from(String(opposite)))
  }
}

const server = http.createServer((req, res) => {
  return req.pipe(new OppositeNumberStream()).pipe(res)
})

server.listen(3334)
