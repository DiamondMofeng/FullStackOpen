const express = require('express')
const app = express()

app.use(express.json())
app.use(express.text())


let persons = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/info', (request, response) => {
  let str = 'PhoneBook has info for ' + persons.length + ' people  '

  response.send(`<p>${str}</p><p>${Date()}</p>`)

})


app.get('/api/persons', (request, response) => {

  if (persons) {
    response.json(persons)
  }
  else {
    response.status(404).end()
  }
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  }
  else {
    response.status(404).send('There is no such person').end()
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  // get name,number   and generate an id  then save
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
  }
  if (!body.name || !body.number) {
    response.status(400).json({error:'request must have a name and number'}).end()
  }
  if (persons.find(p => p.name === body.name)) {
    response.status(400).json({error:'this name is already existed'}).end()

  }
  let person = {
    id: getRandomInt(0, 9999),
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)
  console.log(body)

  console.log(person)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {

  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})