import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const add = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''

    dispatch(createAnecdote(content))

    dispatch(setNotification(`you added '${content}'`, 3))

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