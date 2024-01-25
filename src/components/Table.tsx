import React from 'react'
import Column from './Column'

const Table: React.FC<{ users: any[] }> = ({ users }) => {
    if (!users || users.length === 0 || users.some(row => row == null)) {
        return <p>No data</p>;
    }

    const findDuplicateIndex = (user: { Phone: any; Email: any; }, index: number) => {
        return users.findIndex((u, i) => {
            const phoneMatch = u.Phone?.trim().toString() === user.Phone.toString();
            const emailMatch = u.Email?.trim().toString().toLowerCase() === user.Email?.toLowerCase();

            return (phoneMatch || emailMatch) && index !== i;
        });
    };

    const rows = users.map((user, index) => {
        const duplicateIndex = findDuplicateIndex(user, index);
        return (
            <tr key={index}>
                <td style={{border: '3px solid #000'}}>{index}</td>
                {Object.keys(users[0]).map(key => (
                    <Column user={user} field={key} key={key}/>
                ))}
                <td style={{border: '3px solid #000'}}>{duplicateIndex !== -1 && duplicateIndex}</td>
            </tr>
        );
    });

    return (
        <table style={{border: '3px solid #000', borderCollapse: 'collapse'}}>
            <thead style={{backgroundColor: '#cfcaff'}}>
                <tr>
                    <th style={{border: '3px solid #000'}}>ID</th>
                    {
                        Object.keys(users[0]).map(k=> (
                            <th 
                                key={k}
                                style={{border: '3px solid #000'}}
                            >
                                {k}
                            </th>
                        ))
                    }
                    <th style={{border: '3px solid #000'}}>Duplicate</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
    </table>
    )
}

export default Table