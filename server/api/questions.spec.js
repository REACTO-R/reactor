const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
// const {
// 	MainTopic,
// 	SubTopic,
// 	Question,
// 	QuestionList,
// 	RQuestion,
// 	EQuestion,
// 	AQuestion,
// 	CTStuff,
// 	UserQuestions
// } = require('../db/index')
const MainTopic = db.model('MainTopic')
const SubTopic = db.model('SubTopic')
const Question = db.model('Question')
const QuestionList = db.model('QuestionList')
const RQuestion = db.model('RQuestion')
const EQuestion = db.model('EQuestion')
const AQuestion = db.model('AQuestion')
const CTStuff = db.model('CTStuff')
const User = db.model('user')

describe("Question routes", () => {
	var cookie
	var database = request.agent('http://localhost:8080')
	beforeEach(() => {
		return db.sync({force: true})
	})

	describe('/api/questions', () => {
		//Man it's getting tiring to have to redfine a topic seed for each test.
		beforeEach(async () => {
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

			console.log("Starting seed")

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
			await fullTopic.addSubTopic(subTopic)
			await subTopic.addQuestion(question)
			await question.setQuestionList(questionList)
			await questionList.addRQuestion([RQuestion1, RQuestion2])
			await questionList.addEQuestion([EQuestion1, EQuestion2])
			await questionList.addAQuestion([AQuestion1, AQuestion2])
			await question.addCTStuff(CTStuff1)

			await User.create({email: 'cody@email.com', password: '123'})
			// request(app)
			// .post('/login')
			// .send({email: 'cody@email.com', password: '123'})
			// .end(function(err, res) {
			// 	res.should.have.status(200)
			// 	cookie = res.headers['set-cookie']
			// 	done()
			// })
		})//End before each model creation
		function loginUser() {
				return function(done) {
					database
						.post('/login')
						.send({email: 'cody@email.com', password: '123'})
						.expect(200)
						.end(function(err, res) {
							if (err) return done(err);
							done()
						})
				}
			}

		it('Logs in', loginUser())
		it('GET /api/questions', function(done) {
			database
			.get('/api/questions')
			.expect(200)
			.end(function(err, res){
				if (err) return done(err);
				done()
			})
		})
	})
})//End question routes