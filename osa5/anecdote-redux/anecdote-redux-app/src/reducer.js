const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
    let newAnecdote
    switch (action.type) {
        case 'VOTE':
            let votedA = state.findIndex(a => a.id === action.id);
            state[votedA].votes = state[votedA].votes+1
            return sortedState(state)
        case 'NEW':
            newAnecdote = asObject(action.data)
            state = [...state, newAnecdote]
            return sortedState(state)
        default:
            return sortedState(state)
    }
}
const sortedState = (state) => {
    return state.sort((a, b) => {return a.votes > b.votes ? -1:1} )
}


export default reducer
