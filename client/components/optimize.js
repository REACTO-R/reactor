import React from 'react'
import {connect} from 'react-redux'
import {fetchQuestions} from '../store/questions'
import {Link} from 'react-router-dom'
import {List, Button, Header, Container, Message} from 'semantic-ui-react'

class Optimize extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
      <div>
        {this.state.loaded && (
          <div>
            <Container>
              Whelp.
            </Container>
          </div>
        )}
      </div>
    )
	}
}

export default Optimize

//Main thing is figuring out how to store the approach the user took when they selected their approach.
//One way is storing it in the store, but problems happen when the user refreshes the page.
//The other way is storing it in the URL, which would be a pain and basically mean a unique page for each URL.
