import React, { useState } from "react"
import blogService from '../services/blogs'



const BlogAddForm = ({ blogs, setBlogs, setNotice, blogAddRef }) => {

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
      // console.log(response)
      //after succ
      console.log('create succ')
      setBlogs(blogs.concat(response))

      setNotice({ msg: `a new blog ${title} by ${author} added `, type: '' })
      setTimeout(() => {
        setNotice(null)
      }, 5000)

      setTitle('')
      setAuthor('')
      setUrl('')

      blogAddRef.current.toggleVisibility()
    }
    catch {
      console.log('create failed')
      setNotice({ msg: `failed to create new blog`, type: 'error' })
      setTimeout(() => {
        setNotice(null)
      }, 5000)
    }
  }

  return (
    <div>

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
    </div>
  )
}

export default BlogAddForm
