const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const BlogComment = require('../models/comment')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {_id: 1, username: 1, name: 1}).populate('comments', {_id: 1, content: 1})
    response.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    try{
        const token = request.token
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'Token missing or invalid' })
        }    

        const user = await User.findById(decodedToken.id)
        blog.user = user._id

        if (blog.likes === null || typeof(blog.likes) === 'undefined'){
            blog.likes = 0
        }

        if (blog.title === null || typeof(blog.title) === 'undefined' || blog.url === null || typeof(blog.url)==='undefined'){
            response.status(400).json()
        }
        blog.__v = 0;
        await blog.save()
        user.blogs = user.blogs.concat(blog._id)
        result = await Blog.findById(blog._id).populate('user', {_id: 1, username: 1, name: 1}).populate('comments', {_id: 1, content: 1})
        response.status(201).json(result)

    } catch(exception) {
        if (exception.name === 'JsonWebTokenError' ) {
            response.status(401).json({ error: exception.message })
        } else {
            response.status(500).json({ error: 'Something dun fuck up now!' })
        }
    }
})

blogsRouter.post('/:id/comment', async (request, response) =>{
    const blogComment = new BlogComment(request.body)
    try{
        const blog = await Blog.findById(request.params.id)
        blogComment.blog = blog.id
        const newComment = await blogComment.save()
        if (blog.comments === null){
            blog.comments = [newComment._id]
        } else {
            blog.comments = blog.comments.concat(newComment._id)
        }
        if (blog.__v === null || blog.__v === 'undefined'){
            blog.__v = 0;
        }
        const updatedBlog = await blog.save()
        response.status(201).json(updatedBlog)
    } catch (exception) {
        console.log('exception: ', exception)
        response.status(400).json({ error: 'Something dun fuck up now!' })
    }
})

blogsRouter.delete('/:id', async (request, response) =>{
    
    try{
        const token = request.token
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
          return response.status(401).json({ error: 'Token missing or invalid' })
        }
        const blog = await Blog.findById(request.params.id)
        if ( blog.user.toString() === decodedToken.id.toString() || blog.user.toString === ''){
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } else {
            response.status(403).json({ error: 'Deleting other peoples blog entries is a no no...'})
        }
    } catch (exception) {
        if (exception.name === 'JsonWebTokenError' ) {
            response.status(401).json({ error: exception.message })
        } else {
            response.status(400).json({ error: 'Something dun fuck up now!' })
        }
    }

})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        _id: body._id,
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        comments: body.comments,
        __v: body.__v
    }
    try{
        await Blog.findByIdAndUpdate(request.params.id, blog )
        response.json(blog)
    } catch (exception){
        response.status(400).send()
    }
})


module.exports = blogsRouter