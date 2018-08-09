import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {dispatch} from 'redux'
import {fetchQuestions} from '../store/questions'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { List, Button, Header, Container, Segment, Dimmer, Loader } from 'semantic-ui-react'


const  DumbQuestion = props => {
    console.log('PROPS',props)
    let clickHandlerCounter =0;
    console.log(props.clickHandlers)
    
    return (
        <div>
            
            
        <Container>
            <Header size='large'>{ props.question }</Header>
            <List animated relaxed verticalAlign='middle'>
            {props.answers.map(answer => {
                   return (
                       

                           <List.Item key={answer.id}  >
                               <List.Content>
                                   <Button onClick={() => props.clickHandlers[clickHandlerCounter]} size='large' basic>{answer.answerText}</Button>
                               </List.Content>
                           </List.Item>
                      
                   )
                   clickHandlerCounter++;
                   }
                     
                    
            )}
             </List> 
                 

        </Container>

    </div>
       
    )
}



export default DumbQuestion