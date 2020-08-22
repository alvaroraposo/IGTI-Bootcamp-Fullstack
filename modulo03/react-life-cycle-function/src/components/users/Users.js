import React, { useState, useEffect } from 'react'
import User from './User';

export default function Users({users}) {
    // constructor()
    const [secondsVisible, setSecondsVisible] = useState(0);

    useEffect(() => {
        // componentDidMount()
        const interval = setInterval(() => {
            setSecondsVisible(secondsVisible + 1);
        }, 1000);
        return () => {
            // componentWillUnmount()
            clearInterval(interval);
        }
        //Variável monitorada: função será executada cada vez que o estado foi alterado. Caso vazio, função executada somente uma vez.
    }, [secondsVisible])

    return (
        <div>
            <p>Componente Users Visível por {secondsVisible}</p>
            <ul>
                {users.map((user) => {
                    const { login } = user;
                    return <li key={login.uuid}><User user={user}/></li>
                })}
            </ul>            
        </div>
    )
}
