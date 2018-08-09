const router = require('express').Router()
const {MainTopic} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const questions = await MainTopic.findAll({
      include: [{all: true, nested: true}]
    })
    res.json(questions)
  } catch (err) {
    next(err)
  }
})

// router.get(':topicId/:subtopicId/:questionId')

router.get('/:topicId', async (req, res, next) => {
  try {
    const questions = await MainTopic.findAll({
      // where: {id: req.params.topicId},
      include: [{all: true, nested: true}]
    })
    const topicQuestions = questions[req.params.topicId - 1]
    res.json(topicQuestions)
  } catch (err) {
    next(err)
  }
})

router.get('/:topicId/:subtopicId', async (req, res, next) => {
  try {
    const questions = await MainTopic.findAll({
      // where: {id: req.params.topicId},
      include: [{all: true, nested: true}]
    })
    const topicQuestions = questions[req.params.topicId - 1]
    const subtopicQuestions =
      topicQuestions.SubTopics[req.params.subtopicId - 1]
    res.json(subtopicQuestions)
  } catch (err) {
    next(err)
  }
})

router.get('/:topicId/:subtopicId/:questionId', async (req, res, next) => {
  try {
    const questions = await MainTopic.findAll({
      // where: {id: req.params.topicId},
      include: [{all: true, nested: true}]
    })
    const topicQuestions = questions[req.params.topicId - 1]
    const subtopicQuestions =
      topicQuestions.SubTopics[req.params.subtopicId - 1]
    const question = subtopicQuestions.Questions[req.params.questionId - 1]
    res.json(question)
  } catch (err) {
    next(err)
  }
})
