import React, { Component } from 'react'
import css from './counter.module.css';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';
import BandMembers from './BandMembers';

export default class Counter extends Component {
    constructor() {
        super();
        
        this.state = {
            currentCounter: 2,
            step: 0
        }
    }

    handleButtonClick = (clickType) => {
        this.setState({ 
            currentCounter: 
            (clickType === '+' && this.state.currentCounter < 10) ?  
                this.state.currentCounter + 1 : 
                    (clickType === '-' && this.state.currentCounter > 0) ? 
                        this.state.currentCounter - 1: this.state.currentCounter,
            step: this.state.step + 1
        })
    }

    render() {        
        return (            
            <div className={css.counterContainer}>  
                <BandMembers/>              
                <DecrementButton onIncrement={this.handleButtonClick}/>
                <span className={css.counterValue}>{this.state.currentCounter}</span>
                <IncrementButton onIncrement={this.handleButtonClick}/>
                <span className={css.counterValue}>({this.state.step})</span>
            </div>
        )
    }
}
