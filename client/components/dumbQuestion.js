import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {dispatch} from 'redux'
import {fetchQuestions} from '../store/questions'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {List, Button, Header, Container, Message} from 'semantic-ui-react'

class DumbQuestion extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  // console.log('PROPS',props)
  // let clickHandlerCounter =0;
  // console.log(props.clickHandlers)

  render() {
    for (let i = 0; i < this.props.answers; i++) {
      this.setState({[answer.id]: false})
    }
    console.log('DQ PROPS', this.props)

    return (
      <div>
        <Container>
          <Header size="large">{this.props.question}</Header>
          <List animated relaxed verticalAlign="middle">
            {this.props.answers.map(answer => {
              let show = false
              return (
                <div>
                  <List.Item key={answer.id}>
                    <List.Content>
                      <Button
                        onClick={() => {
                          this.setState({[answer.id]: true})
                        }}
                        size="large"
                        basic
                      >
                        {answer.answerText}
                      </Button>
                    </List.Content>
                  </List.Item>
                  {this.state[answer.id] && (
                    <Message visible> {answer.explanationText}</Message>
                  )}
                  <div>
                    <Link to={this.props.linkToNext}> GO NEXT </Link>
                  </div>
                </div>
              )
              clickHandlerCounter++
            })}
          </List>
        </Container>
      </div>
    )
  }
}

export default DumbQuestion
