import React from 'react'
import TableUser from './TableUser'

const tableStyle = {
    width: 200
}

const headerStyle = {
    textAlign: 'left',
    width: '50%'
}

const bodyStyle = {
    textAlign: 'left',
    width: '50%'
}

const UserList = ({ users }) => {
    return (
        <div>
            <h2>Users</h2>
            <table style={tableStyle}>
                <tbody>
                    <tr>
                        <th style={headerStyle}>Username</th>
                        <th style={headerStyle}>Blogs added</th>
                    </tr>
                    {users.map(user => <TableUser key={user._id} user={user} bodyStyle={bodyStyle}/>)}
                </tbody>
            </table>
        </div>
    )
}
export default UserList
