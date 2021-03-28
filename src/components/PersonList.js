import React from 'react'
import PropTypes from 'prop-types'

const PersonList = ({ persons, search, showAll, handlePersonDelete }) => {
  const peopleToShow = showAll
    ? persons
    : persons.filter(
      (people) =>
        (people.name.toLowerCase().includes(search.toLowerCase()) ||
            people.number.toString().includes(search)) === true,
    )
  return (
    <div>
      <h2>People</h2>
      {peopleToShow.map((person) => (
        <div className="person" key={person.name}>
          {person.name}: {person.number}
          <button onClick={() => handlePersonDelete(person)}>delete</button>
        </div>
      ))}
    </div>
  )
}

PersonList.propTypes = {
  persons: PropTypes.array,
  search: PropTypes.string,
  showAll: PropTypes.bool,
  handlePersonDelete: PropTypes.func,
}

export default PersonList
