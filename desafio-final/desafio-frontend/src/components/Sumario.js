import React from 'react'
import css from './style/sumario.module.css';

//verde -  #2ca386 vermelho - "#cd7a4b"
export default function Sumario({myData}) {
    const data = myData ?? [0];

    const receita = data.reduce((acc, cur) => {
        return acc + cur.transactions.reduce((ac, cu) => {
            if(cu.type === "+")
                return ac + cu.value;
            else 
                return ac;
        },0);      
    },0);

    const despesa = data.reduce((acc,cur) => {
        return acc + cur.transactions.reduce((ac, cu) => {
            if(cu.type === "-")
                return ac + cu.value;
            else 
                return ac;
        },0); 
    },0);

    const lancamentos = data.reduce((acc, cur) => {
        return acc + cur.transactions.length;
    },0);

    const saldo = receita - despesa;
    const saldoColor = (saldo > 0) ? css.receita : css.despesa;
    
    return (
        <div className={`mt-3 row border ${css.divSumario}`}>
            <div className="col-3">Lançamentos: <strong>{lancamentos}</strong></div>
            <div className="col-3">Receita: <span className={css.receita}>R$ {receita},00</span></div>
            <div className="col-3">Despesa: <span className={css.despesa}>R$ {despesa},00</span></div>
            <div className="col-3">Saldo: <span className={saldoColor}>R$ {saldo},00</span></div>
        </div>
    )
}
