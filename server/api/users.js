const router = require('express').Router()
const {User, UserQuestions} = require('../db/models')
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

router.get('/', requireAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email']
    })

    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', requireAdmin, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId, {
      include: [{all: true}]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/:userId', requireAdmin, async (req, res, next) => {
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

router.put('/:userId/:questionId', requireAdmin, async (req, res, next) => {
  try {
    const propToUpdate = req.body.propUpdate
    switch (propToUpdate) {
      case 'RQuestion':
        await UserQuestions.update(
          {RQuestion: true},
          {
            where: {
              userId: req.params.userId,
              questionId: req.params.questionId
            }
          }
        )
        break
      case 'EQuestion':
        await UserQuestions.update(
          {EQuestion: true},
          {
            where: {
              userId: req.params.userId,
              questionId: req.params.questionId
            }
          }
        )
        break
      case 'AQuestion':
        await UserQuestions.update(
          {AQuestion: true, AQuestionApproach: req.body.AQuestionApproach},
          {
            where: {
              userId: req.params.userId,
              questionId: req.params.questionId
            }
          }
        )
        break
      case 'CTQuestion':
        await UserQuestions.update(
          {CTQuestion: true},
          {
            where: {
              userId: req.params.userId,
              questionId: req.params.questionId
            }
          }
        )
        break
      case 'CTAnswer':
        await UserQuestions.update(
          {CTAnswer: req.body.CTAnswer},
          {
            where:{
              userId: req.params.userId,
              questionId: req.params.questionId
            }
          })
        break
      default:
        break
    }
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})
