import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotesService"
import { setNotification } from "./notificationReducer"

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// const initialState = anecdotesAtStart.map(asObject)

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {

    _voteAnecdote: (state, action) => {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      if (!anecdote) {
        return
      }
      anecdote.votes += 1

      setNotification(`you voted '${anecdote.content}'`)
    },

    addAnecdote: (state, action) => {
      const content = action.payload
      const newAnecdote = asObject(content)
      state.push(newAnecdote)
      setNotification(`you have added a new anecdote '${content}'`)
    },

    setAnecdotes: (state, action) => {
      return action.payload
    },

  }
})


export const { _voteAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions

//* Below are async reducers

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const id = anecdote.id
    await anecdoteService.vote(anecdote)
    dispatch(_voteAnecdote(id))
  }
}



export default anecdoteSlice.reducer