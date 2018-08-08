const router = require('express').Router()
const {MainTopic} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const questions = await MainTopic.findAll({ include: [{ all: true, nested: true }]})
    res.json(questions)
  } catch (err) {
    next(err)
  }
})
