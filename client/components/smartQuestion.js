import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {dispatch} from 'redux'
import {fetchQuestions} from '../store/questions'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import DumbQuestion from './dumbQuestion'
import { List, Button, Header, Container, Segment, Dimmer, Loader } from 'semantic-ui-react'


class Question extends  React.Component {

    constructor(){
        super()
        this.state = {
            loaded: false,
            question: '',
            answers: ''
        }
    }

    async componentWillMount(){
         await this.props.getAllQuestions()
        
         this.setState({question: this.props.questions[0].SubTopics[0].Questions[0].QuestionList.RQuestion})
         this.setState({answers: this.props.questions[0].SubTopics[0].Questions[0].QuestionList.RQuestions})
         this.setState({loaded: true})
         
         
    }

    render(){
        let clickHandlerArr = [];
        if(this.state.loaded){
            
            this.state.answers.forEach(element => {
                clickHandlerArr.push(function());
        })
    }
       
       
        
        return (
            <div>
            {this.state.loaded &&

            <DumbQuestion question={this.state.question} answers ={this.state.answers} clickHandlers ={clickHandlerArr}/>
            }
        </div>
            
        )
           
    
}
}   


const mapStateToProps = (state) => {
    return {
        questions: state.questions,
       
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllQuestions: () => dispatch(fetchQuestions())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Question)