import React from 'react'
import { Link } from 'react-router-dom'

const TableUser = ({ user, bodyStyle }) => {
    return (
        <tr>
            <td style={bodyStyle}><Link to={`/users/${user._id}`}>{user.name}</Link> </td>
            <td style={bodyStyle}>{user.blogs.length}</td>
        </tr>
    )
}

export default TableUser
