const express = require('express')
var morgan = require('morgan')
const app = express()

app.use(express.json())

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :body'))

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
];

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons);
})

app.get('/info', (request, response) => {
  let message = `Phonebook has info for ${persons.length} people`
  let date = new Date();
  response.send(`<p>${message}</p>` + `<p>${date}</p>`)
})

app.get('/api/persons/:id', (request,response) => {
  let id = Number(request.params.id);
  let person = persons.find(person => person.id === id);
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end();
  }
})

app.delete('/api/persons/:id', (request, response) => {
  let id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const generateId = () => {
  return Math.floor(Math.random() * 100000);
}

const nameExists = (name) => {
  return persons.find(person => person.name === name)
}

app.post('/api/persons', (request, response) => {
  let body = request.body;
  
  if (!body.name || !body.number) {
    return response.json({
      "error": "missing either name or number",
    })
  } else if (nameExists(body.name)){
    return response.json({
      "error": "that name already exists",
    })
  }
  
  let newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }
  persons = persons.concat(newPerson);
  
  response.json(newPerson);
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})