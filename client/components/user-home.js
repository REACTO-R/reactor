import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import axios from 'axios'

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
        {this.state.topics.map((maintopic, index) => {
          return <Link to={'/'+(index+1)} key={maintopic.name} params={{index: index}}><h3>{maintopic.name}</h3></Link>
        })}
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
