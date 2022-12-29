import { Express } from 'express';
import request from 'supertest';
import expressApp from '../app'
import { User } from '../entities/user.entity';
import mySqlDataSource from '../loaders/mysql';

describe('Express App (e2e)', () => {
  let app: Express;

  beforeAll(async () => {
    app = expressApp;

    await mySqlDataSource.initialize();
  });

  afterAll(async () => {
    await mySqlDataSource.getRepository(User).clear();
    await mySqlDataSource.destroy();
  })

  describe('/auth', () => {
    it('[POST] /register success', async () => {
      const res = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@email.com',
          password: 'testpassword',
          firstName: 'testFirstName',
          lastName: 'testLastName',
        })
        .expect(201)
        .expect('Content-Type', /json/)

        expect(res.body.token).not.toBeUndefined()
        expect(res.body.token).not.toBeNull()
    });

    it('[POST] /login success', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@email.com',
          password: 'testpassword'
        })
        .expect(201)
        .expect('Content-Type', /json/)

        expect(res.body.token).not.toBeUndefined()
        expect(res.body.token).not.toBeNull()
    });

    it('[POST] /login failed', () => {
      return request(app)
        .post('/auth/login')
        .send({
          email : 'fail Test',
          password : 'fail Test'
        })
        .expect(401)
    });
  });

  describe('/users', () => {
    let token: string = null;
    let cookie: string[] = [];

    beforeAll(async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@email.com',
          password: 'testpassword'
        })
        .expect(201)
        .expect('Content-Type', /json/)

        expect(res.body.token).not.toBeUndefined();
        expect(res.body.token).not.toBeNull();
        token = res.body.token;
        cookie = res.get('Set-Cookie');
    });

    it('[GET] /users failed', () => {
      return request(app)
        .get('/users')
        .expect(401)
    });

    it('[GET] /users success', () => {
      return request(app)
        .get('/users')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect('respond with a resource');
    });

    it('[GET] /users failed to silent', async () => {
      await request(app)
        .get('/users')
        .expect(401)

      const silentRes = await request(app)
      .post('/auth/silent')
      .set('Cookie', cookie)
      .send()
      .expect(201)

      expect(silentRes.body.token).not.toBeUndefined();
      expect(silentRes.body.token).not.toBeNull();
    });
  });
});
