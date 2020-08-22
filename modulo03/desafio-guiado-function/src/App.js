import React, { useState, useEffect } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/headers/Header';

export default function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filteredPopulation, setFilteredPopulation] = useState(0);
  const [filter, setFilter] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
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
      });

      const filteredPopulation = calculatePopulation(allCountries);
      setAllCountries(allCountries);
      setFilteredPopulation(filteredPopulation);
      setFilteredCountries(Object.assign([], allCountries));
    }    

    fetchData();
  }, [])

  const calculatePopulation = (countries = []) => {
    const population = countries.reduce((acc, cur) => {
      return acc + cur.population;
    }, 0);

    return population;
  }

  const handleChangeFilter = (newText) => {    
    const filterLowerCase = newText.toLowerCase();
    const filteredCountries = allCountries.filter((country) => {
      return (country.filterName.includes(filterLowerCase))
    });

    const filteredPopulation = calculatePopulation(filteredCountries);

    setFilter(newText);
    setFilteredCountries(filteredCountries);
    setFilteredPopulation(filteredPopulation);
  }

  return (
    <div className="container">
      <h1 style={styles.centeredTitle}>React Countries</h1>
      <Header filter={filter} countryCount={filteredCountries.length} totalPopulation={filteredPopulation} onChangeFilter={handleChangeFilter}/>
      <Countries countries={filteredCountries}/>
    </div>
  );
}

const styles = {
     centeredTitle: {
       textAlign: 'center'
     }
}
