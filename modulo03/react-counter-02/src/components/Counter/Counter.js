import React, { useState } from 'react'
import css from './counter.module.css';
import IncrementButton from './IncrementButton';
import DecrementButton from './DecrementButton';
import BandMembers from './BandMembers';

export default function Counter() {
    const initialState = {
        currentCounter: 2,
        step: 0
    }

    const [state, setState] = useState(initialState);

    const handleButtonClick = (clickType) => {
        setState({ 
            currentCounter: 
            (clickType === '+' && state.currentCounter < 10) ?  
                state.currentCounter + 1 : 
                    (clickType === '-' && state.currentCounter > 0) ? 
                        state.currentCounter - 1: state.currentCounter,
            step: state.step + 1
        })
    }    

    
    return (            
        <div className={css.counterContainer}>  
            <BandMembers/>              
            <DecrementButton onIncrement={handleButtonClick}/>
            <span className={css.counterValue}>{state.currentCounter}</span>
            <IncrementButton onIncrement={handleButtonClick}/>
            <span className={css.counterValue}>({state.step})</span>
        </div>
    )

}
