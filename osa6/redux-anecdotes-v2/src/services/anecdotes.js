import axios from 'axios'
const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get('http://localhost:3001/anecdotes')
    return response.data
}

const addAnecdote = async (anecdoteText) => {
    console.log('anecdote: ', anecdoteText)
    const response = await axios.post(url, { content: anecdoteText, votes: 0 })
    return response.data
}

const voteForAnecdote = async (anecdote) => {
    anecdote.votes = anecdote.votes+1
    console.log('voteForAnecdote anecdote: ', anecdote)
    const response = await axios.put(`${url}/${anecdote.id}`, anecdote)
    console.log('response:', response)
    return response.data
}

export default { getAll, addAnecdote, voteForAnecdote }