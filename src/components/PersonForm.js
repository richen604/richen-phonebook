import React from "react";
import PropTypes from "prop-types";
import "./PersonForm.css";

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <div id="person-form-container">
      <h5>Add a New Person</h5>
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
    </div>
  );
};

PersonForm.propTypes = {
  addPerson: PropTypes.func,
  newName: PropTypes.string,
  handleNameChange: PropTypes.func,
  newNumber: PropTypes.number,
  handleNumberChange: PropTypes.func,
};

export default PersonForm;
