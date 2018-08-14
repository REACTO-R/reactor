import React from 'react'
import {connect} from 'react-redux'
import {authPut} from '../store'
import {List, Button, Form} from 'semantic-ui-react'

class UserForm extends React.Component {
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
    return (
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
        <br />
        <br />
      </List.Item>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  handleSubmit: evt => {
    evt.preventDefault()
    const email = evt.target.email.value
    // const password = evt.target.password.value
    dispatch(authPut(email))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
