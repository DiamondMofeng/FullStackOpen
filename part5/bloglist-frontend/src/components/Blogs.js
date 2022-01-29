import React from "react";

import Blog from './Blog'

import blogService from '../services/blogs'


//Blogs component controls how Blogs show 

//Blogs compt
const Blogs = ({blogs, setBlogs, setNotice}) => {

  console.log(blogs)




  const addLike = (blog) => {
    return async () => {
      console.log(blog)
      try {
        const newBlog = { ...blog, likes: blog.likes + 1, id: null }
        console.log(newBlog)
        const responseBlog = await blogService.update(blog.id, newBlog)
        console.log(responseBlog)

        //after succ
        setNotice({ msg: `${blog.title} is liked`, type: '' })
        setTimeout(() => {
          setNotice(null)
        }, 5000)
        ////update blogs
        setBlogs(blogs.map(_blog => _blog.id === blog.id ? responseBlog : _blog))
      }

      catch {
        console.log('failed')
        setNotice({ msg: `failed to like ${blog.title} `, type: 'error' })
        setTimeout(() => {
          setNotice(null)
        }, 5000)
      }
    }
  }


  //order blogs by likes in descending

  blogs.sort((f,s)=>s.likes-f.likes)

  return (
    <div>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} setNotice={setNotice} addLike={addLike(blog)} />
        )
      }
    </div>
  )
}



export default Blogs;
