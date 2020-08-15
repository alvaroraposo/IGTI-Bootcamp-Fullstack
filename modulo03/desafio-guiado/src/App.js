import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/headers/Header';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      allCountries: [],
      filteredCountries: [],
      filteredPopulation: 0,
      filter: ""
    }
  }  

  async componentDidMount() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();

    const allCountries = json.map(({name, numericCode, flag, population}) => {
      return {
        id: numericCode,
        name,
        filterName: name.toLowerCase(),
        flag,
        population
      }
    })

    const filteredPopulation = this.calculatePopulation(allCountries);

    this.setState({
      allCountries,
      filteredPopulation,
      filteredCountries: Object.assign([], allCountries)
    })
  }

  calculatePopulation = (countries = []) => {
    const population = countries.reduce((acc, cur) => {
      return acc + cur.population;
    }, 0);

    return population;
  }

  handleChangeFilter = (newText) => {    
    const filterLowerCase = newText.toLowerCase();
    const filteredCountries = this.state.allCountries.filter((country) => {
      return (country.filterName.includes(filterLowerCase))
    });

    const filteredPopulation = this.calculatePopulation(filteredCountries);

    this.setState({
      filter: newText,
      filteredCountries,
      filteredPopulation
    })
  }

  render() {
    const {filter, filteredCountries, filteredPopulation} = this.state;

    return (
      <div className="container">
        <h1 style={styles.centeredTitle}>React Countries</h1>
        <Header filter={filter} countryCount={filteredCountries.length} totalPopulation={filteredPopulation} onChangeFilter={this.handleChangeFilter}/>
        <Countries countries={filteredCountries}/>
      </div>
    );
  }
}

const styles = {
     centeredTitle: {
       textAlign: 'center'
     }
}
