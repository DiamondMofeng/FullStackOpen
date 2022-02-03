import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'



test('default renders content', () => {



  const blog = {
    url: "testUrl",
    title: "testTitle",
    author: "testAuthor",
    likes: 1,
    user: {
      username: 'Mofeng'
    }
  }
  const user = {
    username: "Mofeng"
  }


  render(
    <Blog blog={blog} user={user} />
  )

  expect(screen.getByText('testTitle')).toBeVisible()
  expect(screen.getByTestId('URL')).not.toBeVisible()
  expect(screen.getByTestId('AUTHOR')).not.toBeVisible()

})

test('show URL and Author after clicked VIEW', async () => {

  const mockHandler = jest.fn()

  const blog = {
    url: "testUrl",
    title: "testTitle",
    author: "testAuthor",
    likes: 1,
    user: {
      username: 'Mofeng'
    }
  }

  const user = {
    username: "Mofeng"
  }


  render(
    <Blog blog={blog} user={user} />
  )

  const button = screen.getByText('view')
  userEvent.click(button)

  // expect(mockHandler.mock.calls).toHaveLength(1)
  expect(screen.getByText('testTitle')).toBeVisible()
  expect(screen.getByTestId('URL')).toBeVisible()
  expect(screen.getByTestId('AUTHOR')).toBeVisible()
})

test('show URL and Author after clicked VIEW', async () => {

  const mockHandler = jest.fn()

  const blog = {
    url: "testUrl",
    title: "testTitle",
    author: "testAuthor",
    likes: 1,
    user: {
      username: 'Mofeng'
    }
  }

  const user = {
    username: "Mofeng"
  }


  render(
    <Blog blog={blog} user={user} />
  )

  const button = screen.getByText('view')
  userEvent.click(button)

  // expect(mockHandler.mock.calls).toHaveLength(1)
  expect(screen.getByText('testTitle')).toBeVisible()
  expect(screen.getByTestId('URL')).toBeVisible()
  expect(screen.getByTestId('AUTHOR')).toBeVisible()
})

test('like twice', () => {

  const mockHandler = jest.fn()

  

  const blog = {
    title: "321",
    author: "321",
    url: "321",
    likes: 0,
    user: {
      username: "Mofeng",
      name: "Mofengfeng",
      blogs: [],
      id: "61c6ba117ddc70000690b7d3"
    },
    id: "61f3a9aeeeab2a5ec308a2e6"
  }

  const user = {
    username: "Mofeng"
  }

  render(
    <Blog blog={blog} user={user} handleAddLike={mockHandler} />
  )

  const likeButton = screen.getByText('like')
  userEvent.dblClick(likeButton)

  
  expect(mockHandler.mock.calls).toHaveLength(2)




})
