import anecdoteService from '../services/anecdotes'
/*
const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}
const initialAnecdotes = anecdotesAtStart.map(asObject)

const getId = () => (100000*Math.random()).toFixed(0)
*/
const anecdoteReducer = (store = [], action) => {
    console.log('store:', store)
    if (action.type==='VOTE') {
        console.log('VOTE action: ', action)
        const old = store.filter(a => a.id !== action.votedAnecdote.id)
        return [...old, action.votedAnecdote ]
    }
    if (action.type === 'INIT') {
        console.log('action.anecdotes: ', action.anecdotes)
        return action.anecdotes
    }
    if (action.type === 'CREATE') {
        console.log('anecdoteReducer: action.content:', action.content)
        return [...store, action.content]
    }

    return store
}

export const anecdoteCreation = (content) => {
    console.log('anecdoteCreation content: ', content)
    return{
        type: 'CREATE',
        content
    }
}

export const anecdoteInitialization = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        console.log('anecdoteInitialization anecdotes', anecdotes)
        dispatch({
            type: 'INIT',
            anecdotes
        })
    }
}


export const anecdoteVote = (anecdote) => {
    return async (dispatch) => {
        const votedAnecdote = await anecdoteService.voteForAnecdote(anecdote)
        console.log('anecdoteVote votedAnecdote: ', votedAnecdote)
        dispatch({
            type: 'VOTE',
            votedAnecdote
        })
    }
}

export default anecdoteReducer