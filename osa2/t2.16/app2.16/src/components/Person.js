import React from 'react'

const Person = ({ person, deleteButton }) => {
    return (
        <tr key={person.id}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
                <button onClick={deleteButton}>Poista</button>
            </td>
        </tr>
    )
}
export default Person