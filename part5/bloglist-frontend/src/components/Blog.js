import React from 'react'

import Togglable from './auxi/Togglable'

// import blogService from '../services/blogs'

const Blog = ({ blog, handleAddLike, handleDelete, user }) => {
  const isBlogAdder = user.username === blog.user.username
  // console.log(isBlogAdder)
  // console.log( user.username, blFog.user.username)

  //style
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
    // display: 'inline',
  }
  // const inlineStyle = {
  //   display: 'inline'
  // }
  return (
    <li style={blogStyle} className='blog'>
      {blog.title}
      <Togglable buttonLable='view' >
        <p data-testid='URL'> URL: {blog.url}</p>
        <p data-testid='LIKES'> likes: {blog.likes}
          <button onClick={handleAddLike}>like</button>
        </p>
        <p data-testid='AUTHOR'> Author: {blog.author}</p>
        {
          isBlogAdder
            ? <button onClick={handleDelete}>delete</button>
            : null
        }


      </Togglable>
    </li>
  )
}
export default Blog