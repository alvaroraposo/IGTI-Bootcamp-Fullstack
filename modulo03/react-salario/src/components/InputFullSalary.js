import React, { Component } from 'react'

export default class InputFullSalary extends Component {

    handleFullSalary = (event) => {
        const newValue = event.target.value;
        this.props.onChangeFullSalary(newValue);
    }

    render() {
        const fullSallary = this.props.fullSalary;

        return (
            <div>
                <label>Salário Bruto</label>
                <input type="number" step="100" min="0" max="100000" value={fullSallary} onChange={this.handleFullSalary} onKeyPress={(event) => {event.preventDefault()} }/>
            </div>
        )
    }
}
