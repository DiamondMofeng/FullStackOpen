const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)


  const newUser = {
    username: body.username,
    name: body.name,
    passwordHash: passwordHash,
  }

  const userToSave = new User(newUser)
  const savedUser = await userToSave.save()

  response.json(savedUser)

})

userRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})


module.exports = userRouter