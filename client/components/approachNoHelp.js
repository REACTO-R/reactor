import React from 'react'
import {connect} from 'react-redux'
import {fetchQuestion} from '../store/questions'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {
  Button,
  Header,
  Container,
  Form,
  TextArea,
  Icon,
  Step
} from 'semantic-ui-react'

class ApproachNoHelpNoHelp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      questionText: '',
      question: '',
      answers: '',
      questionid: 0
    }

    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    let pathnameArr = this.props.location.pathname.split('/')
    let topicId = pathnameArr[2]
    let subtopicId = pathnameArr[3]
    let questionId = pathnameArr[4]

    await this.props.getQuestion(topicId, subtopicId, questionId)

    let root = this.props.questions.QuestionList

    this.setState({
      questionText: this.props.questions.text,
      question: root.AQuestion,
      answers: root.AQuestions,
      loaded: true,
      questionid: questionId
    })
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
    let rightAnswer
    if (this.state.loaded) {
      rightAnswer = this.state.answers.filter(el => el.correct)[0]
    }
    let pathnameArr = this.props.location.pathname.split('/')
    const link = `/${pathnameArr[1]}/${pathnameArr[2]}/${pathnameArr[3]}/${
      pathnameArr[4]
    }`

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
            <br />
            <Container>
              <Header size="large">{this.state.questionText}</Header>
              <Header size="medium">{this.state.question}</Header>
              <Form>
                <TextArea autoHeight placeholder="your answer here" />
              </Form>
              <Button animated fluid size="massive">
                <Button.Content visible> Hover for answer</Button.Content>
                <Button.Content hidden>
                  {' '}
                  {rightAnswer ? rightAnswer.answerText : null}
                </Button.Content>
              </Button>
              <br />
              <br />
              <Container textAlign="center">
                <Link
                  to={this.props.history.location.pathname + '/editor'}
                  onClick={() => {
                    this.handleClick(rightAnswer.id)
                  }}
                >
                  <Button icon labelPosition="right" color="green">
                    Move on
                    <Icon name="right arrow" />
                  </Button>
                </Link>
              </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(
  ApproachNoHelpNoHelp
)
