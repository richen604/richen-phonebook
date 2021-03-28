import React from "react";
import PropTypes from "prop-types";
import "./PersonForm.css";
import { Form, FormGroup, Button, Input } from "reactstrap";

const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <div id="person-form-container">
      <h5 id="person-form-title">Add a New Person</h5>
      <Form id="person-form" onSubmit={addPerson}>
        <FormGroup>
          <Input
            className="form-input"
            value={newName}
            onChange={handleNameChange}
            placeholder="Type Name Here..."
          />
        </FormGroup>
        <FormGroup>
          <Input
            className="form-input"
            value={newNumber}
            onChange={handleNumberChange}
            placeholder="Type Number Here..."
          />
        </FormGroup>
        <Button id="person-form-button" type="submit">
          Add Person
        </Button>
      </Form>
    </div>
  );
};

PersonForm.propTypes = {
  addPerson: PropTypes.func,
  newName: PropTypes.string,
  handleNameChange: PropTypes.func,
  newNumber: PropTypes.string,
  handleNumberChange: PropTypes.func,
};

export default PersonForm;
