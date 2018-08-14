import React from 'react'
import {connect} from 'react-redux'
import {fetchQuestion} from '../store/questions'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {List, Button, Header, Container, Message} from 'semantic-ui-react'

class Optimize extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      questionText: '',
      question: '',
      answerText: ''
    }
  }

  async componentDidMount() {
    let pathnameArr = this.props.location.pathname.split('/')
    let topicId = pathnameArr[1]
    let subtopicId = pathnameArr[2]
    let questionId = pathnameArr[3]

    await this.props.getQuestion(topicId, subtopicId, questionId)

    let questionInternalId = this.props.questions.id
    let root = this.props.questions.QuestionList
    let answers = root.AQuestions

    let {data} = await axios.get('/api/users/' + this.props.user.id)
    let userQ = data.userQuestions.find(answerObj => {
      return Number(answerObj.questionId) === Number(questionInternalId)
    })
    let chosenApproach = userQ.AQuestionApproach
    let answer = answers.find(ans => {
      return Number(ans.id) === Number(chosenApproach)
    })

    this.setState({
      questionText: this.props.questions.text,
      answers: root.AQuestions,
      loaded: true,
      answerText: answer.optimizationText
    })
  }

  render() {
    return (
      <div>
        {this.state.loaded && (
          <div>
            <Container>
              <Header size="large">{this.state.questionText}</Header>
              <Header size="medium">{this.state.question}</Header>
              <div>{this.state.answerText}</div>
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
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getQuestion: (topicId, subtopicId, questionId) =>
      dispatch(fetchQuestion(topicId, subtopicId, questionId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Optimize)
