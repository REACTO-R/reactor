import React from 'react'
import Video from 'twilio-video'
import axios from 'axios'
import {Button, Card, TextArea} from 'semantic-ui-react'
import getUserScreen from './screenShare'
import {leaveRoom} from '../store/video'
import {connect} from 'react-redux'

class VideoComponent extends React.Component {
  constructor(props) {
    super()
    this.state = {
      identity: null,
      localMediaAvailable: false,
      hasJoinedRoom: false,
      activeRoom: '', // Track the current active room
      screenTrack: null,
      tracksOn: 0,
      screenShare: 'none'
    }
    this.roomJoined = this.roomJoined.bind(this)
    this.leaveRoom = this.leaveRoom.bind(this)
    this.detachTracks = this.detachTracks.bind(this)
    this.detachParticipantTracks = this.detachParticipantTracks.bind(this)
    this.handleShareScreenClick = this.handleShareScreenClick.bind(this)
    this.handleFullScreenClick = this.handleFullScreenClick.bind(this)
  }

  handleFullScreenClick(ref) {
    console.log(this.refs.screenshare)
    if (this.refs.screenshare.requestFullscreen) {
      this.refs.screenshare.requestFullscreen()
    } else if (this.refs.screenshare.mozRequestFullScreen) {
      this.refs.screenshare.mozRequestFullScreen()
    } else if (this.refs.screenshare.webkitRequestFullscreen) {
      this.refs.screenshare.webkitRequestFullscreen()
    }
  }

  attachTracks(tracks, container) {
    tracks.forEach(track => {
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
    console.log('ref', this.refs)
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
      // console.log('trackadded event', track.mediaStreamTrack)
      this.setState({tracksOn: this.state.tracksOn + 1})
      if (this.state.tracksOn >= 3) {
        var previewContainer = this.refs.screenshare
      } else {
        var previewContainer = this.refs.remoteMedia
      }
      this.attachTracks([track], previewContainer)
    })

    // When a Participant removes a Track, detach it from the DOM.
    room.on('trackRemoved', (track, participant) => {
      this.log(participant.identity + ' removed track: ' + track.kind)
      this.detachTracks([track])
      this.setState({tracksOn: this.state.tracksOn - 1})
    })

    // When a Participant leaves the Room, detach its Tracks.
    room.on('participantDisconnected', participant => {
      console.log("Participant '" + participant.identity + "' left the room")
      this.detachParticipantTracks(participant)
      this.setState({tracksOn: 0})
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
    this.props.leaveTheRoom()
  }

  async handleShareScreenClick() {
    if (!this.state.screenTrack) {
      const stream = await getUserScreen()
      const track = stream.getVideoTracks()[0]
      track.screenshare = true
      this.setState({screenTrack: track, screenShare: 'initial'})
      this.state.activeRoom.localParticipant.addTrack(this.state.screenTrack)
      console.log('addtrack', this.state.activeRoom.localParticipant.addTrack)
    } else {
      this.state.activeRoom.localParticipant.removeTrack(this.state.screenTrack)
      this.setState({screenTrack: null})
    }
  }

  componentDidMount() {
    this.roomJoined(this.props.room)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.room !== this.props.room) {
      this.roomJoined(this.props.room)
    }
  }

  render() {
    let joinOrLeaveRoomButton = this.state.hasJoinedRoom ? (
      <Button primary={true} onClick={this.leaveRoom} size="tiny">
        Leave Room
      </Button>
    ) : (
      ''
    )

    let shareOrUnshareScreenButton = !this.state.screenTrack ? (
      <Button primary={true} onClick={this.handleShareScreenClick} size="tiny">
        Share Screen
      </Button>
    ) : (
      <Button primary={true} onClick={this.handleShareScreenClick} size="tiny">
        Unshare Screen
      </Button>
    )

    return (
      <div id="videoCard">
        <div className="flex-item">
          {joinOrLeaveRoomButton}
          <div className="rowspace" />
          {this.state.hasJoinedRoom && shareOrUnshareScreenButton}
        </div>
        <div className="flex-container">
          <div className="flex-item">
            <div ref="localMedia" className="videoHere" id="local-media" />
          </div>
          <div className="flex-item" ref="remoteMedia" id="remote-media" />
          <div
            className="flex-item"
            ref="screenshare"
            id="screenshare"
            style={{width: '100%', height: '100%'}}
          />
          {this.state.tracksOn >= 3 ? (
            <Button
              primary={true}
              ref="test"
              size="tiny"
              onClick={this.handleFullScreenClick}
              style={{
                width: '170px',
                margin: 'auto'
              }}
            >
              ScreenShare Fullscreen
            </Button>
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {room} = state.video
  return {
    room
  }
}

const mapDispatchToProps = dispatch => {
  return {
    leaveTheRoom: () => dispatch(leaveRoom())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoComponent)
