import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { validRegisterData, inValidRegisterData, inValidLoginData } from './mockdata';
import dataGenerator from './mock';
import { User } from '../models'
import { statusCodes } from '../utils/statuscode';
import { deleteAllData } from './model';

const { expect } = chai;


chai.use(chaiHttp);

const url = '/api/signup';
const loginUrl = '/api/login';

//autogenerate
const validUser = dataGenerator(['firstname', 'lastname', 'email', 'password', 'username']);
//console.log('VALID', validUser);

let token;

describe('Test for user route', () => {

    before(() => {
        // runs before all tests in this file regardless where this line is defined.
        deleteAllData(User);
    });

    describe('Test for signup API', () => {
      it('Should return 201 status code and create new user', async () => {
        const res = await chai.request(app)
          .post(url)
          .send(validRegisterData[0]);
        expect(res.status).to.equal(statusCodes.created);
        expect(res.body.data).to.be.a('object');
        expect(res.body.data).to.have.property('username');
      });

      it('Should return 201 status code and create another user', async () => {
        const res = await chai.request(app)
          .post(url)
          .send(validRegisterData[1]);
          expect(res.status).to.equal(statusCodes.created);
          expect(res.body.data).to.be.a('object');
          expect(res.body.data).to.have.property('username');
      });
  
    
      it('should return status code 400 and send error message for undefined/empty email', async () => {
        const res = await chai
          .request(app)
          .post(url)
          .send(inValidRegisterData[0]);
        expect(res.status).to.equal(statusCodes.badRequest);
        expect(res.body.error).to.be.an('object');
      });

      it('should return status code 400 and send error message for missing username', async () => {
        const res = await chai
          .request(app)
          .post(url)
          .send(inValidRegisterData[1]);
          expect(res.status).to.equal(statusCodes.badRequest);
          expect(res.body.error).to.be.an('object');
      });

      it('should return status code 409 and send error message for existing email address', async () => {
        const res = await chai
          .request(app)
          .post(url)
          .send(inValidRegisterData[2]);
        expect(res.status).to.equal(statusCodes.conflict);
        expect(res.body).to.have.property('error');
      });
    });
  
    describe('Test for login API', () => {
      it('Should return 200 status code and log user in when correct details are supplied', async () => {
        const { username, password } = validRegisterData[0];
        const res = await chai.request(app)
          .post(loginUrl)
          .send({username, password});
        expect(res.status).to.equal(statusCodes.success);
        expect(res.body).to.have.property('data');
        token = res.body.data;
      });
      
      it('Should return 401 status code and error message when email is not found in the db', async () => {
        const res = await chai.request(app)
          .post(loginUrl)
          .send(inValidLoginData[0]);
        expect(res.status).to.equal(statusCodes.badRequest);
      });

      it('Should return 400 status code and error message when correct email is supplied but password is empty/undefined', async () => {
        const res = await chai.request(app)
          .post(loginUrl)
          .send(inValidLoginData[1]);
        expect(res.status).to.equal(statusCodes.badRequest);
      });
    });

    describe('Test for GET /users?username=value API', () => {
        it('Should return 200 status code for like username search', async () => {
            const username = 'iknagod';
          const res = await chai.request(app)
            .get(`/api/users?username=${username}`)
            .set('authorization', token)
          expect(res.status).to.equal(statusCodes.success);
          expect(res.body.data).to.be.a('array');
        });

        it('Should return 404 status code for non-existent like username search', async () => {
            const username = 'koriko';
          const res = await chai.request(app)
            .get(`/api/users?username=${username}`)
            .set('authorization', token)
          expect(res.status).to.equal(statusCodes.notFound);
        });

        it('Should return 403 status code when user with no token tries to access endpoint', async () => {
            const username = 'iknagod';
          const res = await chai.request(app)
            .get(`/api/users?username=${username}`)
          expect(res.status).to.equal(statusCodes.forbidden);
        });
      });
  });

  