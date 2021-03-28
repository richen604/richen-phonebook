import React from "react";
import PropTypes from "prop-types";
import "./PersonList.css";
import { Button } from "reactstrap";

const PersonList = ({ persons, search, showAll, handlePersonDelete }) => {
  const peopleToShow = showAll
    ? persons
    : persons.filter(
        (people) =>
          (people.name.toLowerCase().includes(search.toLowerCase()) ||
            people.number.toString().includes(search)) === true
      );
  return (
    <div id="person-container">
      <h4>People</h4>
      {peopleToShow.map((person) => (
        <div className="person" key={person.name}>
          {person.name}: {person.number}
          <Button
            className="personlist-button"
            onClick={() => handlePersonDelete(person)}
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
};

PersonList.propTypes = {
  persons: PropTypes.array,
  search: PropTypes.string,
  showAll: PropTypes.bool,
  handlePersonDelete: PropTypes.func,
};

export default PersonList;
