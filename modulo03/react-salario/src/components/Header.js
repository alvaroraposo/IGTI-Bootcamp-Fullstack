import React, { Component } from 'react';
import css from './header.module.css';

export default class Header extends Component {
    render() {
        return (
            <div className={css.header}>
                <h1>React Salário</h1>
            </div>
        )
    }
}
