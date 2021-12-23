const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach(blog => {
    sum = sum + blog.likes
  });

  return sum
}

const favouriteBlog = (blogs) => {
  let favourited = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes > favourited.likes) {
      favourited = blog
    }
  })
  return favourited
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return "blogs array is empty"

  const store = []
  blogs.forEach(b => {
    let s = store.filter(s => s.author === b.author)
    if (s.length !== 0) {
      s[0].blogs = s[0].blogs + 1
    }
    else (store.push(
      {
        author: b.author,
        blogs: 1
      })
    )
  })

  let most = store[0]
  store.forEach(s => {
    if (s.blogs > most.blogs) {
      most = s
    }
  })
  return most
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return "blogs array is empty"

  const store = []
  blogs.forEach(b => {
    let s = store.filter(s => s.author === b.author)
    if (s.length !== 0) {
      s[0].likes = s[0].likes + b.likes
    }
    else (store.push(
      {
        author: b.author,
        likes: b.likes
      })
    )
  })

  let most = store[0]
  store.forEach(s => {
    if (s.likes > most.likes) {
      most = s
    }
  })
  return most
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}