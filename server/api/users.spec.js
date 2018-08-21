/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../db')
const app = require('../index')
const request = require('supertest')(app)
const User = db.model('user')

describe('User routes', () => {
  console.log('Starting.')
  beforeEach(() => {
    return db.sync({force: true})
  })
})

const userCredentials = {
  email: 'cody@email.com',
  password: '123'
}

let cookieJar

describe('authenticated access only', function() {
  before(function(done) {
    request
      .post('/auth/login')
      .send(userCredentials)
      .end(function(err, res) {
        if (err) throw err
        cookieJar = res.headers['set-cookie'][0]
        done()
      })
  })

  it('posts an object', async () => {
    const res = await request
      .get('/api/users')
      .set('Cookie', cookieJar)
      .expect(200)
    // console.log('res', res.body)
    expect(res.body.length).to.equal(1)
  })
})
