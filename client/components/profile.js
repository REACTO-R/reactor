import React from 'react'
import {connect} from 'react-redux'
import {fetchUser} from '../store'
import {fetchQuestions} from '../store/questions'
import {Link} from 'react-router-dom'
import UserForm from './userForm'
import {List, Button, Header, Popup} from 'semantic-ui-react'

class Profile extends React.Component {
  async componentDidMount() {
    let userId = this.props.user.id
    await this.props.getUserInfo(userId)
    await this.props.getTopics()
  }

  render() {
    const topics = this.props.questions
    const startedQs = this.props.user.userQuestions
    if (startedQs) {
      var startedQsArr = startedQs.map(question => question.questionId)
      var RstartedQsArr = startedQs.map(function(question) {
        if (question.RQuestion) {
          return question.questionId
        }
      })
      var EstartedQsArr = startedQs.map(function(question) {
        if (question.EQuestion) {
          return question.questionId
        }
      })
      var AstartedQsArr = startedQs.map(function(question) {
        if (question.AQuestion) {
          return question.questionId
        }
      })
      var CTstartedQsArr = startedQs.map(function(question) {
        if (question.CTQuestion) {
          return question.questionId
        }
      })
    }
    console.log('topics', this.props)

    return (
      <List celled>
        <List.Item>
          <Header size="large">Profile:</Header>
          <UserForm user={this.props.user} />
        </List.Item>
        <List.Item>
          <Header size="large">Progress:</Header>
          <Header size="medium">Topics:</Header>
        </List.Item>
        {topics.length &&
          topics.map(topic => {
            return (
              <List.Item key={topic.id}>
                <Header size="medium">{topic.name}</Header>
                <List>
                  {topic.SubTopics.map(subtopic => {
                    return (
                      <List.Item key={subtopic.id}>
                        <List.Item>{subtopic.name}:</List.Item>
                        {subtopic.Questions.map(question => {
                          return (
                            <List.Item key={question.id}>
                              <List horizontal>
                                <List.Item>
                                  {startedQsArr.includes(question.id) ? (
                                    <Link to={`/${topic.id}/${subtopic.id}`}>
                                      <Popup
                                        trigger={
                                          <Button color="green">
                                            Q{question.id}:
                                          </Button>
                                        }
                                        content={question.text}
                                      />
                                    </Link>
                                  ) : (
                                    <Link to={`/${topic.id}/${subtopic.id}`}>
                                      <Popup
                                        trigger={
                                          <Button basic>Q{question.id}:</Button>
                                        }
                                        content={question.text}
                                      />
                                    </Link>
                                  )}
                                </List.Item>
                                <Button.Group>
                                  {RstartedQsArr.includes(question.id) ? (
                                    <Button color="blue">R</Button>
                                  ) : (
                                    <Button>R</Button>
                                  )}
                                  {EstartedQsArr.includes(question.id) ? (
                                    <Button color="blue">E</Button>
                                  ) : (
                                    <Button>E</Button>
                                  )}
                                  {AstartedQsArr.includes(question.id) ? (
                                    <Button color="blue">A</Button>
                                  ) : (
                                    <Button>A</Button>
                                  )}
                                  {CTstartedQsArr.includes(question.id) ? (
                                    <Button color="blue">CT</Button>
                                  ) : (
                                    <Button>CT</Button>
                                  )}
                                  {CTstartedQsArr.includes(question.id) ? (
                                    <Button color="blue">O</Button>
                                  ) : (
                                    <Button>O</Button>
                                  )}
                                </Button.Group>
                              </List>
                            </List.Item>
                          )
                        })}
                      </List.Item>
                    )
                  })}
                </List>
              </List.Item>
            )
          })}
      </List>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    questions: state.questions
  }
}

const mapDispatchToProps = dispatch => ({
  getUserInfo: id => dispatch(fetchUser(id)),
  getTopics: () => dispatch(fetchQuestions())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
