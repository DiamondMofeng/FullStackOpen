import React from "react"

import Blog from './Blog'

import blogService from '../services/blogs'


//Blogs component controls how Blogs show

//Blogs compt
const Blogs = ({ blogs, setBlogs, setNotice, user }) => {

  console.log(blogs)




  const likeBlog = (blog) => {
    return async () => {
      // console.log(blog)
      try {
        const newBlog = { ...blog, likes: blog.likes + 1, id: null }
        // console.log(newBlog)
        const responseBlog = await blogService.update(blog.id, newBlog)
        // console.log(responseBlog)

        //after succ
        setNotice({ msg: `${blog.title} is liked`, type: '' })
        setTimeout(() => {
          setNotice(null)
        }, 5000)
        ////update blogs
        setBlogs(blogs.map(_blog => _blog.id === blog.id ? responseBlog : _blog))
      }

      catch (e) {
        console.log('failed to like')
        setNotice({ msg: `failed to like ${blog.title} `, type: 'error' })
        setTimeout(() => {
          setNotice(null)
        }, 5000)
      }
    }
  }

  const deleteBlog = (blog) => {
    return async () => {
      if (window.confirm(`are you sure to delete ${blog.title} ?`)) {
        try {
          const response = await blogService.remove(blog.id)
          console.log(response)
          //after succ
          setNotice({ msg: `deleted ${blog.title} `, type: 'error' })
          setTimeout(() => {
            setNotice(null)
          }, 5000)

          ////update blogs
          setBlogs(blogs.filter(b => b.id !== blog.id))
        }
        catch (e) {
          setNotice({ msg: `failed to delete ${blog.title} `, type: 'error' })
          setTimeout(() => {
            setNotice(null)
          }, 5000)
        }
      }
    }
  }



  //order blogs by likes in descending

  blogs.sort((f, s) => s.likes - f.likes)


  //render
  return (
    <div>
      {
        blogs.map(blog =>
          <Blog
            className="blog"
            key={blog.id}
            blog={blog}
            setNotice={setNotice}
            handleAddLike={likeBlog(blog)}
            handleDelete={deleteBlog(blog)}
            user={user}
          />
        )
      }
    </div>
  )
}



export default Blogs
