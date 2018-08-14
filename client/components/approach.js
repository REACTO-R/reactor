import React from 'react'
import {connect} from 'react-redux'
import {fetchQuestion} from '../store/questions'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {List, Button, Header, Container, Message, Icon} from 'semantic-ui-react'

class Approach extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      questionText: '',
      question: '',
      answers: '',
      showNext: false,
      showAnswers: [],
      questionid: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    let pathnameArr = this.props.location.pathname.split('/')
    let topicId = pathnameArr[1]
    let subtopicId = pathnameArr[2]
    let questionId = pathnameArr[3]

    await this.props.getQuestion(topicId, subtopicId, questionId)

    let root = this.props.questions.QuestionList

    this.setState({
      questionText: this.props.questions.text,
      question: root.AQuestion,
      answers: root.AQuestions,
      loaded: true,
      questionid: this.props.questions.id
    })

    let newShowArr = []
    for (let i = 0; i < this.state.answers; i++) {
      newShowArr.push(false)
    }
    this.setState({showAnswers: newShowArr})
  }

  async handleClick(answerId) {
    try {
      await axios.put(
        '/api/users/' + this.props.userId + '/' + this.state.questionid,
        {
          propUpdate: 'AQuestion',
          AQuestionApproach: answerId
        }
      )
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        {this.state.loaded && (
          <div>
            <Container>
              <Header size="large">{this.state.questionText}</Header>
              <Header size="medium">{this.state.question}</Header>
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
                              if (newShowArr[answer.id - 1]) {
                                newShowArr[answer.id - 1] = false
                              } else {
                                newShowArr[answer.id - 1] = true
                              }

                              this.setState({showanswers: newShowArr})
                            }}
                            size="large"
                            basic
                          >
                            {answer.answerText}
                          </Button>
                        </List.Content>
                      </List.Item>
                      {this.state.showAnswers[answer.id - 1] && (
                        <React.Fragment>
                          <Message visible> {answer.explanationText}</Message>
                          {answer.correct && (
                            <Link
                              to={
                                this.props.history.location.pathname + '/editor'
                              }
                              onClick={() => {
                                this.handleClick(answer.id)
                              }}
                            >
                              <Button color="green">
                                GO NEXT <Icon name="right arrow" />
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
    questions: state.questions,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getQuestion: (topicId, subtopicId, questionId) =>
      dispatch(fetchQuestion(topicId, subtopicId, questionId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Approach)

// <DumbQuestion
//   question={this.state.question}
//   answers={this.state.answers}
//   clickHandlers={clickHandlerArr}
//   linkToNext={
//     this.props.history.location.pathname + this.state.linkToNext
//   }
// />
