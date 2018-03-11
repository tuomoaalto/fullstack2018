import React from 'react'

const SelectedUser = ({ user }) => {
    return (
        <div>
            <h3>{user.name}</h3>
            <div>Added blogs:</div>
            <div>
                {user.blogs.map(blog =>
                    <li key={blog._id}>
                        <a>{blog.title} by {blog.author}</a>
                    </li>
                )}
            </div>
        </div>
    )
}
export default SelectedUser
