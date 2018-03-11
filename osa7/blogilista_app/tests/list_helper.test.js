const listHelper = require('../utils/list_helper')

test('dummy is called', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(oneTestBlog)
        expect(result).toBe(7)
    })

    test('when list has many blogs, equals the likes of all combined', () => {
        const result = listHelper.totalLikes(allTestBlogs)
        expect(result).toBe(36)
    })
})

describe('most liked blog', () => {
    test('when list has many blogs, equals the one with most likes', () => {
        const result = listHelper.favoriteBlog(allTestBlogs)
        expect(result).toEqual(mostLikedBlog)
    })

    test('when list has many blogs with two or more authors with the highest number of likes, equals to the one found first.', () => {
        allTestBlogs.push(mostLikedBlogDuplicate)
        const result = listHelper.favoriteBlog(allTestBlogs)
        expect(result).toEqual(mostLikedBlog)
    })
})

describe('busiest author', () => {
    test('when list has many blogs, equals the author and post number of the author who has most posts', () => {
        const result = listHelper.mostBlogs(allTestBlogs)
        expect(result).toEqual(busiestBlogger)
    })
    test('when list has many blogs with two or more authors with the highest number of posts, equals the author and post number of the author who is found first in the list', () => {
        allTestBlogs.push(busiestAuthorAddition1)
        const result = listHelper.mostBlogs(allTestBlogs)
        expect(result).toEqual(busiestBlogger2)
    })
})

describe('most liked author', () => {
    test('when list has many blogs, equals to the author and sum of likes of the author who has most likes in all posts', () => {
        const result = listHelper.mostLikes(allTestBlogs)
        expect(result).toEqual(mostPopularBlogger)
    })
    test('when list has many blogs with two or more authors with the highest sum of likes, equals to the author and sum of likes of the author who is found first in the list', () => {
        allTestBlogs.splice(0, 0, bobbyIsAheadInTheGame)
        const result = listHelper.mostLikes(allTestBlogs)
        expect(result).toEqual(mostPopularBlogger2)
    })
})


const allTestBlogs = [{
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
},
{
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
},
{
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
},
{
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
},
{
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
},
{
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
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
    __v: 0
}

const mostLikedBlog = {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
}

const mostLikedBlogDuplicate = {
    _id: "5a422b3a1b54a676234d17f8",
    title: "Canonical string reduction, part deux",
    author: "Edsger W. Dijkstra & Sons",
    url: "www.google.com",
    likes: 12,
    __v: 0
}

const busiestAuthorAddition1 = {
    _id: "5a422b3a1b54a676234d17f7",
    title: "Canonical string reduction, third times the charm",
    author: "Edsger W. Dijkstra",
    url: "www.google.com",
    likes: 0,
    __v: 0
}

const oneTestBlog = [{
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
}]