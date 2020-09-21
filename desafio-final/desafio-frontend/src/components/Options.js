import React from 'react'
import { Button } from 'react-bootstrap'
import css from './style/options.module.css'

export default function Options(props) {
    return (
        <div className={`mt-3 row justify-content-between ${css.divOptions}`}>
            <div className="p-0 col-2"><Button className="col-12" variant="info" onClick={props.onNovoItemButtonClick}><strong>+ Novo Lançamento</strong></Button></div>
            <div className="p-0 pl-1 col-10">
                <input className="col-12" type="text" defaultValue={props.filter} placeholder="Filtro" onChange={(event) => {props.onChangeFilter(event.target.value)}}/>
            </div>
        </div>
    )
}
