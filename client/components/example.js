import React from 'react'
import {connect} from 'react-redux'
import {fetchQuestion} from '../store/questions'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {
  List,
  Button,
  Header,
  Container,
  Message,
  Icon,
  Step
} from 'semantic-ui-react'

class Example extends React.Component {
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
      question: root.EQuestion,
      answers: root.EQuestions,
      loaded: true,
      questionid: this.props.questions.id
    })

    let newShowArr = []
    for (let i = 0; i < this.state.answers; i++) {
      newShowArr.push(false)
    }
    this.setState({showAnswers: newShowArr})
  }

  async handleClick() {
    try {
      await axios.put(
        '/api/users/' + this.props.userId + '/' + this.state.questionid,
        {
          propUpdate: 'EQuestion'
        }
      )
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    let pathnameArr = this.props.location.pathname.split('/')
    const link = `/${pathnameArr[1]}/${pathnameArr[1]}/${pathnameArr[1]}`
    const steps = [
      {
        key: 'R',
        title: 'R',
        description: 'Repeat',
        active: true,
        href: link + '/repeat'
      },
      {
        key: 'E',
        title: 'E',
        description: 'Example',
        active: true,
        href: link + '/repeat/example'
      },
      {
        key: 'A',
        title: 'A',
        description: 'Approach',
        disabled: true
      },
      {
        key: 'CT',
        title: 'CT',
        description: 'Code+Test',
        disabled: true
      },
      {
        key: 'O',
        title: 'O',
        description: 'Optimize',
        disabled: true
      }
    ]
    return (
      <div>
        <Step.Group
          items={steps}
          widths={8}
          size="tiny"
          style={{
            width: '60%',
            display: 'flex',
            margin: 'auto',
            height: '42px'
          }}
        />
        {this.state.loaded && (
          <div>
            <Container>
              <br />
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
                            style={{textAlign: 'left'}}
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
                                this.props.history.location.pathname +
                                '/approach'
                              }
                              onClick={() => {
                                this.handleClick()
                              }}
                            >
                              <Button color="green" style={{margin: '10px'}}>
                                GO NEXT <Icon name="right arrow" />
                              </Button>
                            </Link>
                          )}
                        </React.Fragment>
                      )}
                      <br />
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

export default connect(mapStateToProps, mapDispatchToProps)(Example)

// <DumbQuestion
//   question={this.state.question}
//   answers={this.state.answers}
//   clickHandlers={clickHandlerArr}
//   linkToNext={
//     this.props.history.location.pathname + this.state.linkToNext
//   }
// />
