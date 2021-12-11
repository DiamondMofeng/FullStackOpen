import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')
  //const [filtedPerson, setFiltedPerson] = useState([])



  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
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
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newObject))
    setNewName('')
    setNewNumber('')

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
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <form>
        <div>
          <p>name: <input value={newName} onChange={handleNameChange} /></p>
          <p>number:<input value={newNumber} onChange={handleNumberChange} /></p>
          <div>debug: {newName}</div>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

const Filter = ({ filter, setFilter }) => {

  const handelFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      Name Filter (case insensitive) <input value={filter} onChange={handelFilterChange} />
    </div>
  )
}

const Persons = ({ persons, filter }) => {

  const personsToShow = (filter === '')
    ? persons
    : persons.filter(p => p.name.toLowerCase().match(filter.toLowerCase()))

  return (
    <div>
      {personsToShow.map(p => <p key={personsToShow.indexOf(p)}>{p.name} {p.number}</p>)
      }
    </div>
  )
}

export default App