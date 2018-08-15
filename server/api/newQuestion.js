const router = require('express').Router()
const {
  MainTopic,
  SubTopic,
  Question,
  QuestionList,
  RQuestion,
  EQuestion,
  AQuestion,
  CTStuff
} = require('../server/db/models')
 module.exports = router

 function requireAdmin(req, res, next) {
  if (
    req.user ||
    // && req.user.isAdmin
    req.user.id === req.params.id
  ) {
    next()
  } else {
    res.status(401).send('you shall not pass')
  }
}

router.post('/', requireAdmin, async (req, res, next) => {
	try {
		const mainTopicFOC = await MainTopic.findOrCreate({
			where: {
				id: req.body.mainTopicId,
			}
		})
		const subTopicFOC = await SubTopic.findOrCreate({
			where:{
				id: req.body.subTopicId,
			}
		})
		if (subTopicFOC[1]) { //If the subtopic was created,
			await mainTopicFOC[0].addSubTopic(subTopicFOC[0]) //Add an association to the main topic.
		} //Else, we can assume the association already exists.

		const question = await Question.create({
			text: req.body.questionText
		})
		const questionList = await QuestionList.create({
			RQuestion: req.body.QLRQuestion,
			EQuestion: req.body.QLEQuestion,
			AQuestion: req.body.QLAQuestion,
			AQuestionConsideration: req.body.QLAQuestionConsideration
		})
		await question.setQuestionList(questionList)
		await subTopicFOC[0].addQuestion(question)

		req.body.RQuestions.forEach(async (rQuestion) => {
			let newRQuestion = await RQuestion.create({
				correct: rQuestion.correct,
				answerText: rQuestion.answerText,
				explanationText: rQuestion.explanationText,
			})
			await questionList.addRQuestion(newRQuestion)
		})

		req.body.EQuestions.forEach(async (eQuestion) => {
			let newEQuestion = await EQuestion.create({
				correct: eQuestion.correct,
				answerText: eQuestion.answerText,
				explanationText: eQuestion.explanationText,
			})
			await questionList.addEQuestion(newEQuestion)
		})

		req.body.AQuestions.forEach(async (aQuestion) => {
			let newAQuestion = await AQuestion.create({
				correct: aQuestion.correct,
				answerText: aQuestion.answerText,
				explanationText: aQuestion.explanationText,
				optimizationText: aQuestion.optimizationText
			})
			await questionList.addAQuestion(newAQuestion)
		})

		req.body.CTStuff.forEach(async (cTStuff) => {
			let newCTStuff = await CTStuff.create({
				input: cTStuff.input,
				output: cTStuff.output,
			})
			await question.addCTStuff(newCTStuff)
		})

		res.json(mainTopicFOC[0])
	}
	catch (err) {
		next (err)
	}
})