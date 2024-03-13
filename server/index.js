import express from 'express'
import logger from 'morgan'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { createClient } from '@libsql/client/.'
import dotenv from 'dotenv'

dotenv.config()

const db = createClient({
  url: 'libsql://awake-cybergirl-daviddrequeno.turso.io',
  authToken: process.env.DB_TOKEN
})

await db.execute()

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
    io.emit('chat message', msg)
  })
})

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

server.listen(port, () => {
  console.log('Server running')
})
