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
} = require('../db/models')
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
				id: Number(req.body.mainTopic.Id),
			},
			defaults: {
				name: req.body.mainTopic.name
			}
		})
		const subTopicFOC = await SubTopic.findOrCreate({
			where:{
				id: Number(req.body.subTopic.Id),
			},
			defaults:{
				name: req.body.subTopic.name
			}
		})
		if (subTopicFOC[1]) { //If the subtopic was created,
			await mainTopicFOC[0].addSubTopic(subTopicFOC[0]) //Add an association to the main topic.
		} //Else, we can assume the association already exists.

		const question = await Question.create({
			text: req.body.question.questionText,
			unguidedOptimize: req.body.question.unguidedOptimize,
			unguidedSolution: req.body.question.unguidedSolution
		})
		const questionList = await QuestionList.create({
			RQuestion: req.body.questionList.QLRQuestion,
			EQuestion: req.body.questionList.QLEQuestion,
			AQuestion: req.body.questionList.QLAQuestion,
			AQuestionConsideration: req.body.questionList.QLAQuestionConsideration
		})
		await question.setQuestionList(questionList)
		await subTopicFOC[0].addQuestion(question)

		req.body.RQuestion.forEach(async (rQuestion) => {
			let newRQuestion = await RQuestion.create({
				correct: rQuestion.correct,
				answerText: rQuestion.answerText,
				explanationText: rQuestion.explanationText,
			})
			await questionList.addRQuestion(newRQuestion)
		})

		req.body.EQuestion.forEach(async (eQuestion) => {
			let newEQuestion = await EQuestion.create({
				correct: eQuestion.correct,
				answerText: eQuestion.answerText,
				explanationText: eQuestion.explanationText,
			})
			await questionList.addEQuestion(newEQuestion)
		})

		req.body.AQuestion.forEach(async (aQuestion) => {
			let newAQuestion = await AQuestion.create({
				correct: aQuestion.correct,
				answerText: aQuestion.answerText,
				explanationText: aQuestion.explanationText,
				optimizationText: aQuestion.optimizationText,
				optimizationCode: aQuestion.optimizationCode,
				optimizationGraph: aQuestion.optimizationGraph
			})
			await questionList.addAQuestion(newAQuestion)
		})

		req.body.CTStuff.forEach(async (cTStuff) => {
			let newCTStuff = await CTStuff.create({
				Input: cTStuff.input,
				Output: cTStuff.output,
			})
			await question.addCTStuff(newCTStuff)
		})

		res.json(mainTopicFOC[0])
	}
	catch (err) {
		next (err)
	}
})