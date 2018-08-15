import React from 'react'
import {connect} from 'react-redux'
import {fetchUser} from '../store'
import {fetchQuestions} from '../store/questions'

/*
Alright let's see here, we'll need:
Either a way to select, or create a topic and subtopic.
They should be objects, with an id (if found), and name
After that user should be able to create a question, which is an object with only text.

Next, QuestionList, which is an object with four text properties: QLRQuestion, QLEQUestion, QLAQuestion, and QLAQuestionConsideration.

After that, for each RQuestion, we have an array of objects.
Each object should have a boolean correct property, a text answerText and explanationText property.
AQuestion should have an additional text property optimizationText.

Finally, CTStuff is also an array of objects, but each object only has input and output.

*/
class QuestionForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			mainTopic: {
				name: ''
			},
			subTopic: {
				name: ''
			},
			question: {
				questionText: ''
			},
			questionList: {
				QLRQuestion: '',
				QLEQuestion: '',
				QLAQuestion: '',
				QLAQuestionConsideration: ''
			},
			RQuestion: [
				{
					correct: false,
					answerText: '',
					explanationText: ''
				}
			],
			EQuestion: [],
			AQuestion: [],
			CTStuff: []
		}
		this.onChange = this.onChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.addRQuestion = this.addRQuestion.bind(this)
	}

	addRQuestion() {
		let RQuestion = this.state.RQuestion
		let newRQuestion = {
			correct: false,
			answerText: '',
			explanationText: '',
		}
		RQuestion.push(newRQuestion)
		this.setState({RQuestion})
	}

	handleSubmit(event) {
		event.preventDefault()
		console.log(this.state)
	}

	onChange(event) {
		console.log(event.target.value)
		switch (event.target.className) {
			case 'maintopic': {
				let mainTopic = Object.assign({}, this.state.mainTopic)
				mainTopic.name = event.target.value
				this.setState({mainTopic})
				break
			}
			case 'subtopic': {
				let subTopic = Object.assign({}, this.state.subTopic)
				subTopic.name = event.target.value
				this.setState({subTopic})
				break
			}
			case 'question': {
				let question = Object.assign({}, this.state.question)
				question.questionText = event.target.value
				this.setState({question})
				break
			}
			case 'QLRQuestion': {
				let questionList = Object.assign({}, this.state.questionList)
				questionList.QLRQuestion = event.target.value
				this.setState({questionList})
				break
			}
			case 'QLEQuestion': {
				let questionList = Object.assign({}, this.state.questionList)
				questionList.QLEQuestion = event.target.value
				this.setState({questionList})
				break
			}
			case 'QLAQuestion': {
				let questionList = Object.assign({}, this.state.questionList)
				questionList.QLAQuestion = event.target.value
				this.setState({questionList})
				break
			}
			case 'QLAQuestionConsideration': {
				let questionList = Object.assign({}, this.state.questionList)
				questionList.QLAQuestionConsideration = event.target.value
				this.setState({questionList})
				break
			}
			case 'RQuestionAnswerText': {
				let RQuestion = this.state.RQuestion
				let newRQuestion = RQuestion[Number(event.target.id)]
				newRQuestion.answerText = event.target.value
				RQuestion[Number(event.target.id)] = newRQuestion
				this.setState({RQuestion})
				break
			}
			case 'RQuestionExplanationText': {
				let RQuestion = this.state.RQuestion
				let newRQuestion = RQuestion[Number(event.target.id)]
				newRQuestion.explanationText = event.target.value
				RQuestion[Number(event.target.id)] = newRQuestion
				this.setState({RQuestion})
				break
			}
			case 'RQuestionCorrect': {
				let RQuestion = this.state.RQuestion
				let newRQuestion = RQuestion[Number(event.target.id)]
				let checkBoxes = document.getElementsByClassName(
					'RQuestionCorrect'
				)
				if (checkBoxes[Number(event.target.id)].checked) {
					newRQuestion.correct = true
				} else {
					newRQuestion.correct = false
				}
				this.setState({RQuestion})
				break
			}
			default:
				break
		}
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					Topic:
					<input
						type="text"
						className="maintopic"
						onChange={this.onChange}
						value={this.state.mainTopic.name}
					/>
					<br />
					Subtopic:
					<input
						type="text"
						className="subtopic"
						onChange={this.onChange}
						value={this.state.subTopic.name}
					/>
					<br />
					Question:
					<input
						type="text"
						className="question"
						onChange={this.onChange}
						value={this.state.question.questionText}
					/>
					<br />
					Repeat Question:
					<input
						type="text"
						className="QLRQuestion"
						onChange={this.onChange}
						value={this.state.questionList.QLRQuestion}
					/>
					<br />
					Example Question:
					<input
						type="text"
						className="QLEQuestion"
						onChange={this.onChange}
						value={this.state.questionList.QLEQuestion}
					/>
					<br />
					Approach Question:
					<input
						type="text"
						className="QLAQuestion"
						onChange={this.onChange}
						value={this.state.questionList.QLAQuestion}
					/>
					<br />
					Approach Consideration:
					<input
						type="text"
						className="QLAQuestionConsideration"
						onChange={this.onChange}
						value={this.state.questionList.QLAQuestionConsideration}
					/>
					<br />
					{this.state.RQuestion.map((rQuest, index) => {
						return (
							<div key={"RQuestion"+index}>
								RQuestion Answer Text:
								<input
									type="text"
									className="RQuestionAnswerText"
									onChange={this.onChange}
									id={index.toString()}
									value={
										this.state.RQuestion[index.toString()]
											.answerText
									}
								/>
								<br />
								RQuestion Explanation Text:
								<input
									type="text"
									className="RQuestionExplanationText"
									onChange={this.onChange}
									id={index.toString()}
									value={
										this.state.RQuestion[index.toString()]
											.explanationText
									}
								/>
								<br />
								RQuestion Truthiness:
								<input
									type="checkbox"
									className="RQuestionCorrect"
									onChange={this.onChange}
									id={index.toString()}
								/>
							</div>
						)
					})}
					<input type="submit" value="Submit" />
				</form>
				<button type="button" onClick={this.addRQuestion}>Add a Repeat Question</button>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		questions: state.questions,
		userId: state.user.id
	}
}

export default connect(mapStateToProps)(QuestionForm)
