import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
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

  // const component = render(
  //   <Blog blog={blog} user={user} />
  // )
  render(
    <Blog blog={blog} user={user} />
  )
  // const container = component.container

  // component.debug()

  expect(screen.getByText('testTitle')).toBeVisible()
  expect(screen.getByTestId('URL')).not.toBeVisible()
  expect(screen.getByTestId('AUTHOR')).not.toBeVisible()

})