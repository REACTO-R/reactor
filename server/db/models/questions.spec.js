const {expect} = require('chai')
const db = require('../index')
const {
	MainTopic,
	SubTopic,
	Question,
	QuestionList,
	RQuestion,
	EQuestion,
	AQuestion,
	CTStuff,
	UserQuestions
} = require('./index')

describe('Full Topic Model', () => {
	beforeEach(() => {
		return db.sync({force: true})
	})

	describe('Individual models', () => {
		describe('Main Topic', () => {
			it('Should create a topic with a name', async () => {
				let newTopic = await MainTopic.create({
					name: 'Topic'
				})
				expect(newTopic.name).to.be.equal('Topic')
			})
			it('Should fail on a topic without a name', async () => {
				try {
					await MainTopic.create()
					throw new 'You should have failed!'()
				} catch (error) {
					expect(error.name).to.be.equal('SequelizeValidationError')
				}
			})
		}) //End Main Topic

		describe('Sub Topic', () => {
			it('Should create a sub topic with a name', async () => {
				let newSubTopic = await SubTopic.create({
					name: 'STopic'
				})
				expect(newSubTopic.name).to.be.equal('STopic')
			})
			it('Should fail on a sub topic without a name', async () => {
				try {
					await SubTopic.create()
					throw new 'You should have failed!'()
				} catch (error) {
					expect(error.name).to.be.equal('SequelizeValidationError')
				}
			})
		}) //End Sub Topic

		describe('Questions', () => {
			it('Should create a question with text', async () => {
				let newQuestion = await Question.create({
					text: 'How did the chicken cross the road?'
				})
				expect(newQuestion.text).to.be.equal(
					'How did the chicken cross the road?'
				)
			})
			it('Should fail on a question without text', async () => {
				try {
					await Question.create()
					throw new 'You should have failed!'()
				} catch (error) {
					expect(error.name).to.be.equal('SequelizeValidationError')
				}
			})
		}) //End question

		describe('Question List', () => {
			it('Should be able to create a list of Repeat, Example, and Approach questions, as well as a consideration for approach.', async () => {
				let newQuestionList = await QuestionList.create({
					RQuestion: 'Repeat?',
					EQuestion: 'Example?',
					AQuestion: 'Approach?',
					AQuestionConsideration: 'Consider the lobster.'
				})
				expect(newQuestionList.RQuestion).to.be.equal('Repeat?')
				expect(newQuestionList.EQuestion).to.be.equal('Example?')
				expect(newQuestionList.AQuestion).to.be.equal('Approach?')
				expect(newQuestionList.AQuestionConsideration).to.be.equal(
					'Consider the lobster.'
				)
			})
			it('Should fail if a question is empty.', async () => {
				try {
					await QuestionList.create({
						RQuestion: 'Who?',
						AQuestion: 'What?'
					})
				} catch (error) {
					expect(error.name).to.be.equal('SequelizeValidationError')
				}
			})
			it("Shouldn't care if consideration is empty", async () => {
				try {
					await QuestionList.create({
						RQuestion: 'Do trees make sound?',
						EQuestion: 'Can one hand clap? Ever?',
						AQuestion:
							"...I don't know any other Zen koans to pervert."
					})
				} catch (error) {
					throw new "You shouldn't have failed!"()
				}
			})
		}) //End Question List

		describe('RQuestion', () => {
			it('Should be create-able.', async () => {
				let newRQuestion = await RQuestion.create({
					correct: true,
					answerText:
						'Fourty-one. The computer was running Javascript and ran into a float rounding error.',
					explanationText:
						"Man, that would be ironic, wouldn't it? (No, it wouldn't)"
				})
				expect(newRQuestion.correct).to.be.equal(true)
				expect(newRQuestion.answerText).to.be.equal(
					'Fourty-one. The computer was running Javascript and ran into a float rounding error.'
				)
				expect(newRQuestion.explanationText).to.be.equal(
					"Man, that would be ironic, wouldn't it? (No, it wouldn't)"
				)
			})
			it('Should default to false if unassigned.', async () => {
				let newRQuestion = await RQuestion.create()
				expect(newRQuestion.correct).to.be.equal(false)
			})
		}) //End RQuestion

		describe('EQuestion', () => {
			it('Should be create-able.', async () => {
				let newEQuestion = await EQuestion.create({
					correct: true,
					answerText: "Swordfish, It's always swordfish.",
					explanationText:
						'You may notice a remarkable similarity to RQuestion. This is intentional.'
				})
				expect(newEQuestion.correct).to.be.equal(true)
				expect(newEQuestion.answerText).to.be.equal(
					"Swordfish, It's always swordfish."
				)
				expect(newEQuestion.explanationText).to.be.equal(
					'You may notice a remarkable similarity to RQuestion. This is intentional.'
				)
			})
			it('Should default to false if unassigned.', async () => {
				let newEQuestion = await EQuestion.create()
				expect(newEQuestion.correct).to.be.equal(false)
			})
		}) //End EQuestion

		describe('AQuestion', () => {
			it('Should be create.', async () => {
				let newAQuestion = await AQuestion.create({
					correct: true,
					answerText:
						'You know, we probably should have called these REA Answers?',
					explanationText: 'Too late for that, though.',
					optimizationText:
						"I kind of wish I didn't make opti-text part of AQuestion, so I could have a standard model for all three."
				})
				expect(newAQuestion.correct).to.be.equal(true)
				expect(newAQuestion.answerText).to.be.equal(
					'You know, we probably should have called these REA Answers?'
				)
				expect(newAQuestion.explanationText).to.be.equal(
					'Too late for that, though.'
				)
				expect(newAQuestion.optimizationText).to.be.equal(
					"I kind of wish I didn't make opti-text part of AQuestion, so I could have a standard model for all three."
				)
			})
			it('Should default to false if unassigned.', async () => {
				let newAQuestion = await AQuestion.create()
				expect(newAQuestion.correct).to.be.equal(false)
			})
		}) //End AQuestion

		describe('CTStuff', () => {
			it('Can be initialized.', async () => {
				try {
					let newCTStuff = await CTStuff.create({
						Input:
							'[Input should be restricted to stringified arrays]',
						Output:
							'Going to need to make sure the front-end route still works after this...'
					})

					expect(newCTStuff.Input).to.be.equal(
						'[Input should be restricted to stringified arrays]'
					)
					expect(newCTStuff.Output).to.be.equal(
						'Going to need to make sure the front-end route still works after this...'
					)
				} catch (error) {
					throw error
				}
			})
			it("Should error if input isn't an array.", async () => {
				try {
					let newCTStuff = await CTStuff.create({
						Input: 'This is not an array.',
						Output:
							'You know, in/out really should be not-null validated.'
					})
				} catch (error) {
					expect(error.name).to.be.equal('SequelizeValidationError')
				}
			})
		}) //End CTStuff

		describe('User Questions', () => {
			it('Can create = true, with default falsities.', async () => {
				try {
					let newUserQuestion = await UserQuestions.create()
					expect(newUserQuestion.RQuestion).to.be.equal(false)
					expect(newUserQuestion.EQuestion).to.be.equal(false)
					expect(newUserQuestion.AQuestion).to.be.equal(false)
					expect(newUserQuestion.CTQuestion).to.be.equal(false)
				} catch (error) {
					throw new 'User Question table failed to be made!'()
				}
			}) //End user questions. Not much to say about this table, it tends to be generated and values added on later, so we'd be testing the API route then.
		})
	}) //End individual portions

	describe('Model associations', () => {
		let fullTopic,
			subTopic,
			question,
			questionList,
			RQuestion1,
			RQuestion2,
			EQuestion1,
			EQuestion2,
			AQuestion1,
			AQuestion2,
			CTStuff1

		beforeEach(async () => {
			fullTopic = await MainTopic.create({name: 'Main Topic'})
			subTopic = await SubTopic.create({name: 'Sub Topic'})
			question = await Question.create({text: 'Question Text'})
			questionList = await QuestionList.create({
				RQuestion: 'Question List, RQuestion',
				EQuestion: 'Question List, EQuestion',
				AQuestion: 'Question List, AQuestion',
				AQuestionConsideration: 'Question List, AQuestionConsideration'
			})
			RQuestion1 = await RQuestion.create({
				correct: true,
				answerText: 'Answer for RQuestion1',
				explanationText: 'Explanation for RQuestion1'
			})
			RQuestion2 = await RQuestion.create({
				correct: false,
				answerText: 'Answer for RQuestion2',
				explanationText: 'Explanation for RQuestion2'
			})
			EQuestion1 = await EQuestion.create({
				correct: true,
				answerText: 'Answer for EQuestion1',
				explanationText: 'Explanation for EQuestion1'
			})
			EQuestion2 = await EQuestion.create({
				correct: false,
				answerText: 'Answer for EQuestion2',
				explanationText: 'Explanation for EQuestion2'
			})
			AQuestion1 = await AQuestion.create({
				correct: true,
				answerText: 'Answer for AQuestion1',
				explanationText: 'Explanation for AQuestion1',
				optimizationText: 'Optimization text for AQuestion1'
			})
			AQuestion2 = await AQuestion.create({
				correct: true,
				answerText: 'Answer for AQuestion2',
				explanationText: 'Explanation for AQuestion2',
				optimizationText: 'Optimization text for AQuestion2'
			})
			CTStuff1 = await CTStuff.create({
				Input: '[4, 8, 15, 16, 23, 42]',
				Output:
					"Gods I hate how my CTStuff properties are in caps and the rest aren't, that's messed me up four times so far, curse my own self."
			})

		})
		describe('Association Testing', () => {
			it('Should be able to associate MainTopic with Subtopic', async () => {
				try {
					await fullTopic.addSubTopic(subTopic)
				} catch (error) {
					throw new 'Failed to create association!'
				}
			})
			it('Should be able to associate Subtopic with question', async () => {
				try {
					await subTopic.addQuestion(question)
				} catch (error) {
					throw new 'Failed to create association!'
				}
			})
			it('Should be able to associate Questionlist with Question', async () => {
				try {
					await question.setQuestionList(questionList)
				} catch (error) {
					throw new 'Failed to create association!'
				}
			})
			it('Should be able to associate REA questions with QuestionList', async () => {
				try {
					await questionList.addRQuestion([RQuestion1, RQuestion2])
					await questionList.addEQuestion([EQuestion1, EQuestion2])
					await questionList.addAQuestion([AQuestion1, AQuestion2])
				} catch (error) {
					throw new 'Failed to create association!'
				}
			})
			it ('Should be able to associate CTStuff with question', async () => {
				try {
					await question.addCTStuff(CTStuff1)
				}
				catch (error) {
					throw new 'Failed to create association!'
				}
			})
		})//End association testing
	})//End model associations
}) //End full topic model
