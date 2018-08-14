const router = require('express').Router()

module.exports = router

const ACCOUNT_SID = 'ACd294ab24e21c25508a0247e68b626fa4';
const API_KEY_SID = 'SK0a648d0a6f54a8db58b414ed0dfce7ac';
const API_KEY_SECRET = 'IsaP1T998Ovf1ynGdME3zHRbBNWpGD8Y'

if(process.env.NODE_ENV !== 'production') require('../../secrets')

var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

router.get('/', (req, res, next) =>{
  try{
    let identity = 'reacto-r'
    var accessToken = new AccessToken(
      ACCOUNT_SID,
      API_KEY_SID,
      API_KEY_SECRET
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

