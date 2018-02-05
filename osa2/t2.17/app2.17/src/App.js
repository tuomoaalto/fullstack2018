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
        var doUpdate = false;
        var nameExists = false;
        var numberExists = false;
        event.preventDefault()

        const nimet = this.state.persons.map(person => person.name);
        const numerot = this.state.persons.map(person => person.number)

        if (nimet.includes(this.state.newName)){
            if (window.confirm('Nimi on jo rekisterissä. Korvataanko?')) { 
                doUpdate = true
                nameExists = true
            }  
        }
        else if (numerot.includes(this.state.newNumber)) {
            if (window.confirm('Numero on jo rekisterissä. Korvataanko?')){
                doUpdate = true
                numberExists = true
            }
        }

        if (doUpdate){
            let personToUpdate;
            if (nameExists){
                personToUpdate = this.state.persons.filter(person => person.name === this.state.newName)
            } else if (numberExists) {
                personToUpdate = this.state.persons.filter(person => person.number === this.state.newNumber)
            }
            console.log('id to update:', personToUpdate[0].id)
            this.updateNameOrNumber(personToUpdate[0].id, nameExists);
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
    };

    updateNameOrNumber = (id, nameExists) => {
        console.log('id: ', id)
        console.log('nameExists: ', nameExists)
        console.log('newName: ', this.state.newName)
        console.log('newNumber: ', this.state.newNumber)
        const person = this.state.persons.find(person => person.id === id)
        let modifiedPerson
        if (nameExists){
            modifiedPerson = { ...person,  number: this.state.newNumber}
        } else {
            modifiedPerson = { ...person,  name: this.state.newName}
            
        }

        console.log('person: ', person)
        console.log('modifiedPerson: ', modifiedPerson)

        personService
        .update(id, modifiedPerson)
        .then(modifiedPerson => {
            this.setState({
                persons: this.state.persons.map(person => person.id !== id ? person : modifiedPerson),
                newName: '',
                newNumber: ''
            })
        })
    };

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