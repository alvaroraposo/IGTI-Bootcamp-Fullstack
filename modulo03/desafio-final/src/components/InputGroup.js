import React from 'react'
import css from './styles/inputgroup.module.css';
import InputItem from './InputItem';

export default function InputGroup(props) {
    const initialCapital = setInputItemInitialProps("Capital Inicial", 100, 1000000, 100);
    const initialTaxa = setInputItemInitialProps("Taxa de Juros (Mensal)", -12, 12, 0.1);
    const initialPeriodo = setInputItemInitialProps("Período (meses)", 1, 100, 1);
    const {capitalInicial, taxaDeJuros, periodo } = props.values;
    const {handleCapitalInicial, handleTaxaDeJuros, handlePeriodo} = props.onChangeEvents;
    
    return (
        <div className={css.inputGroupDiv}>
            <InputItem initialProps={initialCapital} value={capitalInicial} onChange={handleCapitalInicial}/>            
            <InputItem initialProps={initialTaxa} value={taxaDeJuros} onChange={handleTaxaDeJuros}/>            
            <InputItem initialProps={initialPeriodo} value={periodo} onChange={handlePeriodo}/>            
        </div>
    )
}

function setInputItemInitialProps(label, min, max, step) {
    const inputProps = {
        label,
        min,
        max,
        step
    }

    return inputProps;
}