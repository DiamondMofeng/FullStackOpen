import React, { useState, useEffect, useRef } from "react";
import Blog from "./Blog";
import BlogAddForm from './BlogAddForm.js'

import Togglable from './auxi/Togglable'

// import Notification from "./Notification";

import blogService from '../services/blogs'





const BlogList = ({ setNotice }) => {


  const [blogs, setBlogs] = useState([])

  const blogAddRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])



  return (
    <div>
      <h1>BlogListApp</h1>

      <div>
        <h2>blogs</h2>
        <Togglable buttonLable='add a new blog' ref={blogAddRef}>
          <BlogAddForm blogs={blogs} setBlogs={setBlogs} setNotice={setNotice} blogAddRef={blogAddRef}/>
        </Togglable>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default BlogList