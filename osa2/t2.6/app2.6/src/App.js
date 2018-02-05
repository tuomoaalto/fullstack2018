import React from 'react';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [
                {
                    name: 'Arto Hellas' 
                }
            ],
            newName: ''
        }
    }

    handleNameChange = (event) => {
        console.log(event.target.value)
        this.setState({ newName: event.target.value })
      }

    addName = (event) => {
        event.preventDefault()
        const personObject = {
            name: this.state.newName
        }
        console.log('personObject', personObject)
        const newPersons = this.state.persons.concat(personObject)
        this.setState({
            persons: newPersons,
            newName: ''
        })
        console.log('newPersons: ', newPersons)
        console.log('persons: ', this.state.persons)
        console.log('newName ', this.state.newName)
    }

    updateStateValue = (stateToChange, value) => {
        return () =>{
            this.setState({[stateToChange]: value})
        }
    }


    render() {
        console.log("Nimet: ", this.state.persons)
        const nimet = this.state.persons.map(person => <li key={person.name}>{person.name}</li>)
        console.log('nimet: ', nimet)
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <form onSubmit={this.addName}>
                    <div>
                        nimi: <input value={this.state.newName} onChange={this.handleNameChange}/>
                    </div>
                    <div>
                        <button type="submit">lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <ul>
                    {nimet}
                </ul>
            </div>
        )
    }
}

export default App