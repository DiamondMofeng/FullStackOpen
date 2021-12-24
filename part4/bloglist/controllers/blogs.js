const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  // console.log("code goes here")
  Blog.find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const body = request.body
  if(body.title===undefined||body.url===undefined){
    response.status(400).end()
    return
  }

  if(body.likes===undefined){
    body['likes']=0
    // console.log("code goes here")
  }

  const blog = new Blog(body)

  blog.save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter