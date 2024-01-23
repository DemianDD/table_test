import React from 'react'
import Column from './Column'

const Table: React.FC<{ users: any[] }> = ({ users }) => {
    var rows = users.map((user, index) => { 
        var dublicate = users.findIndex((u, i) => (
            u["Phone"].toLowerCase() === user["Phone"].toLowerCase() || 
            u["Email"].toLowerCase() === user["Email"].toLowerCase()) && 
            index !== i);
        
        return (<tr key={index}>
            <td style={{border: '3px solid #000'}}>{index}</td>
            {
                Object.keys(users[0]).map(k=> (
                    <Column user={user} field={k} key={k}/>
                ))
            }
            <td style={{border: '3px solid #000'}}>{dublicate === -1 ? "" : dublicate}</td>
        </tr>)
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