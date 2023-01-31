import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let container
  const blog = {
    title: 'My 3rd Blog',
    author: 'Who Knows',
    url: 'example.com',
    likes: 1,
    user: {
      id: '123456123',
      name: 'pool',
      username: 'placeholder'
    }
  }

  beforeEach(() => {
    container = render(
      <Blog blog={blog} />
    ).container
  })

  test('does not render its URL or number of likes by default', () => {
    const detailedView = container.querySelector('.detailedView')
    const defaultView = container.querySelector('.defaultView')
    expect(detailedView).not.toBeVisible()
    expect(defaultView).toBeVisible()

    // const likesMockHandler = jest.fn() - handleLikesUpdate={likesMockHandler} username={'placeholder'} handleBlogRemoval={blogRemovalMockHandler}
    // const blogRemovalMockHandler = jest.fn()
  })

  test('the blog\'s URL and number of likes are shown when the button controlling the shown details has been clicked.', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const detailedView = container.querySelector('.detailedView')
    expect(detailedView).toBeVisible()
  })
})

