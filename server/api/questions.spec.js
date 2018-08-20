const {expect} = require('chai')
const db = require('../db')
const app = require('../index')
const request = require('supertest')(app)

const MainTopic = db.model('MainTopic')
const SubTopic = db.model('SubTopic')
const Question = db.model('Question')
const QuestionList = db.model('QuestionList')
const RQuestion = db.model('RQuestion')
const EQuestion = db.model('EQuestion')
const AQuestion = db.model('AQuestion')
const CTStuff = db.model('CTStuff')
const User = db.model('user')

const userCredentials = {
	email: 'cody@email.com',
	password: '123'
}

let cookieJar

describe('Question routes', () => {
	before(async () => {
		try {
			await db.sync({force: true})
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

			fullTopic = await MainTopic.create({name: 'Main Topic'})
			subTopic = await SubTopic.create({name: 'Sub Topic'})
			question = await Question.create({text: 'Question Text'})
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
			questionList = await QuestionList.create({
				RQuestion: 'Question List, RQuestion',
				EQuestion: 'Question List, EQuestion',
				AQuestion: 'Question List, AQuestion',
				AQuestionConsideration: 'Question List, AQuestionConsideration'
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
			await User.findOrCreate({
				where: {email: 'cody@email.com', password: '123'}
			})
		} catch (error) {
			console.log(error)
		}
	})

	describe('/api/questions', () => {
		before(function(done) {
			request
				.post('/auth/login')
				.send(userCredentials)
				.end(function(err, res) {
					if (err) throw err
					cookieJar = res.headers['set-cookie'][0]
					done()
				})
		}) //End before each model creation
		it('Works.', () => {
			expect(true).to.be.equal(true)
		})
		it('Is able to get all the questions', async () => {
			const res = await request
				.get('/api/questions')
				.set('Cookie', cookieJar)
				.expect(200)

			expect(res.body[0].name).to.be.equal("Main Topic")
			expect(res.body[0].SubTopics[0].Questions[0].text).to.be.equal("Question Text")
		})
		it('Is able to get a truncated list of questions', async () => {
			const res = await request
				.get('/api/questions/truncated')
				.set('Cookie', cookieJar)
				.expect(200)

			expect(res.body[0].name).to.be.equal("Main Topic")
			expect(res.body[0].SubTopics[0].name).to.be.equal("Sub Topic")
			expect(res.body[0].SubTopics[0].Questions).to.be.equal(undefined)
		})
		it('Is able to get a specific topic ID', async () => {
			const res = await request
				.get('/api/questions/1')
				.set('Cookie', cookieJar)
				.expect(200)
			expect(res.body.name).to.be.equal("Main Topic")
		})
		it('Is able to get a specific Subtopic ID', async () => {
			const res = await request
				.get('/api/questions/1/1')
				.set('Cookie', cookieJar)
				.expect(200)
			expect(res.body.name).to.be.equal('Sub Topic')
		})
		it('Is able to get a specific Question ID', async () => {
			const res = await request
				.get('/api/questions/1/1/1')
				.set('Cookie', cookieJar)
				.expect(200)
			expect(res.body.text).to.be.equal('Question Text')
		})
	})
}) //End describing question routes
