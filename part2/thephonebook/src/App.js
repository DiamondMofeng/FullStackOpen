import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)

  }
  const handleSubmit = (event) => {
    event.preventDefault()

    const newObject={
      name: newName
    }

    setPersons(persons.concat(newObject))
    setNewName('')

    console.log(persons)


  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          <div>debug: {newName}</div>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(p=><p>{p.name}</p>)
        }
      </div>
    </div>
  )
}

export default App