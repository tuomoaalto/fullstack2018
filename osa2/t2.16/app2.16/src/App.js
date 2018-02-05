import React from 'react';
import personService from './services/persons'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            searchFilter: ''
        }
    }

    componentWillMount() {
        personService.getAll().then(personList => {
            console.log('haun paluuarvo: ', personList)
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
        console.log('handleFilterChange suoritetaan')
        console.log(event.target.value)
        this.setState({ searchFilter: event.target.value })
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
                searchFilter: ''
                })
        );
    }

    deleteNameAndNumber = (id) => {
        return () => {
            if (!window.confirm("Poistetaanko rivi?")) { 
                return
            }  
            console.log('Delete person with id: ', id)
            personService.deletePerson(id).then(
                this.setState({persons: this.state.persons.filter(person => person.id !== id)})
            )    
        }
    }

    render() {
        const henkilot = this.state.persons;
        
        const naytettavatHenkilot = henkilot.filter(person => person.name.toLowerCase().includes(
            this.state.searchFilter.toLowerCase()) || person.number.includes(this.state.searchFilter))
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form>
                    <div>
                        rajaa näytettäviä: <input value={this.state.searchFilter} onChange={this.handleFilterChange}/>
                    </div>
                </form>
                <h2>Lisää uusi</h2>
                <form onSubmit = {this.addNameAndNumber}>
                            <div>
                                nimi: <input value={this.state.newName} onChange={this.handleNameChange}/>
                            </div>
                            <div>
                                numero: <input value={this.state.newNumber} onChange={this.handleNumberChange}/>
                            </div>
                            <div>
                                <button type="submit">lisää</button>
                            </div>
                        </form>

                <h2>Numerot</h2>
                <table>
                    <tbody>
                        {naytettavatHenkilot.map(person => 
                        <tr key={person.id}><td>{person.name}</td><td>{person.number}</td><td><button onClick={this.deleteNameAndNumber(person.id)}>Poista</button></td></tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App