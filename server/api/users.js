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

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId, {
      include: [{all: true}]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    console.log(req.body)
    const newUserQuestion = await UserQuestions.findOrCreate({
      where: {
        questionId: Number(req.body.questionId)
      }
    })
    console.log(newUserQuestion[0].questionId)
    console.log(newUserQuestion[1])
    if (newUserQuestion[1]) {
      await user.addUserQuestions(newUserQuestion[0])
      res.status(201)
      res.json(newUserQuestion[0])
    } else {
      res.status(200)
      res.json(newUserQuestion[0])
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/:questionId', async (req, res, next) => {
  try {
    const propToUpdate = req.body.propUpdate
    const userQuestionList = await UserQuestions.update(
      {propToUpdate: true},
      {
        where: {
          userId: req.params.userId,
          questionId: req.params.questionId
        }
      }
    )
    userQuestionList.update()
  } catch (err) {
    next(err)
  }
})
