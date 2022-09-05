import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"


const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const filterValue = useSelector(state => state.filter)


  const dispatch = useDispatch()
  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
  }

  return (
    <div className="AnecdoteList">
      {
        anecdotes
          .slice()        //TODO I have to sort a copy instead of the origin array. Any Better Way?
          .filter(anecdote => anecdote.content.toLowerCase().includes(filterValue.toLowerCase()))
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )
      }
    </div>
  )

}


export default AnecdoteList