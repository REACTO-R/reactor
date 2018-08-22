import React from 'react'
import {connect} from 'react-redux'
import Video from 'twilio-video'
import axios from 'axios'
import {getRoomName, getRoom} from '../store/video'
import {Button, Popup, TextArea} from 'semantic-ui-react'

class PopUp extends React.Component {
  constructor() {
    super()
    this.state = {
      identity: '',
      token: '',
      roomNameErr: false
    }
    this.joinRoom = this.joinRoom.bind(this)
    this.handleRoomNameChange = this.handleRoomNameChange.bind(this)
  }

  async componentDidMount() {
    try {
      const {data} = await axios.get('/api/video')
      const {identity, token} = data
      this.setState({identity, token})
    } catch (err) {
      console.log('cannot get data from server', err)
    }
  }

  handleRoomNameChange(e) {
    let roomName = e.target.value
    this.props.sendRoomToStore(roomName)
  }

  async joinRoom() {
    if (!this.props.roomName.trim()) {
      this.setState({roomNameErr: true})
      return
    }

    console.log("Joining room '" + this.props.roomName + "'...")
    let connectOptions = {
      name: this.props.roomName
    }

    try {
      const room = await Video.connect(this.state.token, connectOptions)
      this.props.sendRoomObjToStore(room)
    } catch (error) {
      alert('Could not connect to Twilio: ' + error.message)
    }
  }

  render() {
    return (
      <Popup
        trigger={
          <div
            basic="true"
            color="blue"
            id="noBorder"
            className="borderNone"
            style={{borderStyle: 'none', hover: 'cursor: pointer'}}
          >
            VideoChat
          </div>
        }
        content={
          <div>
            <TextArea
              autoHeight
              placeholder="Enter Room Name"
              onChange={this.handleRoomNameChange}
            />
            <Button
              primary={true}
              content="Join Room"
              onClick={this.joinRoom}
            />
          </div>
        }
        on="click"
        position="bottom center"
      />
    )
  }
}
/**
 * CONTAINER
 */

const mapStateToProps = state => {
  const {roomName} = state.video

  return {
    roomName: roomName
  }
}

const mapDispatchToProps = dispatch => ({
  sendRoomToStore: room => dispatch(getRoomName(room)),
  sendRoomObjToStore: room => dispatch(getRoom(room))
})

export default connect(mapStateToProps, mapDispatchToProps)(PopUp)
