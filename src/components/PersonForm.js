import React from 'react'
import PropTypes from 'prop-types'

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <>
      <h2>Add a New Person</h2>
      <form onSubmit={addPerson}>
        Name:
        <div>
          <input
            className="form-input"
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        Number:
        <div>
          <input
            className="form-input"
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">Add Person</button>
        </div>
      </form>
    </>
  )
}

PersonForm.propTypes = {
  addPerson: PropTypes.func,
  newName: PropTypes.string,
  handleNameChange: PropTypes.func,
  newNumber: PropTypes.number,
  handleNumberChange: PropTypes.func,
}

export default PersonForm
