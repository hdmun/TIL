import { Express } from 'express';
import request, { Response } from 'supertest';
import expressApp from '../app'

describe('Express App (e2e)', () => {
  let app: Express;

  beforeAll(async () => {
    app = expressApp;
    app.set('port', 3000)
  });

  describe('/auth/login', () => {
    it('Failed [POST]', () => {
      return request(app)
        .post('/auth/login')
        .send({
          id : 'fail Test',
          password : 'fail Test'
        })
        .expect(401)
    });

    it('Success [POST]', () => {
      return request(app)
        .post('/auth/login')
        .send({
          id: 'testid',
          password: 'testpassword'
        })
        .expect(201)
    });
  });

  describe('/users', () => {
    let token: string = null;

    beforeAll((done) => {
      request(app)
        .post('/auth/login')
        .send({
          id: 'testid',
          password: 'testpassword'
        })
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
    });

    it('Failed [GET]', () => {
      return request(app)
        .get('/users')
        .expect(401)
    });

    it('Success [GET]', () => {
      return request(app)
        .get('/users')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect('respond with a resource');
    });
  });
});
