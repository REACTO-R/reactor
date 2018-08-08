import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Subtopic = props => {
  return (
    <div>
      <h3>Subtopic</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(Subtopic)

/**
 * PROP TYPES
 */
