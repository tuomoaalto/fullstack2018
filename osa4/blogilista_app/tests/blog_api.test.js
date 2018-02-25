var _ = require('lodash');
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const { app, server } = require('../index')
const {allTestBlogs, blogsInDb, allTestUsers, usersInDb} = require('./test_helper')
const api = supertest(app)

beforeAll(async () => {
    await User.remove({})
  
    const userObjects = allTestUsers.map(user => new User(user))
    const userPromiseArray = userObjects.map(user => user.save())
    await Promise.all(userPromiseArray)
})

describe('GET user -tests.', () => {
    
    test('users are returned as json', async () => {
        const usersInDatabase = await helper.usersInDb()
        
        const response = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
     
        expect(response.body.length).toBe(usersInDatabase.length)
        returnedUsernames = response.body.map(u => u.username)
        usersInDatabase.forEach(user =>{
            expect(returnedUsernames).toContain(user.username)
        })
    })
})

describe('user POST requests', () => {
    beforeEach(async () => {
        await User.remove({})
    })

    test('a new user can be added with POST', async() =>{
        const newUser = {
            username: "Zeta",
            name: "Z. Eta",
            password: "topsecret",
            adult: true
        }
        await api
            .post('/api/users/')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const usersAfterPost = await usersInDb()
        expect(usersAfterPost.length).toBe(1)
    })

    test('a new user must have password longer than 3 characters, otherwise return 400 error', async() =>{
            
            const newUser = {
                username: "Delta",
                name: "D. Elta",
                password: "moe",
                adult: true
            }
            const response = await api
                .post('/api/users/')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)
            
            expect(response.body).toEqual({ error: 'Password is too short!' })
    
            const usersAfterPost = await usersInDb()
            expect(usersAfterPost.length).toBe(0)
    })

    test('username must be unique in the system, if duplicate is inserted, return 400 error', async() =>{
        const newUser1 = { username: "Delta", name: "D. Elta", password: "verysecret", adult: true}
        const newUser2 = { username: "Delta", name: "D. Elta2", password: "verysecret2", adult: true}

        await api.post('/api/users/').send(newUser1).expect(200)
        const afterFirst = await usersInDb()
        expect(afterFirst.length).toBe(1)

        const response = await api
            .post('/api/users/')
            .send(newUser2)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(response.body).toEqual({ error: 'Username already in the system!' })
        const afterSecond = await usersInDb()
        expect(afterSecond.length).toBe(1)
    })

    test('if adult information is not provided, it must be true by default', async() =>{
        const adultlessUser = { username: "Epsilon", name: "E. Psilon", password: "your_mother_was_a_hamster"}
        const adultfulUser = { username: "Lambda", name: "L. Ambda", adult: false, password: "and_your_father_smelt_of_elderberries"}

        const response = await api
            .post('/api/users/')
            .send(adultlessUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const usersAfterPost = await usersInDb() 
        expect(usersAfterPost[0].adult).toEqual(true);

        await api.post('/api/users/').send(adultfulUser).expect(200).expect('Content-Type', /application\/json/)
        const usersAfterSecondPost = await usersInDb()
        const adulthood = usersAfterSecondPost.map(u => u.adult)
        expect(adulthood).toContain(false);
    })
})


