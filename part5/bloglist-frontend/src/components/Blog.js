import React from 'react'

import Togglable from './auxi/Togglable'

import blogService from '../services/blogs'

const Blog = ({ blog, setNotice, addLike }) => {

  // console.log(blog)

  // const handleLikeButton = async () => {
  //   try {
  //     const newBlog = { ...blog, likes: blog.likes + 1, id: null }
  //     console.log(newBlog)
  //     const response = await blogService.update(blog.id, newBlog)
  //     console.log(response)
  //     //after succ
  //     setNotice({ msg: `${blog.title} is liked`, type: '' })
  //     setTimeout(() => {
  //       setNotice(null)
  //     }, 5000)
  //   }

  //   catch {
  //     console.log('failed')
  //     setNotice({ msg: `failed to like ${blog.title} `, type: 'error' })
  //     setTimeout(() => {
  //       setNotice(null)
  //     }, 5000)
  //   }
  // }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    // display: 'inline', 
  }
  // const inlineStyle = {
  //   display: 'inline'
  // }
  return (
    <div style={blogStyle}>
      {blog.title}
      <Togglable buttonLable='view' >
        <p> URL: {blog.url}</p>
        <p>
          likes: {blog.likes}
          <button onClick={addLike}>like</button>
        </p>
        <p> Author: {blog.author}</p>

      </Togglable>
    </div>
  )
}
export default Blog