import { v4 } from 'uuid'
import { contentJson } from '../consts/index.js'
import { reqBody } from '../utils/index.js'

const users = [
  {
    name: 'Jhon',
    id: 1
  },
  {
    name: 'Alex',
    id: 2
  }
]

export const getUsers = (req, res) => {
  try {
    res.writeHead(200, { 'Content-Type': contentJson })
    res.end(JSON.stringify(users))
  } catch (error) {
    console.log(error)
  }
}

export const getUser = (req, res, id) => {
  try {
    const user = users.find((u) => u.id === Number(id))

    if (!user) {
      res.writeHead(404, { 'Content-Type': contentJson })
      res.end(JSON.stringify({ message: 'User Not Found' }))
    } else {
      res.writeHead(200, { 'Content-Type': contentJson })
      res.end(JSON.stringify(user))
    }
  } catch (error) {
    console.log(error)
  }
}

export const createUser = async (req, res) => {
  try {
    const body = await reqBody(req)

    const { name } = JSON.parse(body)

    if (!name) {
      res.writeHead(400, { 'Content-Type': contentJson })
      res.end(JSON.stringify({ message: 'Bad Requst: "name" not specified' }))
    }

    const user = {
      name,
      id: v4()
    }

    res.writeHead(201, { 'Content-Type': contentJson })
    res.end(JSON.stringify(user))
  } catch (error) {
    console.log(error)
  }
}
