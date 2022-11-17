import http from 'http'
import dotenv from 'dotenv'
import { createUser, getUser, getUsers } from './controllers/usersController.js'
import { contentJson, contentText } from './consts/index.js'

dotenv.config()

const PORT = process.env.PORT || 8000

const server = http.createServer((req, res) => {
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
  } else {
    res.writeHead(404, { 'Content-Type': contentJson })
    res.end(
      JSON.stringify({
        message: 'Route Not Found'
      })
    )
  }
})

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})
