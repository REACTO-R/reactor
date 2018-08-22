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

export class Approach extends React.Component {
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
    let pathnameArr = this.props.location.pathname.split('/')
    const link = `/${pathnameArr[1]}/${pathnameArr[2]}/${pathnameArr[3]}`

    return (
      <div>
        <Step.Group
          widths={8}
          size="tiny"
          style={{
            width: '60%',
            display: 'flex',
            margin: 'auto',
            height: '42px'
          }}
        >
          <Step active>
            <Link to={link + '/repeat'}>
              <Step.Content>
                <Step.Title>R</Step.Title>
                <Step.Description>Repeat</Step.Description>
              </Step.Content>
            </Link>
          </Step>
          <Step active>
            <Link to={link + '/repeat/example'}>
              <Step.Content>
                <Step.Title>E</Step.Title>
                <Step.Description>Example</Step.Description>
              </Step.Content>
            </Link>
          </Step>
          <Step active>
            <Link to={this.props.history.location.pathname}>
              <Step.Content>
                <Step.Title>A</Step.Title>
                <Step.Description>Approach</Step.Description>
              </Step.Content>
            </Link>
          </Step>
          <Step disabled>
            <Step.Content>
              <Step.Title>CT</Step.Title>
              <Step.Description>Code+Test</Step.Description>
            </Step.Content>
          </Step>
          <Step disabled>
            <Step.Content>
              <Step.Title>O</Step.Title>
              <Step.Description>Optimize</Step.Description>
            </Step.Content>
          </Step>
        </Step.Group>
        {this.state.loaded && (
          <div>
            <Container>
              <br />
              <Header size="large">{this.state.questionText}</Header>
              <Header size="medium">{this.state.question}</Header>
              <div
                style={{padding: '0px', fontSize: '16px', fontWeight: 'bold'}}
              >
                {this.props.questions.QuestionList.AQuestionConsideration}
              </div>
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
                                this.props.history.location.pathname + '/editor'
                              }
                              onClick={() => {
                                this.handleClick(answer.id)
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

export default connect(mapStateToProps, mapDispatchToProps)(Approach)
