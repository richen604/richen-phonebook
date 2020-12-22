require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const path = require('path')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')))

morgan.token('json', (req) => {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :json - :response-time ms'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => {
      next(error)
    })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  const date = new Date(Date.now())
  Person.find({}).then((persons) => {
    response.send(
      `<div>Phonebook info has ${
        persons.length
      } people</div> \n <div>${date.toString()}</div>`
    )
  })
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.post('/api/persons', async (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((SavedFormattedPerson) => {
      response.json(SavedFormattedPerson)
    })
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    id: request.params.id,
    name: String(body.name),
    number: String(body.number),
  }

  Person.findByIdAndUpdate(person.id, person, {
    new: true,
    runValidators: true,
  })
    .then((updatedPerson) => {
      console.log()
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
