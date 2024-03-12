import express from 'express'
import logger from 'morgan'
import { Server } from 'socket.io'
import { createServer } from 'node:http'

const app = express()
const port = process.env.PORT ?? 3000
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {}
})

io.on('connection', (socket) => {
  console.log('a user has connected')

  socket.on('disconnect', () => {
    console.log('an user has disconnected')
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg) // <-- Corrected to 'chat message'
  })
})

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(port, () => {
  console.log('Server running')
})
