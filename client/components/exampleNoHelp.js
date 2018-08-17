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

class ExampleNoHelpNoHelp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      questionText: '',
      question: '',
      answers: '',
      questionid: 0
    }
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
      question: root.EQuestion,
      answers: root.EQuestions,
      loaded: true,
      questionid: questionId
    })
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
    let rightAnswer
    if (this.state.loaded) {
      rightAnswer = this.state.answers.filter(el => el.correct)[0].answerText
    }
    let pathnameArr = this.props.location.pathname.split('/')
    const link = `/${pathnameArr[1]}/${pathnameArr[2]}/${pathnameArr[3]}/${
      pathnameArr[4]
    }`
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
                  {rightAnswer ? rightAnswer : null}
                </Button.Content>
              </Button>
              <br />
              <br />
              <Container textAlign="center">
                <Link
                  to={this.props.history.location.pathname + '/approach'}
                  onClick={() => {
                    this.handleClick()
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

export default connect(mapStateToProps, mapDispatchToProps)(ExampleNoHelpNoHelp)
