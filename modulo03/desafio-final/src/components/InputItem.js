import React from 'react';
import css from './styles/inputitem.module.css';

export default function InputItem(props) {
    const { initialProps, value, onChange } = props;
    const { label, max, min, step } = initialProps;

    const handleEvent= (event) => {
        const newValue = event.target.value;
        onChange(newValue);
    }

    return (
        <div className={css.inputItemDiv}>
            <label>{label}</label>
            <input type="number" min={min} max={max} step={step} value={value} onKeyPress={(event) => {event.preventDefault()}} onChange={handleEvent}/>
        </div>
    )
}
