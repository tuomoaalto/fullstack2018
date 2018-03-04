import React from 'react';
import PropTypes from 'prop-types'

class App extends React.Component {
    constructor(props) {
        super(props)
            this.state = {
                newAnecdote: ''
            }
    }
    componentDidMount() {
        const { store } = this.context
        this.unsubscribe = store.subscribe(() =>
            this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    handleVoteClick = (nappi, id) => () => {
        this.context.store.dispatch({ type: nappi, id: id})
    }

    handleSubmit = (nappi, anecdote, event) => {
        event.preventDefault()
        event.cancelBubble = true;
        if (event.stopPropagation) event.stopPropagation();
        console.log(event)
        console.log(event.target)
        console.log('nappi:', nappi)
        console.log('anecdote:', anecdote)
        this.context.store.dispatch({ type: nappi, data: anecdote})
        this.setState({newAnecdote: ''})
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState({newAnecdote: event.target.value})
    }

    render() {
        const anecdotes =  this.context.store.getState()
        
        return (
            <div>
                <h2>Anecdotes</h2>
                {anecdotes.map(anecdote=>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content} 
                        </div>
                        <div>
                            has {anecdote.votes} votes. <button onClick={this.handleVoteClick('VOTE', anecdote.id)}>Vote</button>
                        </div>
                    </div>
                )}
                <h2>create new</h2>
                <form onSubmit={(e) => this.handleSubmit('NEW', this.state.newAnecdote, e)}>
                    <div>
                        <input type="text" value={this.state.newAnecdote} onChange={this.handleChange}/>
                    </div>
                    <button type="submit">create</button> 
                </form>
            </div>
        )
    }
}

App.contextTypes = {
    store: PropTypes.object
}

export default App