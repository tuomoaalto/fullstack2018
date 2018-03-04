import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
    <div>
        <div className='titleandauthorclass'>
            {blog.title} {blog.author}
        </div>
        <div className='likeClass'>
            blog has {blog.likes} likes
            <button className='button' onClick={onClick}>like</button>
        </div>
  </div>
)

export default SimpleBlog