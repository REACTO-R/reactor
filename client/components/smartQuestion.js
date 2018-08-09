import React from 'react'
import {connect} from 'react-redux'
import {fetchQuestions} from '../store/questions'
import {Link} from 'react-router-dom'

import {List, Button, Header, Container, Message} from 'semantic-ui-react'
import { ENGINE_METHOD_DIGESTS } from 'constants';

class Question extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      question: '',
      answers: '',
      nextMode: 'repeat',
      linkToNext: false,
      showNext: false,
      showAnswers: []
    }
    this.changeMode = this.changeMode.bind(this)
  }

  async componentDidMount() {
    await this.props.getAllQuestions()
    let root = this.props.questions[0].SubTopics[0].Questions[0].QuestionList

    this.setState({
      question: root.RQuestion,
      answers: root.RQuestions,
      loaded: true
    })

    let newShowArr = [];
    for(let i=0; i<this.state.answers; i++){
      newShowArr.push(false)
    }
    this.setState({showAnswers: newShowArr})
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('prevProps', prevProps.match.url)
    // console.log('prevState', prevState.nextMode)
    // console.log('nextProps', this.props)
    // console.log('nextState', this.state)

    //reset show answers
    let newShowArr = this.state.showAnswers;
    for(let i=0; i<newShowArr.length; i++){
      newShowArr[i] = false;
    }
    this.setState({showAnswers: newShowArr})

    if (prevState.nextMode !== this.state.nextMode) {
      let root = this.props.questions[0].SubTopics[0].Questions[0].QuestionList
      if (this.state.nextMode === 'approach') {
        this.setState({
          question: root.AQuestion,
          answers: root.AQuestions,
          loaded: true
        })
      } else if (this.state.nextMode === 'example') {
        this.setState({
          question: root.EQuestion,
          answers: root.EQuestions,
          loaded: true
        })
      }
    } else if (prevProps.location.pathname !== this.props.location.pathname) {
      console.log('props did run')
      let root = this.props.questions[0].SubTopics[0].Questions[0].QuestionList
      const path = this.props.location.pathname
      if (path.endsWith('repeat')) {
        this.setState({
          question: root.RQuestion,
          answers: root.RQuestions,
          nextMode: 'example',
          loaded: true
        })
      } else if (path.endsWith('example')) {
        this.setState({
          question: root.EQuestion,
          answers: root.EQuestions,
          nextMode: 'approach',
          loaded: true
        })
      } else if (path.endsWith('approach')) {
        this.setState({
          question: root.AQuestion,
          answers: root.AQuestions,
          nextMode: 'editor',
          loaded: true
        })
      }
    }
  }

  changeMode() {
    if (this.state.nextMode === 'repeat') {
      this.setState({nextMode: 'example'})
    } else if (this.state.nextMode === 'example') {
      this.setState({nextMode: 'approach'})
    } else if (this.state.nextMode === 'approach') {
      this.setState({nextMode: 'editor'})
    }
    console.log('i changed mode')
  }

  render() {
  
    return (
      <div>
        {this.state.loaded && (
          <div>
            <Container>
              <Header size="large">{this.state.question}</Header>
              <List animated relaxed verticalAlign="middle">
                {this.state.answers.map(answer => {
                  this.state.showAnswers.push(false)
                  return (
                    <div key={answer.id}>
                      <List.Item>
                        <List.Content>
                          {/* ON CLICK FOR ANSWER TO SHOW MESSAGE */}
                          <Button
                            onClick={() => {
                              let newShowArr = this.state.showAnswers
                              newShowArr[answer.id-1] = true;
                              this.setState({showanswers: newShowArr})
                            }}
                            size="large"
                            basic
                          >
                            {answer.answerText}
                          </Button>
                        </List.Content>
                      </List.Item>
                      {this.state.showAnswers[answer.id-1] && (
                        <React.Fragment>
                          <Message visible> {answer.explanationText}</Message>
                          {answer.correct &&
                            this.props.history.location.pathname.slice(-10).includes(
                              'repeat'
                            ) && (
                              <Link
                                to={
                                  this.props.history.location.pathname +
                                  '/example'
                                }
                              >
                                <Button
                                  onClick={() => {
                                    this.setState({[answer.id]: false})
                                    this.changeMode()
                                  }}
                                >
                                  GO NEXT
                                </Button>
                              </Link>
                            )}
                          {answer.correct &&
                            this.props.history.location.pathname.slice(-10).includes(
                              'example'
                            ) && (
                              <Link
                                to={
                                  this.props.history.location.pathname +
                                  '/approach'
                                }
                              >
                                <Button
                                  onClick={() => {
                                    this.setState({[answer.id]: false})
                                    this.changeMode()
                                  }}
                                >
                                  GO NEXT
                                </Button>
                              </Link>
                            )}
                        </React.Fragment>
                      )}
                    </div>
                  )
                })}
              </List>
            </Container>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    questions: state.questions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllQuestions: () => dispatch(fetchQuestions())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)

// <DumbQuestion
//   question={this.state.question}
//   answers={this.state.answers}
//   clickHandlers={clickHandlerArr}
//   linkToNext={
//     this.props.history.location.pathname + this.state.linkToNext
//   }
// />
