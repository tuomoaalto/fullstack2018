import React from 'react'

const LoggedInUser = ({ username, handleLogout }) => {
    return (
        <a>{username} logged in <button onClick={handleLogout}>logout</button></a>
    )
}

export default LoggedInUser

