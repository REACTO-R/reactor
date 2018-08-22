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
      screenTrack: null
    }
    this.roomJoined = this.roomJoined.bind(this)
    this.leaveRoom = this.leaveRoom.bind(this)
    this.detachTracks = this.detachTracks.bind(this)
    this.detachParticipantTracks = this.detachParticipantTracks.bind(this)
    this.handleShareScreenClick = this.handleShareScreenClick.bind(this)
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
    this.props.leaveTheRoom()
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

  // componentDidMount(){
  //   console.log('length', this.props.room.name)
  //   if(this.props.room.name){
  //     this.roomJoined(this.props.room)}
  // }

  componentDidUpdate(prevProps) {
    console.log('prevname', prevProps.room.name)
    console.log('newname', this.props.room.name)
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
      <Button primary={true} onClick={this.handleShareScreenClick} size="small">
        Share Screen
      </Button>
    ) : (
      <Button primary={true} onClick={this.handleShareScreenClick} size="small">
        Unshare Screen
      </Button>
    )

    return (
      <Card style={{boxShadow: 'none'}}>
        <Card.Content>
          <div className="empty">
            <div className="flex-item">
              <br />
              {joinOrLeaveRoomButton}
              <div className="rowspace" />
              {this.state.hasJoinedRoom && shareOrUnshareScreenButton}
            </div>
            <div className="flex-container">
              <div className="flex-item">
                {' '}
                <div ref="localMedia" className="videoHere" />
              </div>

              <div className="flex-item" ref="remoteMedia" id="remote-media" />
            </div>
          </div>
        </Card.Content>
      </Card>
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
