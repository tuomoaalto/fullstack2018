import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                { name: 'Arto Hellas', number: '12345' },
                { name: 'Pera', number: '010-12345'},
                { name: 'Arska', number: '020-12345'},
                { name: 'Rane', number: '030-12345'},
            ],
            newName: '',
            newNumber: '',
            filter: ''
        }
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
        console.log('personObject', personObject)
        const newPersons = this.state.persons.concat(personObject)
        this.setState({
            persons: newPersons,
            newName: '',
            newNumber: '',
            filter: ''
        });
    }

    render() {
        
        const naytettavatHenkilot = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()) || 
                                    person.number.includes(this.state.filter))
        
        const henkilot = naytettavatHenkilot.map(person => <tr key={person.name}><td>{person.name}</td><td>{person.number}</td></tr>)
        
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form>
                    <div>
                        rajaa näytettäviä: <input value={this.state.filter} onChange={this.handleFilterChange}/>
                    </div>
                </form>
                <h2>Lisää uusi</h2>
                <form onSubmit={this.addNameAndNumber}>
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
                        {henkilot} 
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App