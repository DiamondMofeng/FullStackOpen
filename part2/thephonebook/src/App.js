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

    if (isPresent(newName, persons.map(p => p.name))) {
      console.log(isPresent(newName, persons.map(p => p.name)))
      window.alert(newName + " is already added to phonebook")
      setNewName('')
      return
    }
    //console.log(newName + " this name is passed")
    const newObject = {
      name: newName
    }

    setPersons(persons.concat(newObject))
    setNewName('')

  }
  const isPresent = (ele, arr) => {
    console.log("arr:", arr)
    console.log(ele)
    if (arr.indexOf(ele) !== -1) return true
    return false
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
        {persons.map(p => <p>{p.name}</p>)
        }
      </div>
    </div>
  )
}

export default App