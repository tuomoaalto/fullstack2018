const mongoose = require('mongoose')

const blogCommentSchema = new mongoose.Schema({
    content: String,
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
})

blogCommentSchema.statics.format = (blogComment) => {
    return {
        _id: blogComment._id,
        content: blogComment.content,
        blog: blogComment.blog
    }
}

const BlogComment = mongoose.model('BlogComment', blogCommentSchema)

module.exports = BlogComment

