require('dotenv').config()

const IS_DEV_ENV = process.env.NODE_ENV === 'development'

const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

module.exports = {
  IS_DEV_ENV,
  MONGODB_URI,
  PORT
}