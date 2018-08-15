const router = require('express').Router()

module.exports = router


if(process.env.NODE_ENV !== 'production') require('../../secrets')

var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

router.get('/', (req, res, next) =>{
  try{
    let identity = 'reacto-r'
    var accessToken = new AccessToken(
      process.env.ACCOUNT_SID,
      process.env.API_KEY_SID,
      process.env.API_KEY_SECRET
    );

    accessToken.identity = identity
    var grant = new VideoGrant();
    accessToken.addGrant(grant);

    res.send({
      identity: identity,
      token: accessToken.toJwt()
    })

  } catch(err){
    next(err)
  }
})

