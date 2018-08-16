const router = require('express').Router()
const {MainTopic, SubTopic} = require('../db/models')
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

router.get('/truncated', requireAdmin, async (req, res, next) => {
  try {
    const questions = await MainTopic.findAll({
      include:[{model: SubTopic}]
    })
    res.json(questions)
  }
  catch (err) {
    next(err)
  }
})

router.get('/', requireAdmin, async (req, res, next) => {
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

router.get('/:topicId', requireAdmin, async (req, res, next) => {
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

router.get('/:topicId/:subtopicId', requireAdmin, async (req, res, next) => {
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

router.get(
  '/:topicId/:subtopicId/:questionId',
  requireAdmin,
  async (req, res, next) => {
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
  }
)
