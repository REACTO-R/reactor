import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'
import {Button} from 'semantic-ui-react'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor() {
    super()
    this.state = {
      topics: []
    }
  }

  async componentDidMount() {
    let topics = await axios.get('/api/questions')
    this.setState({
      topics: topics.data
    })
  }

  render() {
    while (this.state.topics === []) {
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      )
    }
    return (
      <div>
        <h1>Topics Available for Study</h1>
        <Button.Group vertical color="blue">
          {this.state.topics.map((maintopic, index) => {
            return (
              <div key={maintopic.name}>
                <Link to={'/' + (index + 1)} params={{index: index}}>
                  <Button>{maintopic.name}</Button>
                </Link>
                <br />
              </div>
            )
          })}
        </Button.Group>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
