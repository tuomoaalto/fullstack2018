import React from 'react'
import Blog from './Blog'

const BlogForm = ({ handleSubmit, handleStateChange, handleLogout, username, title, author, url, blogs, handleBlogClick, handleLikeClick, handleDeleteClick, terminator }) => {

    return (
        <div>
            <div className='userInfo'>
                <p>User {username} logged in <button onClick={handleLogout}>logout</button></p>
            </div>
            Add new post:
            <form className='newBlogForm' onSubmit={handleSubmit}>
                Title
                <input type="text" name="newBlogTitle" value={title} onChange={handleStateChange}/><br/>
                Author
                <input type="text" name="newBlogAuthor" value={author} onChange={handleStateChange}/><br/>
                Url
                <input type="text" name="newBlogUrl" value={url} onChange={handleStateChange}/><br/>
                <button type="submit">Post!</button>
            </form>
            <br/>
            {
                blogs.map(blog => <Blog 
                    key={blog._id} 
                    blog={blog}
                    clicked={blog.clicked}
                    handleBlogClick={handleBlogClick}
                    handleLikeClick={handleLikeClick}
                    handleDeleteClick={handleDeleteClick}
                    terminator={terminator}
                    />
            )}
        </div>
    )

}


  export default BlogForm