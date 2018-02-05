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
        console.log('addName alkaa')
        event.preventDefault()

        const nimet = this.state.persons.map(person => person.name);

        if (nimet.includes(this.state.newName)){
            alert('Ei duplikaatteja!')
            return;
        }
        const personObject = {
            name: this.state.newName
        }
        console.log('personObject', personObject)
        const newPersons = this.state.persons.concat(personObject)
        this.setState({
            persons: newPersons,
            newName: ''
        })
    }

    updateStateValue = (stateToChange, value) => {
        return () =>{
            this.setState({[stateToChange]: value})
        }
    }


    render() {
        const nimet = this.state.persons.map(person => <li key={person.name}>{person.name}</li>)
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