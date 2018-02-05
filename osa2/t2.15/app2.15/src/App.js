import React from 'react';
import personService from './services/persons'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: ''
        }
    }

    componentWillMount() {
        personService.getAll().then(personList => {
            this.setState({ persons: personList})
        })
      }    

    handleNameChange = (event) => {
        console.log(event.target.value)
        this.setState({ newName: event.target.value })
    }

    handleNumberChange = (event) => {
        console.log(event.target.value)
        this.setState({ newNumber: event.target.value })
    }

    handleFilterChange = (event) => {
        console.log(event.target.value)
        this.setState({ filter: event.target.value })
    }    

    addNameAndNumber = (event) => {
        console.log('addName alkaa')
        event.preventDefault()

        const nimet = this.state.persons.map(person => person.name);
        const numerot = this.state.persons.map(person => person.number)

        if (nimet.includes(this.state.newName) || numerot.includes(this.state.newNumber)){
            alert('Ei duplikaattinimiä eikä numeroita!')
            return;
        }
        const personObject = {
            name: this.state.newName,
            number: this.state.newNumber
        }
        personService.create(personObject).then(newPerson =>
            this.setState({
                persons: this.state.persons.concat(newPerson),
                newName: '',
                newNumber: '',
                filter: ''
                })
        );
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <FilterElement filterText={this.state.filter} eventHandler={this.handleFilterChange}/>
                <h2>Lisää uusi</h2>
                <NewElement submitFunction={this.addNameAndNumber} newName={this.state.newName} newNumber={this.state.newNumber} 
                            nameEventHandler={this.handleNameChange} numberEventHandler={this.handleNumberChange}/>
                <h2>Numerot</h2>
                <NumbersElement persons={this.state.persons} filterText={this.state.filter}/>
            </div>
        )
    }
}

const FilterElement = ( props ) =>{
    return (
        <form>
            <div>
                rajaa näytettäviä: <input value={props.filterText} onChange={props.eventHandler}/>
            </div>
        </form>
    )
}

const NewElement = (props) => {
    return(
        <form onSubmit = {props.submitFunction}>
            <div>
                nimi: <input value={props.newName} onChange={props.nameEventHandler}/>
            </div>
            <div>
                numero: <input value={props.newNumber} onChange={props.numberEventHandler}/>
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}

const NumbersElement = (props) => {
    const naytettavatHenkilot = props.persons.filter(person => person.name.toLowerCase().includes(props.filterText.toLowerCase()) || 
                                person.number.includes(props.filterText))
    const henkilot = naytettavatHenkilot.map(person => <tr key={person.name}><td>{person.name}</td><td>{person.number}</td></tr>)
    return(
        
        <table>
            <tbody>
                {henkilot} 
            </tbody>
        </table>
    )
}
export default App