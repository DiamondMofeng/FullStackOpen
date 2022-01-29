const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor
const logger = require('../utils/logger')


blogsRouter.get('/', async (request, response) => {
  // console.log("code goes here")
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})



blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  let decodedToken
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
  if (!request.token) {
    return response.status(401).json({ error: 'token missing' })
  }

  try {
    decodedToken = jwt.verify(request.token, process.env.SECRET)
  }
  catch (error) {
    next(error)
    return
  }

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



blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const id = request.params.id
  // let decodedToken
  blogToDelete = await Blog.findById(id)

  if (!blogToDelete) {
    return response.status(400).json({ error: 'this blog has been deleted' })
  }

  if (!blogToDelete.user.toString() === request.user.toString()) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  await Blog.findByIdAndRemove(id)
    .catch(error => next(error))
  response.status(204).end()

})


//PUT have not add token valid check

blogsRouter.put('/:id', (request, response) => {
  const body = request.body
  if (body.title === undefined || body.url === undefined) {
    response.status(400).end()
    return
  }
  //watchout bug
  if (body.likes === undefined || typeof body.likes !== 'number') {
    body['likes'] = 0
  }
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
)
module.exports = blogsRouter