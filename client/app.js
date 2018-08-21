import React from 'react'
import {Navbar, SideBar} from './components'
import Routes from './routes'
import {Grid, Sidebar} from 'semantic-ui-react'
import VideoComponent from './components/testVideoComponent'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

const App = props => {
  console.log('form App page', props)

  let left

  if (props.room.name) {
    left = 3
  } else {
    left = 1
  }

  let right = 16 - left

  return (
    <div>
      <Navbar />

        {props.room.name ? (
          <Grid relaxed columns={2}>
          <Grid.Row>
            <Grid.Column width={3}>
              <VideoComponent />
            </Grid.Column>
            <Grid.Column width={13}>
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
