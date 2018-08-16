/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../db')
const app = require('../index')
const request = require('supertest')(app)
const User = db.model('user')

const userCredentials = {
  email: 'cody@email.com',
  password: '123'
}

let cookieJar

describe.only('useless api endpoint', function() {
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

    console.log('res', res.body)
    expect(res.body.length).to.equal(2)
  })
})

// var authenticatedUser = request.agent(app)
// before(function(done) {
//   authenticatedUser
//     .post('/login')
//     .send(userCredentials)
//     .end(function(err, response) {
//       // console.log('response', response)
//       expect(response.statusCode).to.equal(200)
//       done()
//     })
// })

// describe('GET /profile', function(done) {
//addresses 1st bullet point: if the user is logged in we should get a 200 status code
//   it('should return a 200 response if the user is logged in', function(done) {
//     authenticatedUser.get('/api/users').expect(200, done)
//   })
// })

// describe('User routes', () => {
//   // beforeEach(() => {
//   //   return db.sync({force: true})
//   // })

//   describe('/api/users/ ', () => {
//     const codysEmail = 'cody@email.com'

//     // beforeEach(() => {
//     //   return User.create({
//     //     email: codysEmail
//     //   })
//     // })

//     it('GET /api/users', async () => {
//       const res = await request(app)
//         .get('/api/users')
//         .expect(200)
//       console.log('res', res)
//       expect(res.body).to.be.an('array')
//       expect(res.body[0].email).to.be.equal(codysEmail)
//     })
//   })
// })

// describe('User routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('/api/users/', () => {
//     const codysEmail = 'cody@puppybook.com'

//     beforeEach(() => {
//       return User.create({
//         email: codysEmail
//       })
//     })

//     it('GET /api/users', async () => {
//       const res = await request(app)
//         .get('/api/users')
//         .expect(200)

//       expect(res.body).to.be.an('array')
//       expect(res.body[0].email).to.be.equal(codysEmail)
//     })
//   }) // end describe('/api/users')
// }) // end describe('User routes')
