import React from 'react'
import { Alert } from 'reactstrap'
import PropTypes from 'prop-types'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return <Alert color="danger">{message}</Alert>
}

Notification.propTypes = {
  message: PropTypes.string,
}

export default Notification
