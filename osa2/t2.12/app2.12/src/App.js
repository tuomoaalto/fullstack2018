import React, { Component } from 'react';
import countryService from './services/countryService'
import './App.css'


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            searchFilter: ''
        }
    }

    componentWillMount() {
        countryService.getAll().then(countryList => {
            this.setState({ countries: countryList})
        })
      }   

    handleFilterChange = (event) => {
        console.log(event.target.value)
        this.setState({ searchFilter: event.target.value })
    }

    render() {
        let showCountries = []
        if (this.state.searchFilter !== ''){
            showCountries = this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.searchFilter.toLowerCase()))
        }

        return (
            <form>
                <div>
                    Search for countries: <input value={this.state.searchFilter} onChange={this.handleFilterChange}/>
                </div>
                <Countries countries={showCountries} searchFilter={this.state.searchFilter}/>
                <CountryInfo countries={showCountries}/>
            </form>
        );
  }
}

const Countries = (props) =>{
    const countries = props.countries;
    if (countries.length > 10){
        return (<p>Too many matches, type some more</p>)
    }    
    if (countries.length > 1 && countries.length < 10) {
        return(
            <ul>
                {countries.map(country => <li key={country.numericCode}>{country.name}</li>)}
            </ul>
        )
    }
    if (props.searchFilter === ''){
        return (<p>Type something...</p>)
    }
    return '' 
}

const CountryInfo = (props) => {
    const countries = props.countries;
    if (countries.length === 1){
        return(
            <div>
                <h1>{countries[0].name} {countries[0].nativeName}</h1>
                <p>Capital: {countries[0].capital}</p>
                <p>Population: {countries[0].population}</p>
                <img className='flag' src={countries[0].flag} height='200' width='400' alt='The flag should be here...'/>
            </div>
        )
    } else{
        return ''
    }
}
export default App;
