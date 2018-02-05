import React, { Component } from 'react';
import countryService from './services/countryService'
import './App.css'


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            searchFilter: '',
            selectedCountry: ''
        }
    }

    componentWillMount() {
        countryService.getAll().then(countryList => {
            this.setState({ countries: countryList})
        })
      }   

    handleFilterChange = (event) => {
        console.log(event.target.value)
        this.setState({ 
            searchFilter: event.target.value,
            selectedCountry: ''
        })
    }

    handleListItemClick = (event) => {
        const targetCountryCode = event.target.getAttribute('id');
        this.setState({
            selectedCountry: this.state.countries.filter(country => country.numericCode === targetCountryCode)[0]
        })
    }    

    render() {
        console.log('selectedCountry: ', this.state.selectedCountry)
        let showCountries = []

        if (this.state.searchFilter !== ''){
            showCountries = this.state.countries.filter(country => country.name.toLowerCase().includes(this.state.searchFilter.toLowerCase()))
        }

        console.log('showCountries.length.......: ', showCountries.length)
        console.log('this.state.searchFilter....: ', this.state.searchFilter)
        console.log('this.state.selectedCountry.: ', this.state.selectedCountry)

        if (this.state.selectedCountry !== '' || showCountries.length===1){
            console.log('1st.')
            let displayedCountry = null
            if (this.state.selectedCountry === ''){
                displayedCountry = showCountries[0];
            } else {
                displayedCountry = this.state.selectedCountry;
            }

            return (
                <div>
                    <form>
                        <SearchField inputValue={this.state.searchFilter} onChangeHandler={this.handleFilterChange}/>
                        <CountryInfo country={displayedCountry}/>
                    </form>
                </div> 
            )
        }        
        else if (showCountries.length > 10){
            console.log('2nd.')
            return (
                <div>
                    <form>
                        <SearchField inputValue={this.state.searchFilter} onChangeHandler={this.handleFilterChange}/>
                        <p>Too many matches, type some more</p>
                    </form>
                </div>
            )
        }    
        else if (showCountries.length >= 1 && showCountries.length < 10) {
            console.log('3rd.')
            return(
                <div>
                    <form>
                        <SearchField inputValue={this.state.searchFilter} onChangeHandler={this.handleFilterChange}/>
                        <ul>
                            {showCountries.map(country => <li key={country.numericCode}><div id={country.numericCode} onClick={this.handleListItemClick}>{country.name}</div></li>)}
                        </ul>
                    </form>
                </div>                
            )
        }
        else if (this.state.searchFilter === ''){
            console.log('4th.')
            return (
                <div>
                    <form>
                        <SearchField inputValue={this.state.searchFilter} onChangeHandler={this.handleFilterChange}/>
                        <p>Type something...</p>
                    </form>
                </div> 
            )
        }
        else{
            console.log('5th.')
            return (
                <div>
                <form>
                    <SearchField inputValue={this.state.searchFilter} onChangeHandler={this.handleFilterChange}/>
                </form>
            </div> 
            ); 
        }

    }
}

const SearchField = ({inputValue, onChangeHandler}) =>{
    return (
            <div>
                Search for countries: <input value={inputValue} onChange={onChangeHandler}/>
            </div>
    );   
}

const CountryInfo = ({country}) => {
    if (country !== null){
        return(
            <div>
                <h1>{country.name} {country.nativeName}</h1>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
                <img className='flag' src={country.flag} height='250' width='500' alt='The flag should be here...'/>
            </div>
        )
    } else {
        return ''
    }

}

export default App;
