import React from 'react'
import GridLine from './GridLine'

export default function GridDay(props) {

    const onEditarItemButtonClick = (item) => {
        props.onEditarItemButtonClick(item);
    }

    const onRemoverItemButtonClick = (item) => {
        props.onRemoverItemButtonClick(item);
    }

    return (
        <div id="divDia" className="mt-2 mb-1">
            {props.myTransactions.transactions.map((item) => {
                return <GridLine myItem={item} onEditarItemButtonClick={() => onEditarItemButtonClick(item)} onRemoverItemButtonClick={() => onRemoverItemButtonClick(item)}/>
            })}
            
        </div>
    )
}
