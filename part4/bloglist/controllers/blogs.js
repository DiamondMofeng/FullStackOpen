const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }




blogsRouter.get('/', async (request, response) => {
  // console.log("code goes here")
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  //check body
  if (body.title === undefined || body.url === undefined) {
    response.status(400).end()
    return
  }

  if (body.likes === undefined) {
    body['likes'] = 0
    // console.log("code goes here")
  }


  //check token
  // const token = getTokenFrom(request)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const userId = await User.findById(decodedToken.id)
  body.user = userId

  const blog = new Blog(body)

  blog.save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogsRouter.delete('/:id', (request, response) => {
  // console.log("code goes here")
  const id = request.params.id

  Blog.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response) => {
  const body = request.body
  if (body.title === undefined || body.url === undefined) {
    response.status(400).end()
    return
  }
  if (body.likes === undefined || typeof body.likes !== Number) {
    body['likes'] = 0

    const blog = {
      // id: request.params.id,
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    }
    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      .then(result => {
        if (result) {
          // console.log(result)
          response.status(200).json(result)
        } else {
          response.status(404).json({ error: `Fail to locate this blog on server, it might have been removed`, })
          return
        }

      })
      .catch(err => {
        // console.log(err)
        next(err)
      })
  }
})
module.exports = blogsRouter