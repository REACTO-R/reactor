import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Input, Menu} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (
  <Menu secondary>
    <Menu.Item name="REACTO" />

    {isLoggedIn ? (
      <Menu.Menu position="right">
        <Menu.Item>
          <Link to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/video">VideoChat</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/profile">My Profile</Link>
        </Menu.Item>
        <Menu.Item>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </Menu.Item>
      </Menu.Menu>
    ) : (
      <Menu.Menu position="right">
        <Menu.Item>
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/video">VideoChat</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/signup">Sign Up</Link>
        </Menu.Item>
      </Menu.Menu>
    )}
  </Menu>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
