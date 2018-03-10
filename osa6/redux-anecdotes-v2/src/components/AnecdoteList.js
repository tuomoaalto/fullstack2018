import React from 'react'
import { connect } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = (props) => (
    <div>
        <h2>Anecdotes</h2>
        {props.visibleAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                    <button onClick={ (e) => handleVote(props, anecdote, e)}> vote</button>
                </div>
            </div>
        )}
    </div>
)

const handleVote = async(props, anecdote, event) => {
    event.preventDefault()
    console.log('handleVote props:', props)
    console.log('handleVote anecdote:', anecdote)
    props.anecdoteVote(anecdote)
    props.notify(anecdote.content, 5)
}

const anecdotesToShow = (anecdotes, filter) => {
    console.log('anecdotes: ', anecdotes)
    console.log('filter: ', filter)
    return anecdotes.filter(a => a.content.includes(filter)).sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
    return {
        visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter)
    }
}

const mapDispatchToProps = {
    anecdoteVote,
    notify
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)

