import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, Topic, Subtopic, Problem, Repeat, Editor, Example, Approach} from './components'
import {me} from './store'
import {Container} from 'semantic-ui-react'


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Container>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/:topic/:subtopic/:question/repeat" component={Repeat} />
          <Route exact path="/:topic/:subtopic/:question/repeat/example" component={Example} />
          <Route exact path="/:topic/:subtopic/:question/repeat/example/approach" component={Approach} />



          <Route path='/editor' component={Editor} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route exact path="/:topic" component={Topic} />
              <Route exact path="/:topic/:subtopic" component={Subtopic} />
              <Route
                exact
                path="/:topic/:subtopic/:problem"
                component={Problem}
              />
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          <Route component={Login} />
        </Switch>
      </Container>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
