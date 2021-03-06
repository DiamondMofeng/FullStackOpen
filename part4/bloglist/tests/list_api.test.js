const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]
jest.setTimeout(1000000)
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[3])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[4])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[5])
  await blogObject.save()
})


const api = supertest(app)
//4.8
test('blogNumbers', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(6)
})

test('blogIsIdDefined', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(b => {
    expect(b.id).toBeDefined()
  });
})

test('blogIsPostSucc', async () => {


  let newBlog = {
    title: "TestBlog",
    author: "Mofeng",
    url: "http://blog.mofengfeng.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1vZmVuZyIsImlkIjoiNjFjNmJhMTE3ZGRjNzAwMDA2OTBiN2QzIiwiaWF0IjoxNjQwNjA4NzI2fQ.2I0rNdSWM7PV90-6SlwQpbffj9DqEYUkiW-EzfAtwTA" })
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response_new = await api.get('/api/blogs')
  expect(response_new.body.length - 6).toBe(1)
  const savedNew = response_new.body[response_new.body.length - 1]
  expect(savedNew.likes).toEqual(5)
  expect(savedNew.title).toEqual("TestBlog")
  expect(savedNew.author).toEqual("Mofeng")
  expect(savedNew.url).toEqual("http://blog.mofengfeng.com/uncle-bob/2016/05/01/TypeWars.html")
})


test('blogIsSaveSucc', async () => {
  // const response_old = await api.get('/api/blogs')


  const newBlog = Blog({
    _id: "5a422bc61b54a676234d6666",
    title: "TestBlog",
    author: "Mofeng",
    url: "http://blog.mofengfeng.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 5,
    __v: 0
  })
  await newBlog.save()

  const response_new = await api.get('/api/blogs')
  expect(response_new.body.length - 6).toBe(1)
  expect(response_new.body[response_new.body.length - 1]).toEqual({
    id: "5a422bc61b54a676234d6666",
    title: "TestBlog",
    author: "Mofeng",
    url: "http://blog.mofengfeng.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 5,
  })
})

test('blogNoLike', async () => {


  let newBlog = {
    title: "TestBlog",
    author: "Mofeng",
    url: "http://blog.mofengfeng.com/uncle-bob/2016/05/01/TypeWars.html",
    // likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set({Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1vZmVuZyIsImlkIjoiNjFjNmJhMTE3ZGRjNzAwMDA2OTBiN2QzIiwiaWF0IjoxNjQwNjA4NzI2fQ.2I0rNdSWM7PV90-6SlwQpbffj9DqEYUkiW-EzfAtwTA" })
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response_new = await api.get('/api/blogs')
  expect(response_new.body.length - 6).toBe(1)
  const savedNew = response_new.body[response_new.body.length - 1]
  expect(savedNew.likes).toEqual(0)
  // expect(savedNew.title).toEqual("TestBlog")
  // expect(savedNew.author).toEqual("Mofeng")
  // expect(savedNew.url).toEqual("http://blog.mofengfeng.com/uncle-bob/2016/05/01/TypeWars.html")
})

test('blogNoTitleOrUrl', async () => {


  let newBlog = {
    title: "TestBlog",
    author: "Mofeng",
    // url: "http://blog.mofengfeng.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})



test('blogPostWithNoAuth', async () => {


  let newBlog = {
    title: "TestBlog",
    author: "Mofeng",
    url: "http://blog.mofengfeng.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

test('blogPostWithFakeAuth', async () => {


  let newBlog = {
    title: "TestBlog",
    author: "Mofeng",
    url: "http://blog.mofengfeng.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .set({Authorization: "Bearer Fake_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1vZmVuZyIsImlkIjoiNjFjNmJhMTE3ZGRjNzAwMDA2OTBiN2QzIiwiaWF0IjoxNjQwNjA4NzI2fQ.2I0rNdSWM7PV90-6SlwQpbffj9DqEYUkiW-EzfAtwTA" })
    .send(newBlog)
    .expect(401)
})

afterAll(() => {
  mongoose.connection.close()
})
