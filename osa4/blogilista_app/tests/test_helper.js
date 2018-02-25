const Blog = require('../models/blog')
const User = require('../models/user')

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(Blog.format)
}

const usersInDb = async () =>{
    const users = await User.find({})
    return users.map(User.format)
}

const allTestBlogs = [{
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
    user: null
},
{
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
    user: null
},
{
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
    user: null
},
{
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
    user: null
},
{
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
    user: null
},
{
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
    user: null
}
]
//Test inputs
const busiestBlogger = {
    author: "Robert C. Martin",
    blogs: 3
}

const busiestBlogger2 = {
    author: "Edsger W. Dijkstra",
    blogs: 3
}

const mostPopularBlogger = {
    author: "Edsger W. Dijkstra",
    likes: 17
}

const mostPopularBlogger2 = {
    author: "Robert C. Martin",
    likes: 17
}

const bobbyIsAheadInTheGame = {
    _id: "5a422b891b54a676234d17fb",
    title: "First class tests and other horrors",
    author: "Robert C. Martin",
    url: "www.google.com",
    likes: 5,
    __v: 0,
    user: null
}

const mostLikedBlog = {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
    user: null
}

const mostLikedBlogDuplicate = {
    _id: "5a422b3a1b54a676234d17f8",
    title: "Canonical string reduction, part deux",
    author: "Edsger W. Dijkstra & Sons",
    url: "www.google.com",
    likes: 12,
    __v: 0,
    user: null
}

const busiestAuthorAddition1 = {
    _id: "5a422b3a1b54a676234d17f7",
    title: "Canonical string reduction, third times the charm",
    author: "Edsger W. Dijkstra",
    url: "www.google.com",
    likes: 0,
    __v: 0,
    user: null
}

const oneTestBlog = [{
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
    user: null
}]





const allTestUsers = [
    { username: "Alfa", name: "A. Lfa", password: "topsecret", adult: true},
    { username: "Beta", name: "B. Eta", password: "qwerty", adult: true},
    { username: "Gamma", name: "G. Amma", password: "12345", adult: false}
]

module.exports = {
    allTestBlogs, allTestUsers, blogsInDb, usersInDb
  }