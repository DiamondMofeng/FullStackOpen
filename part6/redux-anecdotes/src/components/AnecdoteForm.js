import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { removeNotification, setNotification } from "../reducers/notificationReducer"
import { createAnecdote } from "../services/anecdotesService"

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''

    const newContent = await createAnecdote(content)

    dispatch(addAnecdote(newContent))
    dispatch(setNotification(`you added '${newContent}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name="content" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )

}

export default AnecdoteForm