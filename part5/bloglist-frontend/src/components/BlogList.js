import React, { useState, useEffect } from "react";
import Blog from "./Blog";
import blogService from '../services/blogs'









const BlogList = () => {


  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])


  const BlogAddForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    // const [likes, setLikes] = useState(0)

    const handleAddBlog = async (event) => {
      event.preventDefault()


      try {
        const newBlog =
        {
          title: title,
          author: author,
          url: url,
          likes: 0,
        }
        //response was set to be an Blog object
        const response = await blogService.create(newBlog)
        console.log(response)
        //after succ
        console.log('create succ')
        setBlogs(blogs.concat(response))
        setTitle('')
        setAuthor('')
        setUrl('')
      }
      catch {
        console.log('create failed')
      }



    }

    return (
      <form onSubmit={handleAddBlog}>
        <div>title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>url:
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>


        <button type="submit">create</button>
      </form>
    )

  }



  return (
    <div>
      <h1>BlogListApp</h1>
      <div>
        <BlogAddForm />
      </div>
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default BlogList