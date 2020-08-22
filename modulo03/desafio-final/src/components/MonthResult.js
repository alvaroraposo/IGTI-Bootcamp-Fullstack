import React from 'react'
import css from './styles/monthresult.module.css';

export default function MonthResult({values, month}) {
    const {capitalInicial, taxaDeJuros} = values;
    const capitalInicialFloat = parseFloat(capitalInicial);
    const taxaDeJurosFloat = parseFloat(taxaDeJuros);

    const montanteNoMes = capitalInicialFloat * ((1 + taxaDeJurosFloat/100) ** month);
    const diferenca = (montanteNoMes - capitalInicial);
    const taxaTotal = (diferenca * 100)/capitalInicial;
    
    return (
        <div className={css.monthResultDiv}>            
            <div className={css.monthResultCol}>
                <span>{month}</span>
            </div>
            <div className={css.monthResultCol}>
                <div>R$ {montanteNoMes.toFixed(2)}</div>
                <div>R$ {diferenca.toFixed(2)}</div>
                <div>{taxaTotal.toFixed(2)}%</div>
            </div>            
        </div>
    )
}
