import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogAddForm from './BlogAddForm'



test('5.13 default renders content', () => {



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

test('5.14 show URL and Author after clicked VIEW', async () => {

  // const mockHandler = jest.fn()

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


test('5.15 like twice', () => {

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


/**
 * this test seems to be useless
 */
test('5.16 the form adding new blog', async () => {


  const mockBlog = {
    title: "tit",
    author: "aut",
    url: "mockurl",
  }

  render(
    <BlogAddForm />
  )


  const inputs = screen.getAllByRole('textbox')
  const titleInput = inputs.find(input => input.name === 'Title')
  const authorInput = inputs.find(input => input.name === 'Author')
  const urlInput = inputs.find(input => input.name === 'Url')
  const submitButton = screen.getByText('create')

  userEvent.type(titleInput, mockBlog.title)
  userEvent.type(authorInput, mockBlog.author)
  userEvent.type(urlInput, mockBlog.url)

  let newBlog

  const form = document.querySelector('form')
  const mockSubmitHandler = jest.fn(event => {
    event.preventDefault()

    const _newBlog = {
      title: titleInput.value,
      author: authorInput.value,
      url: urlInput.value,
    }

    newBlog = _newBlog
  })
  form.onsubmit = mockSubmitHandler

  userEvent.click(submitButton)

  screen.debug()

  expect(JSON.stringify(newBlog)).toBe(
    JSON.stringify(mockBlog)
  )

})
