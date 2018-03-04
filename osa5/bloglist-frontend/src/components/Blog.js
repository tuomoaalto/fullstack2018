import React from 'react'
import DeleteButton from './DeleteButton'

const Blog = ({blog, clicked, handleBlogClick, handleLikeClick, handleDeleteClick, terminator}) => {

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }
  
    if (clicked === true){
        return (
            <div className='contentDiv' id={blog._id} style={blogStyle} onClick={handleBlogClick}>
                Title:  {blog.title}<br/>
                Author: {blog.author}<br/>
                {blog.url}<br/>
                {blog.likes} likes <button className='likeButton' id={blog._id} onClick={handleLikeClick}>Like</button><br/>
                Added by {blog.user.name}<br/>
                <DeleteButton doomedBlog={blog} terminator={terminator} handleDeleteClick={handleDeleteClick}/>
            </div>
          )
    
    } else {
        return (
            <div className='contentDiv' id={blog._id} style={blogStyle} onClick={handleBlogClick}>
              Title:  {blog.title}<br/>
              Author: {blog.author}<br/>
            </div>  
          )    
    }
}

export default Blog