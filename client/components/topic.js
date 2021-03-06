import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {Button} from 'semantic-ui-react'

/**
 * COMPONENT
 */
export class Topic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topics: [],
      topicId: Number(this.props.match.params.topic)
    }
  }

  async componentDidMount() {
    let topics = await axios.get('/api/questions')
    this.setState({
      topics: topics.data
    })
  }

  render() {
    if (this.state.topics[this.state.topicId - 1] === undefined) {
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      )
    } else {
      return (
        <div>
          <h1>
            Subtopics to study for{' '}
            {this.state.topics[this.state.topicId - 1].name}
          </h1>
          <Button.Group vertical color="blue" size="massive">
            {this.state.topics[this.state.topicId - 1].SubTopics.map(
              (subtopic, index) => {
                return (
                  <div key={subtopic.name}>
                    <Link
                      to={'/' + this.state.topicId + '/' + (index + 1)}
                      params={{index: index}}
                    >
                      <Button>{subtopic.name}</Button>
                    </Link>
                    <br />
                  </div>
                )
              }
            )}
          </Button.Group>
        </div>
      )
    }
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

export default connect(mapState)(Topic)

/**
 * PROP TYPES
 */
