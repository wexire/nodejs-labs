const http = require('http')
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 8000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World')
})

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})
