import express from 'express'
import logger from 'morgan'
import { Server } from 'socket.io'
import { createServer } from 'node:http'

const app = express()
const port = process.env.PORT ?? 3000
const server = createServer(app)
const io = new Server(server)

io.on('connection', () => {
  console.log('a user has connected')
})

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(port, () => {
  console.log('Server runnig')
})
