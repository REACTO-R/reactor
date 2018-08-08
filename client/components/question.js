import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {dispatch} from 'redux'
import {fetchQuestions} from '../store/questions'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { List, Button, Header, Container, Segment, Dimmer, Loader } from 'semantic-ui-react'


class Question extends  React.Component {

    constructor(){
        super()
        this.state = {
            loaded: false
        }
    }

    async componentWillMount(){
         await this.props.getAllQuestions()
         const Rquestion = this.props.questions[0].SubTopics[0].Questions[0].QuestionList.RQuestion
         const Ranswers = this.props.questions[0].SubTopics[0].Questions[0].QuestionList.RQuestions
         console.log('RQUESTIONS',Rquestion)
         console.log('RANSWER',Ranswers)
         this.setState({loaded: true}) 
    }

    render(){
       
        
        return (
            <div>
            {this.state.loaded && 
            
            <Container>
                <Header size='large'>{this.state.loaded ? Rquestion : ""}</Header>
                {this.state.loaded ? (Ranswers.map(answer => {
                        <List animated relaxed verticalAlign='middle'>

                            <List.Item key={answer.id} size='large' >
                                <List.Content>
                                    <Button basic>{answer.answerText}</Button>
                                </List.Content>
                            </List.Item>
                        </List>
                })

                ) : ( 
                        <Segment>
                            <Dimmer active>
                                <Loader />
                            </Dimmer>
                        </Segment>

                )}
            </Container>
    }
    </div>
            
        
        )
    }
    
    
}   


const mapStateToProps = (state) => {
    return {
        questions: state.questions,
        loaded: false
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllQuestions: () => dispatch(fetchQuestions())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)