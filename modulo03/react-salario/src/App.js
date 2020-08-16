import React, { Component } from 'react';
import Header from './components/Header';
import InputFullSalary from './components/InputFullSalary';
import InputReadOnly from './components/InputReadOnly';
import css from './app.module.css';
import ProgressBarSalary from './components/ProgressBarSalary';

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      fullSalary: 0
    }
  }

  handleFullSalary = (newSalary) => {
    const fullSalary = newSalary;

    this.setState({ fullSalary });
  }

  render() {
    return (
      <div className={css.mainStyle}>
        <Header/>
        <InputFullSalary fullSalary={this.state.fullSalary} onChangeFullSalary={this.handleFullSalary}/>
        <InputReadOnly fullSalary={this.state.fullSalary}/>
        <ProgressBarSalary fullSalary={this.state.fullSalary}/>
      </div>
    );
  }
}
