import React from 'react'
import {connect} from 'react-redux'
import {fetchQuestions} from '../store/questions'
import {Link} from 'react-router-dom'

import {List, Button, Header, Container, Message} from 'semantic-ui-react'


class Approach extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      question: '',
      answers: '',
      showNext: false,
      showAnswers: []
    }
  }

  async componentDidMount() {
    await this.props.getAllQuestions()
    let root = this.props.questions[0].SubTopics[0].Questions[0].QuestionList

    this.setState({
      question: root.AQuestion,
      answers: root.AQuestions,
      loaded: true
    })

    let newShowArr = [];
    for(let i=0; i<this.state.answers; i++){
      newShowArr.push(false)
    }
    this.setState({showAnswers: newShowArr})
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
                              if(newShowArr[answer.id-1]){
                                newShowArr[answer.id-1] = false ;
                              } else{
                                newShowArr[answer.id-1] = true;
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
                      {this.state.showAnswers[answer.id-1] && (
                        <React.Fragment>
                          <Message visible> {answer.explanationText}</Message>
                          {answer.correct
                             && (
                              <Link
                                to={
                                  this.props.history.location.pathname +
                                  '/editor'
                                }
                              >
                                <Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Approach)

// <DumbQuestion
//   question={this.state.question}
//   answers={this.state.answers}
//   clickHandlers={clickHandlerArr}
//   linkToNext={
//     this.props.history.location.pathname + this.state.linkToNext
//   }
// />
