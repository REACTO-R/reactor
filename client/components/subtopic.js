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
	}

	async componentDidMount() {
		let topics = await axios.get('/api/questions')
		this.setState({
			topics: topics.data
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
			let subtopicArray = this.state.topics[this.state.topicId - 1]
				.SubTopics
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
										(index+1) +
										'/repeat' 
										

									}
									key={question.id}
									params={{index: index}}
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
		email: state.user.email
	}
}

export default connect(mapState)(Subtopic)
