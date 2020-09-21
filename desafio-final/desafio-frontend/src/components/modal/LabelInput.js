import React from 'react'

export default function LabelInput(props) {
    const label = props.myLabel;
    const value = props.myValue;
    return (
        <div className={`row ${props.rowCol}`}>
            <div className="col-12">
                <label>{label}</label>
            </div>
            <div className="col-12">
                <input type="text" defaultValue={value} onChange={ (event) => {props.onInputChange(event.target.value)}}/>
            </div>
        </div>
    )
}
