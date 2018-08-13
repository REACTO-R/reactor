import React from 'react'
import {connect} from 'react-redux'
import {fetchQuestion} from '../store/questions'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {List, Button, Header, Container, Message} from 'semantic-ui-react'

class OptimizeNoHelp extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loaded: false,
			questionText: '',
			question: ''
		}
	}

	async componentDidMount() {
		let pathnameArr = this.props.location.pathname.split('/')
		let topicId = pathnameArr[1]
		let subtopicId = pathnameArr[2]
		let questionId = pathnameArr[3]

		await this.props.getQuestion(topicId, subtopicId, questionId)
		console.log('prop', this.props)

		let root = this.props.questions.QuestionList
	

		

		this.setState({
			questionText: this.props.questions.text,
			answers: root.AQuestions,
			loaded: true
		})

	}

	render() {
		return (
			<div>
				{this.state.loaded && (
					<div>
						<Container>
							<Header size="large">
								{this.state.questionText}
							</Header>
							<Header size="medium">{this.state.question}</Header>
                            {this.state.answers.map(answer => {
                                return (
                                    <div key={answer.id}>
                                    {answer.optimizationText}
                                    </div>
                                )
                                
                            })

                            }
							
						</Container>
					</div>
				)}
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    questions: state.questions,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getQuestion: (topicId, subtopicId, questionId) =>
      dispatch(fetchQuestion(topicId, subtopicId, questionId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OptimizeNoHelp)