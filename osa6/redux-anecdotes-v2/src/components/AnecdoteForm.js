import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = (props) => {
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={(e) => handleSubmit(props, e)}>
                <div><input name='anecdote'/></div>
                <button>create</button>
            </form>
        </div>
    )
}

const handleSubmit = async(props, event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('handleSubmit target: ', event.target)
    console.log('handleSubmit content: ', content)
    const newNote = await anecdoteService.addAnecdote(content)
    props.anecdoteCreation(newNote)
    props.notify(newNote.content, 5)
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

const mapDispatchToProps = {
    anecdoteCreation,
    notify
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteForm)