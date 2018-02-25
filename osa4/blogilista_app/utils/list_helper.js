const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const totalLikes = blogs.reduce( (likes, blog) => {
        return likes + blog.likes
    }, 0)
    return totalLikes
}

const favoriteBlog = (blogs) => {
    const mostLikedBlog = blogs.reduce( (prev, current) => {
        return (prev.likes >= current.likes) ? prev : current
    })    
    return mostLikedBlog
}

const mostBlogs = (blogs) => {
    const busyBloggerList = [];

    blogs
        .reduce( (prev, blog) => {
            busyBlogger = ({author: blog.author, blogs: 1})
            if (bloggerInList(busyBloggerList, busyBlogger)){
                let updatedBlogger = busyBloggerList.find((blogger) => { return blogger.author === busyBlogger.author })
                updatedBlogger.blogs = updatedBlogger.blogs+1
            } else {
                busyBloggerList.push(busyBlogger)
            }
        }, {})
    const busiestBlogger = busyBloggerList.reduce( (prev, current) => {
        return (prev.blogs >= current.blogs) ? prev : current
    })
    return busiestBlogger
}

const mostLikes = (blogs) => {
    const popularBloggerList = [];

    blogs
    .reduce( (prev, blog) => {
        popularBlogger = ({author: blog.author, likes: blog.likes})
        if (bloggerInList(popularBloggerList, popularBlogger)){
            let updatedBlogger = popularBloggerList.find((blogger) => { return blogger.author === popularBlogger.author })
            updatedBlogger.likes = updatedBlogger.likes+blog.likes
        } else {
            popularBloggerList.push(popularBlogger)
        }
    }, {})
    const mostPopularBlogger = popularBloggerList.reduce( (prev, current) => {
        return (prev.likes >= current.likes) ? prev : current
    })
    return mostPopularBlogger
}


const bloggerInList = (busyBloggerList, busyBlogger) => {
    var bloggerExists = false
    busyBloggerList.forEach( (blogger) =>{
        if (blogger.author === busyBlogger.author){
            bloggerExists = true;
        }
    })
    return bloggerExists
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }

