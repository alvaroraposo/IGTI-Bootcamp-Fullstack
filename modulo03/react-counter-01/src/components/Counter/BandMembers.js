import React, { Component } from 'react'

export default class BandMembers extends Component {
    constructor(){
        super();

        this.state = { 
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
    }    
    render() {
        const {bandName, bandMembers} = this.state;

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
}
