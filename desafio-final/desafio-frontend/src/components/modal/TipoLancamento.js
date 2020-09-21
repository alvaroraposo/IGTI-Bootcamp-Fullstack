import React from 'react'

export default function TipoLancamento(props) {
    const receitaChecked = (props.myType === "+") ? true : false;
    const despesaChecked = (props.myType === "-") ? true : false;
    
    const isDisabled = !props.isEditable;
     
    return (
        <div className="row">
            <div className="p-0 mr-1 col-6 d-flex justify-content-end">
                <input className="mr-1" type="radio" name="tipo" defaultChecked={despesaChecked} onClick={(event) => { props.onChangeTipo((event.target.checked) ? "-": "+" ) }} disabled={isDisabled}/>
                <label>Despesa</label>
            </div>
            <div className="d-flex justify-content-start">
                <input className="mr-1" type="radio" name="tipo" defaultChecked={receitaChecked} onClick={(event) => { props.onChangeTipo((event.target.checked) ? "+": "-" ) }} disabled={isDisabled}/>
                <label>Receita</label>
            </div>                    
        </div>
    )
}
