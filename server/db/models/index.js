const User = require('./user')
const MainTopic = require('./mainTopic')
const SubTopic = require('./subTopic')
const Question = require('./questions')
const QuestionList = require('./questionList')
const RQuestion = require('./RQuestion')
const EQuestion = require('./EQuestion')
const AQuestion = require('./AQuestion')
const CTStuff = require('./CTStuff')

MainTopic.hasMany(SubTopic)
SubTopic.belongsTo(MainTopic)

SubTopic.hasMany(Question)
Question.belongsTo(SubTopic)

Question.hasOne(QuestionList)
QuestionList.belongsTo(Question)

QuestionList.hasMany(RQuestion)
QuestionList.hasMany(EQuestion)
QuestionList.hasMany(AQuestion)
RQuestion.belongsTo(QuestionList)
EQuestion.belongsTo(QuestionList)
AQuestion.belongsTo(QuestionList)

Question.hasMany(CTStuff)
CTStuff.belongsTo(Question)


/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, MainTopic, SubTopic, Question, QuestionList, RQuestion, EQuestion, AQuestion, CTStuff
}
