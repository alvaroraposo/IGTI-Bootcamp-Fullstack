import React, { useState } from 'react'

export default function BandMembers() {
        
    const initialBand = {
        bandName: "Engenheiros do Hawaii",
        bandMembers: [{
            id: 1,
            integrante: "Humberto Gessinger",
            instrumento: "Baixo"
        },
        {
            id: 2,
            integrante: "Augusto Licks",
            instrumento: "Guitarra"
        },
        {
            id: 3,
            integrante: "Carlos Maltz",
            instrumento: "Bateria"
        }]
    }

    const [band] = useState(initialBand);
    const {bandName, bandMembers} = band;

    return (
        <div>
            <h4>{bandName}</h4>
            <ul>
                {bandMembers.map(({id, integrante, instrumento}) => {
                    return <li key={id}>{integrante} - {instrumento}</li>
                })}
            </ul>
        </div>           
    )
}
