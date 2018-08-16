import React from 'react'
import {connect} from 'react-redux'
import {fetchUser} from '../store'
import {fetchQuestions} from '../store/questions'
import axios from 'axios'

class QuestionForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			mainTopic: {
				name: '',
				Id: 0
			},
			subTopic: {
				name: '',
				Id: 0
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
			EQuestion: [
				{
					correct: false,
					answerText: '',
					explanationText: ''
				}
			],
			AQuestion: [
				{
					correct: false,
					answerText: '',
					explanationText: '',
					optimizationText: ''
				}
			],
			CTStuff: [
				{
					input: '',
					output: ''
				}
			],
			fetchedQuestions: [],
			fetchedSubTopics: []
		}
		this.onChange = this.onChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.addRQuestion = this.addRQuestion.bind(this)
		this.addEQuestion = this.addEQuestion.bind(this)
		this.addAQuestion = this.addAQuestion.bind(this)
		this.addCTStuff = this.addCTStuff.bind(this)
		this.mainTopicDropdown = this.mainTopicDropdown.bind(this)
		this.subTopicDropdown = this.subTopicDropdown.bind(this)
	}

	async componentDidMount() {
		let questions = await axios.get('/api/questions/truncated')
		this.setState({
			fetchedQuestions: questions.data
		})
	}

	addRQuestion() {
		let RQuestion = this.state.RQuestion
		let newRQuestion = {
			correct: false,
			answerText: '',
			explanationText: ''
		}
		RQuestion.push(newRQuestion)
		this.setState({RQuestion})
	}

	addCTStuff() {
		let CTStuff = this.state.CTStuff
		let newCTStuff = {
			input: '',
			output: ''
		}
		CTStuff.push(newCTStuff)
		this.setState({CTStuff})
	}

	addEQuestion() {
		let EQuestion = this.state.EQuestion
		let newEQuestion = {
			correct: false,
			answerText: '',
			explanationText: ''
		}
		EQuestion.push(newEQuestion)
		this.setState({EQuestion})
	}

	addAQuestion() {
		let AQuestion = this.state.AQuestion
		let newAQuestion = {
			correct: false,
			answerText: '',
			explanationText: '',
			optimizationText: ''
		}
		AQuestion.push(newAQuestion)
		this.setState({AQuestion})
	}

	async handleSubmit(event) {
		try {
			event.preventDefault()
			this.state.CTStuff.forEach(ctThing => {
				let input = ctThing.input
				let output = ctThing.output
				if (input === '' || output === '') {
					throw new Error(
						'Error, input/output for tests cannot be empty!'
					)
				}
				if (input[0] !== '[' || input[input.length - 1] !== ']') {
					throw new Error('Error, input must be in array form!')
				}
			})
			if ((this.state.RQuestion.filter(RQuestion => {
				return (RQuestion.correct)
			})).length === 0)
			{
				throw new Error('Error, at least one Repeat answer must be correct!')
			}
			if ((this.state.EQuestion.filter(EQuestion => {
				return (EQuestion.correct)
			})).length === 0)
			{
				throw new Error('Error, at least one Example answer must be correct!')
			}
			if ((this.state.AQuestion.filter(AQuestion => {
				return (AQuestion.correct)
			})).length === 0)
			{
				throw new Error('Error, at least one Approach answer must be correct!')
			}
			await axios.post('/api/newquestion', this.state)
			console.log('Posted!')
		} catch (error) {
			console.log(error)
		}
	}

	onChange(event) {
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
					//Turns out, referring to checkboxes is incredibly difficult.
					'RQuestionCorrect'
				)
				if (checkBoxes[Number(event.target.id)].checked) {
					//So we just get all the checkboxes, then check the index value of the one we want.
					newRQuestion.correct = true
				} else {
					newRQuestion.correct = false
				}
				this.setState({RQuestion})
				break
			}
			case 'EQuestionAnswerText': {
				let EQuestion = this.state.EQuestion
				let newEQuestion = EQuestion[Number(event.target.id)]
				newEQuestion.answerText = event.target.value
				EQuestion[Number(event.target.id)] = newEQuestion
				this.setState({EQuestion})
				break
			}
			case 'EQuestionExplanationText': {
				let EQuestion = this.state.EQuestion
				let newEQuestion = EQuestion[Number(event.target.id)]
				newEQuestion.explanationText = event.target.value
				EQuestion[Number(event.target.id)] = newEQuestion
				this.setState({EQuestion})
				break
			}
			case 'EQuestionCorrect': {
				let EQuestion = this.state.EQuestion
				let newEQuestion = EQuestion[Number(event.target.id)]
				let checkBoxes = document.getElementsByClassName(
					'EQuestionCorrect'
				)
				if (checkBoxes[Number(event.target.id)].checked) {
					newEQuestion.correct = true
				} else {
					newEQuestion.correct = false
				}
				this.setState({EQuestion})
				break
			}
			case 'AQuestionAnswerText': {
				let AQuestion = this.state.AQuestion
				let newAQuestion = AQuestion[Number(event.target.id)]
				newAQuestion.answerText = event.target.value
				AQuestion[Number(event.target.id)] = newAQuestion
				this.setState({AQuestion})
				break
			}
			case 'AQuestionExplanationText': {
				let AQuestion = this.state.AQuestion
				let newAQuestion = AQuestion[Number(event.target.id)]
				newAQuestion.explanationText = event.target.value
				AQuestion[Number(event.target.id)] = newAQuestion
				this.setState({AQuestion})
				break
			}
			case 'AQuestionOptimizationText': {
				let AQuestion = this.state.AQuestion
				let newAQuestion = AQuestion[Number(event.target.id)]
				newAQuestion.optimizationText = event.target.value
				AQuestion[Number(event.target.id)] = newAQuestion
				this.setState({AQuestion})
				break
			}
			case 'AQuestionCorrect': {
				let AQuestion = this.state.AQuestion
				let newAQuestion = AQuestion[Number(event.target.id)]
				let checkBoxes = document.getElementsByClassName(
					'AQuestionCorrect'
				)
				if (checkBoxes[Number(event.target.id)].checked) {
					newAQuestion.correct = true
				} else {
					newAQuestion.correct = false
				}
				this.setState({AQuestion})
				break
			}
			case 'CTStuffInput': {
				let CTStuff = this.state.CTStuff
				let newCTStuff = CTStuff[Number(event.target.id)]
				newCTStuff.input = event.target.value
				CTStuff[Number(event.target.id)] = newCTStuff
				this.setState({CTStuff})
				break
			}
			case 'CTStuffOutput': {
				let CTStuff = this.state.CTStuff
				let newCTStuff = CTStuff[Number(event.target.id)]
				newCTStuff.output = event.target.value
				CTStuff[Number(event.target.id)] = newCTStuff
				this.setState({CTStuff})
				break
			}
			default:
				break
		}
	}

	mainTopicDropdown(event) {
		let mainTopic = Object.assign({}, this.state.mainTopic)
		mainTopic.Id = Number(event.target.value)
		let mainTopicForm = document.getElementsByClassName('maintopic')[0]
		if (Number(event.target.value) === 0) {
			mainTopicForm.removeAttribute('disabled')
			mainTopic.name = ''
		} else {
			let subtopics = this.state.fetchedQuestions[event.target.value - 1]
				.SubTopics
			mainTopicForm.setAttribute('disabled', 'disabled')
			mainTopic.name = this.state.fetchedQuestions[
				event.target.value - 1
			].name
			this.setState({fetchedSubTopics: subtopics})
		}
		let subTopic = Object.assign({}, this.state.subTopic) //If we set it to new topic, clear out the subtopic.
		subTopic.Id = 0
		subTopic.name = ''
		let subTopicForm = document.getElementsByClassName('subtopic')[0]
		subTopicForm.removeAttribute('disabled')
		this.setState({subTopic})
		this.setState({mainTopic})
		console.log('Main topic ID: ', this.state.mainTopic.Id)
	}

	subTopicDropdown(event) {
		let subTopic = Object.assign({}, this.state.subTopic)
		subTopic.Id = this.state.fetchedSubTopics[event.target.value - 1].id
		let subTopicForm = document.getElementsByClassName('subtopic')[0]
		if (Number(event.target.value) === 0) {
			subTopicForm.removeAttribute('disabled')
			subTopic.name = ''
		} else {
			subTopicForm.setAttribute('disabled', 'disabled')
			subTopic.name = this.state.fetchedSubTopics[
				event.target.value - 1
			].name
		}
		this.setState({subTopic})
		console.log('Subtopic ID: ', this.state.subTopic.Id)
	}

	//Should probably break these down into their own individual components, but then state stuff'll be a mess.
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
					<select
						value={this.state.mainTopic.Id}
						onChange={this.mainTopicDropdown}
					>
						<option value={0}>New Topic</option>
						{this.state.fetchedQuestions.map(mainTopic => {
							return (
								<option
									value={mainTopic.id}
									key={mainTopic.name}
								>
									{mainTopic.name}
								</option>
							)
						})}
					</select>
					<br />
					Subtopic:
					<input
						type="text"
						className="subtopic"
						onChange={this.onChange}
						value={this.state.subTopic.name}
					/>
					<select
						value={this.state.subTopic.Id}
						onChange={this.subTopicDropdown}
					>
						<option value={0} id={0}>
							New Subtopic
						</option>
						{this.state.fetchedSubTopics.map((subTopic, index) => {
							return (
								<option
									value={index + 1}
									key={subTopic.name}
								>
									{subTopic.name}
								</option>
							)
						})}
					</select>
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
							<div key={'RQuestion' + index}>
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
					{this.state.EQuestion.map((eQuest, index) => {
						return (
							<div key={'EQuestion' + index}>
								EQuestion Answer Text:
								<input
									type="text"
									className="EQuestionAnswerText"
									onChange={this.onChange}
									id={index.toString()}
									value={
										this.state.EQuestion[index.toString()]
											.answerText
									}
								/>
								<br />
								EQuestion Explanation Text:
								<input
									type="text"
									className="EQuestionExplanationText"
									onChange={this.onChange}
									id={index.toString()}
									value={
										this.state.EQuestion[index.toString()]
											.explanationText
									}
								/>
								<br />
								EQuestion Truthiness:
								<input
									type="checkbox"
									className="EQuestionCorrect"
									onChange={this.onChange}
									id={index.toString()}
								/>
							</div>
						)
					})}
					{this.state.AQuestion.map((aQuest, index) => {
						return (
							<div key={'AQuestion' + index}>
								AQuestion Answer Text:
								<input
									type="text"
									className="AQuestionAnswerText"
									onChange={this.onChange}
									id={index.toString()}
									value={
										this.state.AQuestion[index.toString()]
											.answerText
									}
								/>
								<br />
								AQuestion Explanation Text:
								<input
									type="text"
									className="AQuestionExplanationText"
									onChange={this.onChange}
									id={index.toString()}
									value={
										this.state.AQuestion[index.toString()]
											.explanationText
									}
								/>
								<br />
								AQuestion Optimization Text:
								<input
									type="text"
									className="AQuestionOptimizationText"
									onChange={this.onChange}
									id={index.toString()}
									value={
										this.state.AQuestion[index.toString()]
											.optimizationText
									}
								/>
								<br />
								AQuestion Truthiness:
								<input
									type="checkbox"
									className="AQuestionCorrect"
									onChange={this.onChange}
									id={index.toString()}
								/>
							</div>
						)
					})}
					{this.state.CTStuff.map((ctStuff, index) => {
						return (
							<div key={'CTStuff' + index}>
								Test Input:
								<input
									type="text"
									className="CTStuffInput"
									onChange={this.onChange}
									id={index.toString()}
									value={
										this.state.CTStuff[index.toString()]
											.input
									}
								/>
								Test Output:
								<input
									type="text"
									className="CTStuffOutput"
									onChange={this.onChange}
									id={index.toString()}
									value={
										this.state.CTStuff[index.toString()]
											.output
									}
								/>
							</div>
						)
					})}
					<input type="submit" value="Submit" />
				</form>
				<button type="button" onClick={this.addRQuestion}>
					Add a Repeat Answer
				</button>
				<button type="button" onClick={this.addEQuestion}>
					Add a Example Answer
				</button>
				<button type="button" onClick={this.addAQuestion}>
					Add a Approach Answer
				</button>
				<button type="button" onClick={this.addCTStuff}>
					Add a Test
				</button>
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
