import React from 'react'

import Togglable from './auxi/Togglable'

// import blogService from '../services/blogs'

const Blog = ({ blog, setNotice, handleAddLike, handleDelete, user }) => {
  const isBlogAdder = user.username === blog.user.username
  // console.log(isBlogAdder)
  // console.log( user.username, blog.user.username)

  //style
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
        <p>likes: {blog.likes}
          <button onClick={handleAddLike}>like</button>
        </p>
        <p> Author: {blog.author}</p>
        {
          isBlogAdder
            ? <button onClick={handleDelete}>delete</button>
            : null
        }


      </Togglable>
    </div>
  )
}
export default Blog