import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className="error">{message}</div>
}

const Filter = ({ search, handleSearchChange }) => {
  return (
    <form>
      <div>
        Search People:
        <input value={search} onChange={handleSearchChange} />
      </div>
    </form>
  )
}

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
const Persons = ({ persons, search, showAll, handlePersonDelete }) => {
  const peopleToShow = showAll
    ? persons
    : persons.filter(
      (people) =>
        (people.name.toLowerCase().includes(search.toLowerCase()) ||
            people.number.toString().includes(search)) === true
    )
  return (
    <>
      {peopleToShow.map((person) => (
        <div key={person.name}>
          {person.name}: {person.number}
          <button onClick={() => handlePersonDelete(person)}>delete</button>
        </div>
      ))}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (persons.some((person) => person.name === personObject.name)) {
      const personToUpdate = persons.find(
        (person) => person.name === personObject.name
      )
      if (
        window.confirm(
          `Person ${newName}: \n already exists, replace old number with new one?`
        )
      ) {
        personService
          .update(personToUpdate.id, personObject)
          .then((response) => {
            const newPersons = [...persons]
            newPersons[persons.indexOf(personToUpdate)] = response
            setPersons(newPersons)
            setNewNumber('')
            setNewNumber('')

            setErrorMessage(`${personToUpdate.name} information updated...`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch((error) => {
            /* Handler for multi client
            alert(`${personToUpdate.name} already got deleted in the server`);
            const personsUpdated = persons.filter(
              (person) => person.id !== personToUpdate.id
            );
            setPersons(personsUpdated); */
            setErrorMessage(`${JSON.stringify(error.response.data.error)} `)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }

    personService
      .create(personObject)
      .then((response) => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setErrorMessage(`${response.name} added!`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        return
      })
      .catch((error) => {
        //because error is a response from our server, we don't need to worry about the security flaw with JSON.stringify()
        //still a security risk
        console.log(error.response.data.error)
        const err = JSON.stringify(error.response.data.error)
        setErrorMessage(`${err}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    return
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    if (search === '') {
      setShowAll(true)
      setSearch(event.target.value)
    }
    setShowAll(false)
    setSearch(event.target.value)
  }

  const handlePersonDelete = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {
      personService
        .deletePerson(person.id)
        .then((response) => {
          return response
        })
        .then(() => {
          personService.getAll().then((response) => {
            setPersons(response)
          })
        })
        .catch((err) => console.log(err))
      return
    }
    return
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter {...{ search, handleSearchChange }} />
      <h2>Add a New Person</h2>
      <PersonForm
        {...{
          addPerson,
          newName,
          handleNameChange,
          newNumber,
          handleNumberChange,
        }}
      />
      <h2>Numbers</h2>
      <Persons {...{ persons, search, showAll, handlePersonDelete }} />
    </div>
  )
}

export default App
