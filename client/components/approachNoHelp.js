import React from 'react'
import {connect} from 'react-redux'
import {fetchQuestion} from '../store/questions'
import {Link} from 'react-router-dom'

import {List, Button, Header, Container, Form, TextArea, Icon} from 'semantic-ui-react'

class ApproachNoHelpNoHelp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      questionText: '',
      question: '',
      answers: ''
    }
  }

  async componentDidMount() {
    let pathnameArr = this.props.location.pathname.split('/')
    let topicId = pathnameArr[2]
    let subtopicId = pathnameArr[3]
    let questionId = pathnameArr[4]

    await this.props.getQuestion(topicId, subtopicId, questionId)
    console.log('prop', this.props)

    let root = this.props.questions.QuestionList

    this.setState({
      questionText: this.props.questions.text,
      question: root.AQuestion,
      answers: root.AQuestions,
      loaded: true
    })

   
  }

  render() {
      console.log('answers', this.state.answers)
      let rightAnswer
      if(this.state.loaded){
        rightAnswer = this.state.answers.filter(el => el.correct)[0].answerText
        console.log(rightAnswer)
      }
      
    return (
      <div>
        {this.state.loaded && (
          <div>
            <Container>
              <Header size="large">{this.state.questionText}</Header>
              <Header size="medium">{this.state.question}</Header>
              <Form >
                  <TextArea autoHeight placeholder='your answer here' />
                
              </Form>
              <Button animated fluid size='massive'>
                <Button.Content visible> Hover for answer</Button.Content>
                <Button.Content hidden> {rightAnswer ? rightAnswer : null}</Button.Content>
              </Button>
              <br/>
              <br/>
                <Container textAlign='center'>
                    <Link to={
                                this.props.history.location.pathname +
                                '/editor'
                              }
                    >
                    <Button icon labelPosition='right' color='green'> 
                     Move on 
                    <Icon name='right arrow' />
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
    questions: state.questions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getQuestion: (topicId, subtopicId, questionId) =>
      dispatch(fetchQuestion(topicId, subtopicId, questionId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApproachNoHelpNoHelp)

