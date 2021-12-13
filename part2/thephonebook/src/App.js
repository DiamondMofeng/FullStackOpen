import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import services from './components/services'

const App = () => {
  console.log("app is rendering")
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('normal')
  // { name: 'Arto Hellas', number: '040-123456', id: 0 },
  // { name: 'Ada Lovelace', number: '39-44-5323523', id: 1 },
  // { name: 'Dan Abramov', number: '12-43-234345', id: 2 },
  // { name: 'Mary Poppendieck', number: '39-23-6423122', id: 3 }

  useEffect(() => {
    console.log("getting data from jsServer")
    services.getAll()
      .then(data => setPersons(data))
  }, [])

  console.log('render', persons.length, 'persons')
  console.log(persons)


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} setMessageType={setMessageType} />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} setPersons={setPersons} setMessage={setMessage} setMessageType={setMessageType} />
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

const PersonForm = ({ persons, setPersons, setMessage, setMessageType }) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()



    if (isPresent(newName, persons.map(p => p.name))) {
      // console.log(persons.map(p => p.name))
      // console.log(persons.map(p => p.name).indexOf(newName))
      const personToChange = persons.find(p => p.name === newName)
      const idOfToChange = personToChange.id
      const changedPerson = { ...personToChange, number: newNumber }
      if (window.confirm(newName + " is already added to phonebook. Would you like to replace the old number?")) {
        services
          .update(idOfToChange, changedPerson)
          .then(r => {

            setPersons(persons.map(p => (p.id !== idOfToChange)
              ? p
              : changedPerson))
            setMessage(`${newName} 's number is updated`)
            setMessageType('normal')
            setTimeout(() => {
              setMessage(null)
              setMessageType('normal')
            }, 3000)
          })
          .catch(error => {
            setMessage(`Person '${newName}' was already removed from server`)
            setMessageType('error')
            setPersons(persons.filter((p => p.id !== idOfToChange)))
            setTimeout(() => {
              setMessage(null)
              setMessageType('normal')
            }, 3000)
          }
          )


        // console.log(r.data)})

        setNewName('')
        setNewNumber('')
        return
      }
      else return
    }

    const newObject = {
      name: newName,
      number: newNumber,
      //id: persons.length
    }
    services.create(newObject)
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')
        setMessage(`${newName} is added`)
        setMessageType('normal')
        setTimeout(() => {
          setMessage(null)
          setMessageType('normal')
        }, 3000)
      })


    //console.log(persons)
  }

  const isPresent = (ele, arr) => {
    // console.log("arr:", arr)
    // console.log(ele)
    if (arr.indexOf(ele) !== -1) return true
    return false
  }

  return (
    <form>
      <div>
        <p>name: <input value={newName} onChange={handleNameChange} /></p>
        <p>number:<input value={newNumber} onChange={handleNumberChange} /></p>
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>add</button>
      </div>
    </form>
  )
}
const Persons = ({ persons, filter, setPersons, setMessage, setMessageType }) => {

  const personsToShow = (filter === '')
    ? persons
    : persons.filter(p => p.name.toLowerCase().match(filter.toLowerCase()))

  return (
    <div>
      {personsToShow.map(p =>
        <p key={p.id}>
          {p.name} {p.number}
          <DeleteButton id={p.id} name={p.name} persons={persons} setPersons={setPersons} setMessage={setMessage} setMessageType={setMessageType} />
        </p>)
      }
    </div>
  )
}

const DeleteButton = ({ id, name, persons, setPersons, setMessage, setMessageType }) => {

  const handleDeleteButton = (id, name, persons, setPersons, setMessage, setMessageType) => {
    console.log(id, name)
    const handler = () => {

      if (window.confirm("Delete " + name + " ?")) {
        services
          .deletePerson(id)
          .then(() => {
            setPersons(persons.filter(p => p.id !== id))
            console.log(persons)

            setMessage(`${name} is removed`)
            setMessageType('normal')
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(() => {
            setPersons(persons.filter(p => p.id !== id))
            setMessage(`Failed to remove ${name} from server but locally. 
            It might have been removed from the server.`)
            setMessageType('error')
            setTimeout(() => {
              setMessage(null)
              setMessageType('normal')
            }, 3000)
          })

        // .then(response => console.log(response))
        //failed try
        // const toDelete = [...persons]
        // setPersons(toDelete.splice(id, 1))
        // console.log(toDelete)
        // console.log(persons)



      }
    }

    return handler
  }
  return (
    <>
      <button onClick={handleDeleteButton(id, name, persons, setPersons, setMessage, setMessageType)}>delete</button>
    </>
  )
}


const Notification = ({ message, type }) => {
  //type:normal / error
  const style_normalMsg = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const style_errorMsg = { ...style_normalMsg, color: 'red' }

  if (message) {
    if (type === 'error') {
      return (
        <div style={style_errorMsg}>
          <p>{message}</p>
        </div>
      )
    }
    else return (
      <div style={style_normalMsg}>
        <p>{message}</p>
      </div>
    )

  }
  else return null
}


export default App