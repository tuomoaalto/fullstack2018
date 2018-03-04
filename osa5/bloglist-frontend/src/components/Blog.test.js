import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
    it('when clicked false, renders only title and author', () => {
        const blog = {
            user: {
                username: "Alfa", 
                name: "A. Lfa", 
                adult: true,
            },            
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7
        }

        const mockHandler = jest.fn()

        const blogComponent = shallow(
            <Blog blog={blog}
            clicked={false}
            handleLikeClick=''
            handleDeleteClick=''
            terminator=''
            handleBlogClick={mockHandler}/>
        )

        const contentDiv = blogComponent.find('.contentDiv')
        expect(contentDiv.text()).toContain(blog.author)
        expect(contentDiv.text()).toContain(blog.title)
        expect(contentDiv.text()).not.toContain(blog.likes)
        expect(contentDiv.text()).not.toContain(blog.url)
        expect(contentDiv.text()).not.toContain(blog._id)
    })

    it('when clicked true, renders everything', () => {
        const blog = {
            user: {
                 username: "Alfa", 
                 name: "A. Lfa", 
                 adult: true,
            },
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7
        }

        const mockHandler = jest.fn()

        const blogComponent = shallow(
            <Blog blog={blog}
            clicked={true}
            handleLikeClick=''
            handleDeleteClick=''
            terminator=''
            handleBlogClick={mockHandler}/>
        )

        const contentDiv = blogComponent.find('.contentDiv')
        expect(contentDiv.text()).toContain(blog.author)
        expect(contentDiv.text()).toContain(blog.title)
        expect(contentDiv.text()).toContain(blog.likes)
        expect(contentDiv.text()).toContain(blog.url)

    })    

})