var app = require('../server_cirimed.js'),
  chai = require('chai'),
  request = require('supertest');
  
describe('POST /login', function() {
  it('responds with json', function(done) {
  request(app)
    .post('/api/auth/login')
    .send({email: 'user@email.com', password: 'yourpassword'})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    })
  })
})