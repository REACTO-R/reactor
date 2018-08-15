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
      previewTracks: null,
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
    this.leaveRoom = this.leaveRoom.bind(this)
    this.detachParticipantTracks = this.detachParticipantTracks.bind(this)
    this.detachTracks = this.detachTracks.bind(this)
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
    tracks.forEach(track => {
      console.log('track', track.track.isEnabled)
      // console.log(track.track.get())
      container.appendChild(track.track.attach())
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
      console.log('prev', previewContainer)
      this.attachParticipantTracks(room.localParticipant, previewContainer)
    }

    room.participants.forEach(participant => {
      console.log("Already in Room: '" + participant.identity + "'");
      var previewContainer = this.refs.remoteMedia;
      this.attachParticipantTracks(participant, previewContainer);
    });

    // Participant joining room
    room.on('participantConnected', participant => {
      console.log("Joining: '" + participant.identity + "'");
    });

    // Attach participant’s tracks to DOM when they add a track
    room.on('trackAdded', (track, participant) => {
      console.log(participant.identity + ' added track: ' + track.kind);
      var previewContainer = this.refs.remoteMedia;
      this.attachTracks([track], previewContainer);
    });

    // Detach participant’s track from DOM when they remove a track.
    room.on('trackRemoved', (track, participant) => {
      this.log(participant.identity + ' removed track: ' + track.kind);
      this.detachTracks([track]);
    });

    // Detach all participant’s track when they leave a room.
    room.on('participantDisconnected', participant => {
      console.log("Participant '" + participant.identity + "' left the room");
      this.detachParticipantTracks(participant);
    });

    // Once the local participant leaves the room, detach the Tracks
    // of all other participants, including that of the LocalParticipant.
    room.on('disconnected', () => {
      if (this.state.previewTracks) {
        this.state.previewTracks.forEach(track => {
          track.stop();
        });
      }
      this.detachParticipantTracks(room.localParticipant);
      room.participants.forEach(this.detachParticipantTracks);
      this.setState({ hasJoinedRoom: false, localMediaAvailable: false, activeRoom: null });
    });

  }

  leaveRoom(){
    this.state.activeRoom.disconnect()
    this.setState({hasJoinedRoom: false, localMediaAvailable: false})
  }

  detachTracks(tracks) {
    tracks.forEach(track => {
      track.track.detach().forEach(detachedElement => {
        detachedElement.remove()
      })
    })
  }

  detachParticipantTracks(participant){
    let tracks = Array.from(participant.tracks.values())
    this.detachTracks(tracks)
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
        onClick={this.leaveRoom}
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
