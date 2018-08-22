import React from 'react'
import {Navbar, SideBar} from './components'
import Routes from './routes'
import {Grid, Sidebar} from 'semantic-ui-react'
import VideoComponent from './components/testVideoComponent'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

const App = props => {
  return (
    <div>
      <Navbar />
      {props.room.name ? (
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={3} style={{margin: '0px', padding: '0px'}}>
              <VideoComponent />
            </Grid.Column>
            <Grid.Column width={13} style={{margin: '0px', padding: '0px'}}>
              <Routes />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <Routes />
      )}
    </div>
  )
}

const mapStateToProps = state => {
  const {room} = state.video
  return {
    room
  }
}

export default withRouter(connect(mapStateToProps)(App))
