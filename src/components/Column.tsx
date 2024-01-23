import React from 'react'
import { validateUser } from '../utils/validation'

const Column: React.FC<{ user: any, field: string }> = ({ user, field }) => {
    var validations = validateUser(user, field)

    return (
        <td style={{
            backgroundColor: `${validations.isValid === false ? "#ff8c8c" : "transparent" }`,
            border: '3px solid #000'
        }}>
            {user[field]?.toString()}
        </td>
    )
}

export default Column