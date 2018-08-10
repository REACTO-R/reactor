const router = require('express').Router()
const {User, UserQuestions} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    const newUserQuestion = await UserQuestions.create({
      questionId: req.params.questionId,
    })
    await user.addUserQuestions(newUserQuestion)
    res.status(201)
    res.json(newUserQuestion)
  }
  catch (err) {
    next (err)
  }
})

router.put('/:userId/:questionId', async (req, res, next) => {
  try {
    const userQuestionList = await UserQuestions.update(
      {AQuestion: true},
      {where: {
        userId: req.params.userId,
        questionId: req.params.questionId
      }}
    )
    userQuestionList.update()
  }
  catch (err) {
    next (err)
  }
})

