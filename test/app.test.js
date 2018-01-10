import app from '../src/app';
import request from 'supertest';

describe('App', () => {
  const agent = request.agent(app.listen());
  it('should response / with 200', done => {
    agent
      .get('/')
      .expect(200)
      .end(done);
  });

  it('should response data with post request', done => {
    agent
      .post('/api')
      .set('Content-Type', 'application/json')
      .send({ message: 'hello world' })
      .expect(200, (err, res) => {
        res.body.should.have.property('message', 'hello world');
        done();
      });
  });
});
