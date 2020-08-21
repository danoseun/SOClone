import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

const { expect } = chai;


chai.use(chaiHttp);

const url = '/api/signup';
const loginUrl = '/api/login';

describe('Test for user route', () => {
    describe('Test for signup API', () => {
      it('Should return 201 status code and create new user', async () => {
        const res = await chai.request(app)
          .post(url)
          .send(validRegisterData[0]);
        expect(res.status).to.equal(201);
        //expect(res.body.data).to.be.a('object');
      });

      it('Should return 201 status code and create another user', async () => {
        const res = await chai.request(app)
          .post(url)
          .send(validRegisterData[1]);
        res.should.have.status(201);
        expect(res.status).to.equal(201);
      });
  
    
      it('should return status code 400 and send error message for undefined/empty email', async () => {
        const res = await chai
          .request(app)
          .post(url)
          .send(inValidRegisterData[0]);
        expect(res.status).to.equal(400);
        //expect(res.body.error).to.be.an('object');
      });

      it('should return status code 400 and send error message for spaced email', async () => {
        const res = await chai
          .request(app)
          .post(url)
          .send(inValidRegisterData[1]);
          expect(res.status).to.equal(400);
      });

      it('should return status code 400 and send error message for invalid email format', async () => {
        const res = await chai
          .request(app)
          .post(url)
          .send(inValidRegisterData[2]);
        expect(res.status).to.equal(400);
        expect(res.body.error).to.be.an('object');
      });
      it('should return status code 409 and send error message for existing email', async () => {
        const res = await chai
          .request(app)
          .post(url)
          .send(inValidRegisterData[3]);
          expect(res.status).to.equal(400);
      });
    });
  
    describe('Test for login API', () => {
      it('Should return 200 status code and log user in when correctdetails are supplied', async () => {
        const res = await chai.request(app)
          .post(loginUrl)
          .send(validRegisterData[0]);
        expect(res.body.status).to.equal(200);
        expect(res.body.data).to.be.a('object');
      });
      
      it('Should return 401 status code and error message when email is not found in the db', async () => {
        const res = await chai.request(app)
          .post(loginUrl)
          .send(inValidLoginData[1]);
        expect(res.status).to.equal(401);
        //expect(res.body.error).to.equal('Authentication failed');
      });

      it('Should return 400 status code and error message when correct email is supplied but password is empty/undefined', async () => {
        const res = await chai.request(app)
          .post(loginUrl)
          .send(inValidLoginData[2]);
        expect(res.status).to.equal(400);
        //expect(res.body.error).to.be.an('object');
      });
    });
  });