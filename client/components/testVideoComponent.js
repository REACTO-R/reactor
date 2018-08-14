import React from 'react'
import Video from 'twilio-video'
import axios from 'axios'
import {Button, Card, TextArea} from 'semantic-ui-react'

class VideoComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      identity: null,
      roomName: '',
      roomNameErr: false,
      previousTracks: null,
      localMediaAvailable: false,
      hasJoinedRoom: false,
      activeRoom: null,
      token: ''
    }
    this.handleRoomNameChange = this.handleRoomNameChange.bind(this)
    this.joinRoom = this.joinRoom.bind(this)
    this.roomJoined = this.roomJoined.bind(this)
    this.attachParticipantTracks = this.attachParticipantTracks.bind(this)
    this.attachTracks = this.attachTracks.bind(this)
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/video')
    const {identity, token} = data
    this.setState({identity, token})
  }

  handleRoomNameChange(e) {
    let roomName = e.target.value
    this.setState({roomName})
  }
  joinRoom() {
    if (!this.state.roomName.trim()) {
      this.setState({roomNameErr: true})
      return
    }
    console.log("Joining room '" + this.state.roomName + "'...")
    let connectOptions = {
      name: this.state.roomName
    }
    if (this.state.previewTracks) {
      connectOptions.tracks = this.state.previewTracks
    }
    Video.connect(this.state.token, connectOptions).then(
      this.roomJoined,
      error => {
        alert('Could not connect to Twilio: ' + error.message)
      }
    )
  }

  attachTracks(tracks, container) {
    console.log(tracks)
    tracks.forEach(track => {
      container.appendChild(track.attach())
    })
  }

  attachParticipantTracks(participant, container) {
    var tracks = Array.from(participant.tracks.values())
    this.attachTracks(tracks, container)
  }

  roomJoined(room) {
    // Called when a participant joins a room
    console.log("Joined as '" + this.state.identity + "'")
    this.setState({
      activeRoom: room,
      localMediaAvailable: true,
      hasJoinedRoom: true // Removes ‘Join Room’ button and shows ‘Leave Room’
    })

    let previewContainer = this.refs.localMedia
    if (!previewContainer.querySelector('video')) {
      this.attachParticipantTracks(room.localParticipant, previewContainer)
    }
  }

  render() {
    let showLocalTrack = this.state.localMediaAvailable ? (
      <div className="flex-item">
        {' '}
        <div ref="localMedia" />
      </div>
    ) : (
      ''
    )

    let joinOrLeaveRoomButton = this.state.hasJoinedRoom ? (
      <Button
        label="Leave Room"
        secondary={true}
        onClick={() => alert('Leave Room')}
      />
    ) : (
      <Button label="Join Room" primary={true} onClick={this.joinRoom} />
    )

    return (
      <Card>
        <Card.Content>
          <div className="flex-container">
            {showLocalTrack}
            <div className="flex-item">
              <TextArea
                placeholder="Room Name"
                onChange={this.handleRoomNameChange}
              />
              <br />
              {joinOrLeaveRoomButton}
            </div>
            <div className="flex-item" ref="remoteMedia" id="remote-media" />
          </div>
        </Card.Content>
      </Card>
    )
  }
}

export default VideoComponent
