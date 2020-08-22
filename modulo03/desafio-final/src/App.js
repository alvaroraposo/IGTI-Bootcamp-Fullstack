import React, { useState } from 'react';
import Header from './components/Header';
import InputGroup from './components/InputGroup';
import css from './app.module.css'
import MonthResult from './components/MonthResult';

export default function App() {
  const [capitalInicial, setCapitalInicial] = useState(100);
  const [taxaDeJuros, setTaxaDeJuros] = useState(1.0);
  const [periodo, setPeriodo] = useState(1);

  const values = {
    capitalInicial,
    taxaDeJuros,
    periodo
  }

  const handleCapitalInicial = (newCapitalInicial) => {
    const capitalInicial = newCapitalInicial;

    setCapitalInicial(capitalInicial);
  }

  const handleTaxaDeJuros = (newTaxaDeJuros) => {
    const taxaDeJuros = newTaxaDeJuros;

    setTaxaDeJuros(taxaDeJuros);
  }

  const handlePeriodo = (newPeriodo) => {
    const periodo = newPeriodo;

    setPeriodo(periodo);
  }

  const onChangeEvents = {
    handleCapitalInicial,
    handleTaxaDeJuros,
    handlePeriodo
  }
  
  const itensPerRow = 6;
  const monthRowsArray = [];
  let monthResultArray = [];

  for(let month = 1; month <= periodo; month++) {
    monthResultArray.push(month);

    if(month % itensPerRow === 0){
      monthRowsArray.push(Object.assign([], monthResultArray));
      monthResultArray = [];
    }
  }

  if(monthResultArray.length > 0)
    monthRowsArray.push(monthResultArray);

  return (
    <div className={css.appDiv}>
      <Header/>
      <InputGroup values={values} onChangeEvents={onChangeEvents}/>
      {
        monthRowsArray.map(monthResultArray => {
          return (
            <div className={css.monthGroup}>
              {monthResultArray.map(month => {
                return <MonthResult values={values} month={month}/>
              })}
            </div>
          )
        })
      }
    </div>      
  )      
}
