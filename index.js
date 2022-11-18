import http from 'http'
import dotenv from 'dotenv'
import { createUser, getUser, getUsers } from './controllers/usersController.js'
import { contentJson, contentText } from './consts/index.js'

dotenv.config()

const PORT = process.env.PORT || 8000
const SHUTDOWN_TIMEOUT = 5000
const HTTP_REFRESH = {
  'Content-Type': 'text/html',
  Refresh: 5
}

const connections = new Map()

const timeout = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

const server = http.createServer((req, res) => {
  connections.set(res.connections, res)

  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': contentText })
    res.end('Homepage')
  } else if (req.url === '/api/users' && req.method === 'GET') {
    getUsers(req, res)
  } else if (req.url.match(/\/api\/users\/\w+/) && req.method === 'GET') {
    const id = req.url.split('/')[3]
    getUser(req, res, id)
  } else if (req.url === '/api/users' && req.method === 'POST') {
    createUser(req, res)
  } else if (req.method === 'OPTIONS') {
    res.writeHead(200, { 'Content-Type': contentJson })
    res.end(
      JSON.stringify({
        url: req.url,
        date: new Date()
      })
    )
  } else {
    res.writeHead(404, { 'Content-Type': contentJson })
    res.end(
      JSON.stringify({
        message: 'Route Not Found'
      })
    )
  }
})

server.on('connection', (connection) => {
  console.log('New connection')
  connection.on('close', () => {
    console.log('close')
    connections.delete(connection)
  })
})

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})

const showConnections = () => {
  console.log('Connections:', [...connections.values()].length)
  for (const connection of connections.keys()) {
    const { remoteAddress, remotePort } = connection
    console.log(`  ${remoteAddress}:${remotePort}`)
  }
}

const closeConnections = async () => {
  for (const [connection, res] of connections.entries()) {
    connections.delete(connection)
    res.writeHead(503, HTTP_REFRESH)
    res.end('Server stopped')
    connection.destroy()
  }
}

const freeResources = async () => {
  console.log('Free resources')
}

const gracefulShutdown = async () => {
  server.close((error) => {
    if (error) {
      console.log(error)
      process.exit(1)
    }
  })
  await timeout(SHUTDOWN_TIMEOUT)
  await freeResources()
  await closeConnections()
}

process.on('SIGINT', async () => {
  console.log()
  console.log('Gracefull shutdown')
  showConnections()
  await gracefulShutdown()
  showConnections()
  console.log('End')
  process.exit(0)
})