describe('blog backend tests when there are some blogs saved', () =>{
    let userList = []
    beforeAll(async () => {
        await Blog.remove({})
        await User.remove({})

        const userObjects = allTestUsers.map(user => new User(user))
        const userPromiseArray = userObjects.map(user => user.save())
        await Promise.all(userPromiseArray)
        
        userList = await usersInDb();
        console.log('userList: ', userList)

        allTestBlogs.forEach(blog => {
            blog.user = _.sample(userList)._id
        })

        const blogObjects = allTestBlogs.map(blog => new Blog(blog))
        const blogPromiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(blogPromiseArray)
    })

    test('blogs are returned as json', async () => {
        const blogsInDatabase = await helper.blogsInDb()
        
        const response = await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
     
        expect(response.body.length).toBe(blogsInDatabase.length)
        returnedTitles = response.body.map(b => b.title)
        blogsInDatabase.forEach(blog =>{
            expect(returnedTitles).toContain(blog.title)
        })
    })


    test('a blog post can be added ', async () => {
        const newPost = {
            __v: 0,
            author: "W. Disney",
            title: "Mikki merihädässä",
            likes: 0,
            url: "www.google.com",
            user: _.sample(userList)
        }

        const blogsBefore = await helper.blogsInDb()

        await api
        .post('/api/blogs')
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogsAfter = await helper.blogsInDb()

        expect(blogsAfter.length).toBe(blogsBefore.length+1)
        const blogTitles = blogsAfter.map(b => b.title)
        expect(blogTitles).toContainEqual(newPost.title)
        //expect(blogsAfter).toContainEqual(newPost) //TODO: ei jostain syystä toimi...
    })

    test('like -value must be set to zero if no other value given', async () =>{
        const newPost = {
            title: "Minni merihädässä",
            author: "W. Disney",
            url: "www.google.com",
            likes: null,
            __v: 0,
            user: _.sample(userList)
        }

        await api
        .post('/api/blogs')
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const blogsAfter = await helper.blogsInDb()

        const likes = blogsAfter.map(b => b.likes)
        expect(likes[likes.length-1]).toBe(0)
    })

    test('blog posts must have title and url, otherwise return 400 error', async () =>{
        const newPost = {
            author: "M. Ystery",
            likes: 0,
            __v: 0,
            user: _.sample(userList)
        }

        await api
        .post('/api/blogs')
        .send(newPost)
        .expect(400)
    })

    test('blog post can be deleted with proper id', async () =>{
        const blogsBefore = await helper.blogsInDb()
        
        await api
        .delete('/api')
        
        const blogsAfter = await helper.blogsInDb()
    })

    describe('deletion of a blog', async () => {
        let addedBlog = 

        beforeAll(async () => {
            addedBlog = new Blog({
                _id: "5a422b3a1b54a676234d17b4",
                title: "Poistettava blogi",
                author: "T. Urha",
                url: "www.turha.fi",
                likes: 0,
                __v: 0,
                user: _.sample(userList)
            })
            await addedBlog.save()
        })

        test('DELETE /api/blogs/:id succeeds with proper statuscode', async () => {
            const blogsBeforeDelete = await blogsInDb()
    
            await api
                .delete(`/api/blogs/${addedBlog._id}`)
                .expect(204)
    
            const blogsAfterDelete = await helper.blogsInDb()
    
            const titles = blogsAfterDelete.map(b => b.title)
    
            expect(titles).not.toContain(addedBlog.title)
            expect(blogsAfterDelete.length).toBe(blogsBeforeDelete.length - 1)
        })

        test('DELETE /api/blogs/:id fails with proper statuscode if given id is not found', async () =>{
            const blogsBeforeDelete = await blogsInDb()
    
            await api
              .delete('/api/blogs/123456')
              .expect(400)
      
            const blogsAfterDelete = await helper.blogsInDb()
            expect(blogsAfterDelete.length).toBe(blogsBeforeDelete.length)
        })

    })

    describe('updating a blog', async () => {
        let updateableBlog 

        beforeAll(async () => {
            updateableBlog = new Blog({
                _id: "5a422b3a1b54a676234d17b2",
                title: "Päiviteltävä blogi",
                author: "H. Yödyllinen",
                url: "www.blogi.fi",
                likes: 0,
                __v: 0,
                user: _.sample(userList)
            })
            await updateableBlog.save()
        })

        test('PUT /api/blogs/:id succeeds with proper status code', async () =>{
            const update = {
                _id: "5a422b3a1b54a676234d17b2",
                title: "Päiviteltävä blogi",
                author: "H. Yödyllinen",
                url: "www.blogi.fi",
                likes: 1,
                __v: 0,
                userId: "3a422a851b54c676234d17c7"
            }
            
            await api
            .put(`/api/blogs/${update._id}`)
            .send(update)
            .expect(200)

            const blogsAfter = await helper.blogsInDb()
            const likes = blogsAfter.map(b => b.likes)
            expect(likes[likes.length-1]).toBe(updateableBlog.likes+1)
        })

        test('PUT /api/blogs/:id fails with proper status code, when given id is not found', async () =>{
            const update = {
                _id: "123456",
                title: "Spurious logic",
                author: "P. Aranoid",
                url: "www.google.com",
                likes: 1,
                __v: 0,
                userId: "3a422a851b54c676234d17c7"
            }
            
            await api
            .put('/api/blogs/123456')
            .send(update)
            .expect(400)
        })
    })

    afterAll(() => {
        server.close()
    })
})

