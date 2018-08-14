import React from 'react'
import {connect} from 'react-redux'
import {fetchUser} from '../store'
import {fetchQuestions} from '../store/questions'
import UserForm from './userForm'
import {List, Button, Header} from 'semantic-ui-react'

class Profile extends React.Component {
  async componentDidMount() {
    let userId = this.props.user.id
    await this.props.getUserInfo(userId)
    await this.props.getTopics()
  }

  render() {
    // console.log('user', this.props.user)
    // console.log('questions', this.props.questions)
    // console.log('subtopic', this.props.questions[0])

    const topics = this.props.questions

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
                            <List horizontal key={question.id}>
                              <List.Item>Q{question.id}:</List.Item>
                              <List.Item>
                                <Button circular color="blue">
                                  R
                                </Button>
                              </List.Item>
                              <List.Item>
                                <Button circular>E</Button>
                              </List.Item>
                              <List.Item>
                                <Button circular>A</Button>
                              </List.Item>
                              <List.Item>
                                <Button circular>CT</Button>
                              </List.Item>
                              <List.Item>
                                <Button circular>O</Button>
                              </List.Item>
                            </List>
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
