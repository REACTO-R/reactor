import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export class Subtopic extends Component {
	constructor(props) {
		super(props)
		this.state = {
			topics: [],
			topicId: Number(props.match.params.topic),
			subtopicId: Number(props.match.params.subtopic)
		}
		this.handleClick = this.handleClick.bind(this)
	}

	async componentDidMount() {
		let topics = await axios.get('/api/questions')
		this.setState({
			topics: topics.data
		})
	}

	async handleClick(question) {
		let newQuestion = await axios.post('/api/users/'+this.props.userId, {
			questionId: question
		})
	}

	render() {
		if (this.state.topics[this.state.topicId - 1] === undefined) {
			return (
				<div>
					<h3>Loading...</h3>
				</div>
			)
		} else {
			let subtopicArray = this.state.topics[this.state.topicId - 1].SubTopics
			return (
				<div>
					<h1>
						Questions for subtopic{' '}
						{subtopicArray[this.state.subtopicId - 1].name}
					</h1>
					{subtopicArray[this.state.subtopicId - 1].Questions.map(
						(question, index) => {
							return (
								<Link
									to={
										'/' +
										this.state.topicId +
										'/' +
										this.state.subtopicId +
										'/' +
										(index + 1) +
										'/repeat'
									}
									key={question.id}
									params={{index: index}}
									onClick={() => {this.handleClick(question.id)}}
								>
									<h3>{question.text}</h3>
								</Link>
							)
						}
					)}
				</div>
			)
		}
	}
}

/**
 * CONTAINER
 */
const mapState = state => {
	return {
		email: state.user.email,
		userId: state.user.id
	}
}

export default connect(mapState)(Subtopic)
