import { contentJson } from '../consts'

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
    res.json(users)
  } catch (error) {
    console.log(error)
  }
}

export const getUser = (req, res, id) => {
  try {
    const user = users.find((u) => u.id === id)

    if (!user) {
      res.writeHead(404, { 'Content-Type': contentJson })
      res.json({ message: 'Product Not Found' })
    } else {
      res.writeHead(200, { 'Content-Type': contentJson })
      res.json(user)
    }
  } catch (error) {
    console.log(error)
  }
}

export const createUser = (req, res) => {
  try {
    console.log(req.body)

    res.writeHead(201, { 'Content-Type': contentJson })
    res.end('Created')
  } catch (error) {
    console.log(error)
  }
}
