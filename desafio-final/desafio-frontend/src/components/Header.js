import React from 'react';
import css from './style/header.module.css';

function Header()  {
    return (
        <>
            <h1 className={css.headerH1}>Bootcamp Full Stack - Desafio Final</h1>
            <h2 className={css.headerH2}>Controle Financeiro Pessoal</h2>
        </>
    )
}

export default Header;