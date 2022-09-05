import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { getAnecdotes } from './services/anecdotesService'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    getAnecdotes()
      .then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])


  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )

}

export default App