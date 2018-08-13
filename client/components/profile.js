import React from 'react'
import {connect} from 'react-redux'
import {authPut} from '../store'
import {List, Button, Form, Header} from 'semantic-ui-react'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: this.props.user.email
      // password: this.props.user.password
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    console.log(this.state)
    return (
      <List>
        <List.Item>
          <Header size="medium">Profile:</Header>
        </List.Item>
        <List.Item>
          <Form onSubmit={this.props.handleSubmit}>
            <Form.Field>
              <label>Email:</label>
              <input
                placeholder={this.props.user.email}
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <label>Password:</label>
              <input placeholder="******" />
            </Form.Field>
            <br />
            <Button type="submit">Update Profile</Button>
          </Form>
        </List.Item>
        <List.Item />
        <List.Item>
          <Header size="medium">Progress:</Header>
        </List.Item>
        <List.Item>Topics:</List.Item>
      </List>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value
      // const password = evt.target.password.value
      dispatch(authPut(email))
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(Profile)
