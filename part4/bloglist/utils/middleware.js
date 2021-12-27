const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === 'JsonWebTokenError' && error.message === 'invalid token') {
    return response.status(400).json({ error: 'token invalid' })
  }
  next(error)
}


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


const tokenExtractor = (request, response, next) => {

  const token = getTokenFrom(request)
  request.token = token

  next()
}

const userExtractor = (request, response, next) => {
  // console.log('code goes here')
  let decodedToken
  const token = getTokenFrom(request)

  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  }
  catch (error) {
    next(error)
    return
  }

  const user = decodedToken.id
  request.user = user
  next()
}
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}