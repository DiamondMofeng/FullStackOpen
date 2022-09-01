const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

export const reducerTypes = {
  ADD_ANECDOTE: 'ADD_ANECDOTE',
  VOTE_ANECDOTE: 'VOTE_ANECDOTE'
}

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

export const voteAnecdote = (id) => {
  return {
    type: reducerTypes.VOTE_ANECDOTE,
    id
  }
}

export const addAnecdote = (content) => {
  return {
    type: reducerTypes.ADD_ANECDOTE,
    content
  }
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case reducerTypes.VOTE_ANECDOTE: {
      if (!action.id) {
        return state
      }
      let anecdote = state.find(a => a.id === action.id)
      if (!anecdote) {
        return state
      }
      return state.map(a => a.id === action.id ? { ...a, votes: a.votes + 1 } : a)
    }

    case reducerTypes.ADD_ANECDOTE: {
      if (!action.content) {
        return state
      }
      return [...state, asObject(action.content)]
    }

    default:
      return state
  }
}

export default reducer