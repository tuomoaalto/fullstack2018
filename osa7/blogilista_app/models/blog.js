const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogComment' }]
})

blogSchema.statics.format = (blog) => {
    return {
        _id: blog._id,
        __v: blog.__v,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: blog.user,
        comments: blog.comments
    }
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog

