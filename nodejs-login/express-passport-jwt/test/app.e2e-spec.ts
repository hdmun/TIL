import { Express } from 'express';
import request from 'supertest';
import expressApp from '../app'

describe('Express App (e2e)', () => {
  let app: Express;

  beforeAll(async () => {
    app = expressApp;
    app.set('port', 3000)
  });

  it('/users (GET)', () => {
    return request(app)
      .get('/users')
      .expect(200)
      .expect('respond with a resource');
  });

  describe('/auth/login', () => {
    it('Failed [POST]', () => {
      return request(app)
        .post('/auth/login')
        .send({
          id: 'failedId',
          password: ''
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
});
