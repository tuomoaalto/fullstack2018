import React from 'react'

const DeleteButton = ({doomedBlog, terminator, handleDeleteClick}) => {
    if (doomedBlog.user.username === terminator || doomedBlog.user.username === 'undefined'){
        return (
            <button className='deleteButton' id={doomedBlog._id} onClick={handleDeleteClick}>Delete blog!</button>
        )
    } else {
        return (<div/>)    
    }
}

export default DeleteButton