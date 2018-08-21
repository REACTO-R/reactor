import React from 'react'
import Video from 'twilio-video'
import axios from 'axios'
import {Button, Card, TextArea} from 'semantic-ui-react'
import getUserScreen from './screenShare'

class VideoComponent extends React.Component {
  constructor(props) {
    super()
    this.state = {
      identity: null,
      roomName: '',
      roomNameErr: false, // Track error for room name TextField
      previewTracks: null,
      localMediaAvailable: false,
      hasJoinedRoom: false,
      activeRoom: '', // Track the current active room
      screenTrack: null
    }
    this.joinRoom = this.joinRoom.bind(this)
    this.handleRoomNameChange = this.handleRoomNameChange.bind(this)
    this.roomJoined = this.roomJoined.bind(this)
    this.leaveRoom = this.leaveRoom.bind(this)
    this.detachTracks = this.detachTracks.bind(this)
    this.detachParticipantTracks = this.detachParticipantTracks.bind(this)
    this.handleShareScreenClick = this.handleShareScreenClick.bind(this)
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

    // Join the Room with the token from the server and the
    // LocalParticipant's Tracks.
    Video.connect(this.state.token, connectOptions).then(
      this.roomJoined,
      error => {
        alert('Could not connect to Twilio: ' + error.message)
      }
    )
  }

  attachTracks(tracks, container) {
    tracks.forEach(track => {
      console.log(track.attach())
      container.appendChild(track.attach())
    })
  }

  // Attaches a track to a specified DOM container
  attachParticipantTracks(participant, container) {
    var tracks = Array.from(participant.tracks.values())
    this.attachTracks(tracks, container)
  }

  detachTracks(tracks) {
    tracks.forEach(track => {
      track.detach().forEach(detachedElement => {
        detachedElement.remove()
      })
    })
  }

  detachParticipantTracks(participant) {
    var tracks = Array.from(participant.tracks.values())
    this.detachTracks(tracks)
  }

  roomJoined(room) {
    // Called when a participant joins a room
    console.log('room in roomJoined', room)
    console.log("Joined as '" + this.state.identity + "'")
    this.setState({
      activeRoom: room,
      localMediaAvailable: true,
      hasJoinedRoom: true
    })

    // Attach LocalParticipant's Tracks, if not already attached.
    var previewContainer = this.refs.localMedia
    if (!previewContainer.querySelector('video')) {
      this.attachParticipantTracks(room.localParticipant, previewContainer)
    }

    // Attach the Tracks of the Room's Participants.
    room.participants.forEach(participant => {
      console.log("Already in Room: '" + participant.identity + "'")
      var previewContainer = this.refs.remoteMedia
      this.attachParticipantTracks(participant, previewContainer)
    })

    // When a Participant joins the Room, log the event.
    room.on('participantConnected', participant => {
      console.log("Joining: '" + participant.identity + "'")
    })

    // When a Participant adds a Track, attach it to the DOM.
    room.on('trackAdded', (track, participant) => {
      console.log(participant.identity + ' added track: ' + track.kind)
      var previewContainer = this.refs.remoteMedia
      this.attachTracks([track], previewContainer)
    })

    // When a Participant removes a Track, detach it from the DOM.
    room.on('trackRemoved', (track, participant) => {
      this.log(participant.identity + ' removed track: ' + track.kind)
      this.detachTracks([track])
    })

    // When a Participant leaves the Room, detach its Tracks.
    room.on('participantDisconnected', participant => {
      console.log("Participant '" + participant.identity + "' left the room")
      this.detachParticipantTracks(participant)
    })

    // Once the LocalParticipant leaves the room, detach the Tracks
    // of all Participants, including that of the LocalParticipant.
    room.on('disconnected', () => {
      // if (this.state.previewTracks) {
      //   this.state.previewTracks.forEach(track => {
      //     track.stop()
      //   })
      // }
      this.detachParticipantTracks(room.localParticipant)
      room.participants.forEach(this.detachParticipantTracks)
      this.setState({
        activeRoom: null,
        hasJoinedRoom: false,
        localMediaAvailable: false
      })
    })
  }

  leaveRoom() {
    this.state.activeRoom.disconnect()
    this.setState({hasJoinedRoom: false, localMediaAvailable: false})
  }

  async handleShareScreenClick() {
    if (!this.state.screenTrack) {
      const stream = await getUserScreen()
      this.setState({screenTrack: stream.getVideoTracks()[0]})
      this.state.activeRoom.localParticipant.addTrack(this.state.screenTrack)
    } else {
      this.state.activeRoom.localParticipant.removeTrack(this.state.screenTrack)
      this.setState({screenTrack: null})
    }
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
      <Button primary={true} onClick={this.leaveRoom}>
        Leave Room
      </Button>
    ) : (
      <Button primary={true} onClick={this.joinRoom}>
        Join Room
      </Button>
    )

    let shareOrUnshareScreenButton = !this.state.screenTrack ? (
      <Button primary={true} onClick={this.handleShareScreenClick}>
        Share Screen
      </Button>
    ) : (
      <Button primary={true} onClick={this.handleShareScreenClick}>
        Unshare Screen
      </Button>
    )

    return (
      <Card style={{boxShadow: 'none'}}>
        <Card.Content>
          <div className="empty">
            <div className="flex-item">
              <TextArea
                autoHeight
                placeholder="Enter Room Name"
                onChange={this.handleRoomNameChange}
                // errorText={this.state.roomNameErr ? 'Room Name is required' : undefined}
              />
              <br />
              {joinOrLeaveRoomButton}
              <div className="rowspace" />
              {this.state.hasJoinedRoom && shareOrUnshareScreenButton}
            </div>
            <div className="flex-container">
              {showLocalTrack}

              <div className="flex-item" ref="remoteMedia" id="remote-media" />
            </div>
          </div>
        </Card.Content>
      </Card>
    )
  }
}

export default VideoComponent
