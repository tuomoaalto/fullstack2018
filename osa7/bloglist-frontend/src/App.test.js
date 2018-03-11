import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')

const testUser = {
    username: 'tester',
    token: '1231231214',
    name: 'Teuvo Testaaja'
}

describe('<App />', () => {
    let app

    describe('when user is not logged', () => {
        beforeEach(() => {
            // luo sovellus siten, että käyttäjä ei ole kirjautuneena
            localStorage.setItem('loggedBlogAppUser', '')
            app = mount(<App
                loginVisible=''
                blogs={[]}
                newBlogTitle=''
                newBlogAuthor=''
                newBlogUrl=''
                username=''
                password=''
                user=''
                infoMsg=''
                errMsg=''
            />)
        })

        it('only login form is rendered', () => {
            app.update()
            const loginForm = app.find('.loginForm')
            expect(loginForm.length).toEqual(1)
            const blogs = app.find(Blog)
            expect(blogs.length).toEqual(0)
        })
    })

    describe('when user is logged', () => {
        beforeEach(() => {
            // luo sovellus siten, että käyttäjä on kirjautuneena
            localStorage.setItem('loggedBlogAppUser', JSON.stringify(testUser))
            app = mount(<App
                loginVisible=''
                blogs={[]}
                newBlogTitle=''
                newBlogAuthor=''
                newBlogUrl=''
                username=''
                password=''
                user={testUser}
                infoMsg={null}
                errMsg={null}
            />)
        })

        it('all blogs are rendered', () => {
            app.update()
            const blogList = app.find(Blog)
            expect(blogList.length).toEqual(7)
            const userInfo = app.find('.userInfo')
            expect(userInfo.length).toEqual(1)
            const blogForm = app.find('.newBlogForm')
            expect(blogForm.length).toEqual(1)
            const loginForm = app.find('.loginForm')
            expect(loginForm.length).toEqual(0)
        })
    })
})