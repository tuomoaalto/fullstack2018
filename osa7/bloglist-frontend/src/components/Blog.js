import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {

    return (
        <Link to={`/blogs/${blog._id}`}>
            <div id={blog._id}>
                Title:  {blog.title}<br/>
                Author: {blog.author}<br/>
            </div>
        </Link>
    )
}
export default Blog