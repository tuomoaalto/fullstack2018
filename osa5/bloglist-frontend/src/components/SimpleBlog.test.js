import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    it('renders title and author', () => {
        const blog = {
            title: 'The joys of unit testing.',
            author: 'T. Guru'
        }
        const blogComponent = shallow(<SimpleBlog blog={blog} />)
        const titleAndAuthorDiv = blogComponent.find('.titleandauthorclass')

        expect(titleAndAuthorDiv.text()).toContain(blog.title)
        expect(titleAndAuthorDiv.text()).toContain(blog.author)
    })

    it('renders correct number of likes', () => {
        const blog = {
            title: 'The joys of unit testing.',
            author: 'T. Guru',
            likes: 100
        }
        const blogComponent = shallow(<SimpleBlog blog={blog} />)
        const likeDiv = blogComponent.find('.likeClass')

        expect(likeDiv.text()).toContain(blog.likes)
    })

    it('clicking the like button twice calls event handler twice', () => {
        const blog = {
            title: 'The joys of unit testing.',
            author: 'T. Guru',
            likes: 100
        }
      
        const mockHandler = jest.fn()
      
        const blogComponent = shallow(
          <SimpleBlog
            blog={blog}
            onClick={mockHandler}
          />
        )
      
        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')
      
        expect(mockHandler.mock.calls.length).toBe(2)
      })

})