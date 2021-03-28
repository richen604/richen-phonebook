import React from 'react'
import PropTypes from 'prop-types'

const Filter = ({ search, handleSearchChange }) => {
  return (
    <form>
      Search:
      <div>
        <input
          className="form-input"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
    </form>
  )
}

Filter.propTypes = {
  search: PropTypes.string,
  handleSearchChange: PropTypes.func,
}

export default Filter
