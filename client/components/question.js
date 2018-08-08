import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { List, Button, Header, Container } from 'semantic-ui-react'


export default class Question extends  React.Component {

    constructor(){
        super()
    }

    render(){
        return (
            <Container>
                <Header size='large'>Large Header</Header>
                <List animated relaxed verticalAlign='middle'>
                    <List.Item size='large'>
                        <List.Content>
                            <Button basic>5</Button>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Content>
                            <Button basic>ANSWER DFDSKJHFDSLKJFDSKJHFDSKFKDS</Button>
                        </List.Content>
                    </List.Item>
                </List>
            </Container>

        )
    }
}

