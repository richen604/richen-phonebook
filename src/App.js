/* eslint-disable indent */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './App.css'
import RichenBadge from './components/RichenBadge.js'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'

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
        (person) => person.name === personObject.name,
      )
      if (
        window.confirm(
          `Person ${newName}: \n already exists, replace old number with new one?`,
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
    <div id="app-body">
      <div id="nav-header">
        <h2>Phonebook Application</h2>
      </div>
      <div id="content-container">
        <div id="form-container">
          <Notification id="notification" message={errorMessage} />
          <Filter id="filter" {...{ search, handleSearchChange }} />
          <PersonForm
            id="person-form"
            {...{
              addPerson,
              newName,
              handleNameChange,
              newNumber,
              handleNumberChange,
            }}
          />
          <RichenBadge />
        </div>
        <div id="person-container">
          <PersonList
            id="person-output"
            {...{ persons, search, showAll, handlePersonDelete }}
          />
        </div>
      </div>
    </div>
  )
}

export default App
