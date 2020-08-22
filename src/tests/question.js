import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { validRegisterData, validQuestionData, inValidQuestionData, answerData } from './mockdata';
import dataGenerator from './mock';
import { Question } from '../models'
import { statusCodes } from '../utils/statuscode';
import { deleteAllData } from './model';

const { expect } = chai;


chai.use(chaiHttp);

const questionBaseURL = '/api/questions';


let token;
let anotherToken;
let questionIdOne;
let questionIdTwo;

describe('Test for Question route', () => {

    before(async () => {
        // runs before all tests in this file regardless where this line is defined.
        await deleteAllData(Question);
    });
  
    describe('Test for login API', () => {
      it('Should return 200 status code and log user in when correct details are supplied to access protected routes', async () => {
        const { username, password } = validRegisterData[0];
        const res = await chai.request(app)
          .post('/api/login')
          .send({username, password});
        expect(res.status).to.equal(statusCodes.success);
        expect(res.body).to.have.property('data');
        token = res.body.data;
      });

      it('Should return 200 status code and log another user in when correct details are supplied to access protected routes', async () => {
        const { username, password } = validRegisterData[1];
        const res = await chai.request(app)
          .post('/api/login')
          .send({username, password});
        expect(res.status).to.equal(statusCodes.success);
        expect(res.body).to.have.property('data');
        anotherToken = res.body.data;
      });
    });

    //POST /questions
    describe('Test POST /questions', () => {
        it('Should return status code of 403 and not allow user without token post question', async() => {
            const res = await chai
          .request(app)
          .post(questionBaseURL)
          .send(validQuestionData[0]);
          expect(res.status).to.equal(statusCodes.forbidden);
          expect(res.body).to.have.property('error');
        })

        it('Should return 201 and create question for user', async () => {
            const res = await chai.request(app)
            .post(questionBaseURL)
            .set('authorization', token)
            .send(validQuestionData[0]);
          expect(res.status).to.equal(statusCodes.created);
          questionIdOne = res.body.data._id;
        });

        it('Should return 201 and create question for user', async () => {
            const res = await chai.request(app)
            .post(questionBaseURL)
            .set('authorization', token)
            .send(validQuestionData[1]);
          expect(res.status).to.equal(statusCodes.created);
          questionIdTwo = res.body.data._id;
        });

        it('When user enters a question without title it should return 400 status code and not create question for the user', async () => {
            const res = await chai.request(app)
            .post(questionBaseURL)
            .set('authorization', token)
            .send(inValidQuestionData[0]);
          expect(res.status).to.equal(statusCodes.badRequest);
        });

        it('When user enters a question without text body it should return 400 status code and not create question for the user', async () => {
            const res = await chai.request(app)
            .post(questionBaseURL)
            .set('authorization', token)
            .send(inValidQuestionData[1]);
          expect(res.status).to.equal(statusCodes.badRequest);
        });
    })

    //GET /questions
    describe('Test GET /questions', () => {
        it('Should return 200 and fetch all questions in the db', async () => {
            const res = await chai.request(app)
            .get(questionBaseURL)
          expect(res.status).to.equal(statusCodes.success);
        });

        it('Should return 200 and get questions by available title', async () => {
            const value = 'question';
            const res = await chai.request(app)
            .get(`/api/questions?title=${value}`)
          expect(res.status).to.equal(statusCodes.success);
          expect(res.body.data).to.be.a('array');
        });

        it('Should return 404 and an error message stating that the search value is non-existent', async () => {
            const value = 'qwerbcf';
            const res = await chai.request(app)
            .get(`/api/questions?title=${value}`)
          expect(res.status).to.equal(statusCodes.notFound);
          expect(res.body).to.have.property('message');
        });
    })

    // POST /questions/:id/answers
    describe('Test POST /questions/:id/answers', () => {
        it('Should return 201 and post answer to a question', async () => {
            const res = await chai.request(app)
            .post(`/api/questions/${questionIdOne}/answers`)
            .set('authorization', token)
            .send(answerData[0]);
          expect(res.status).to.equal(statusCodes.created);
          expect(res.body.data).to.be.an('object');
        });

        it('Should return 201 and post answer to a question', async () => {
            const res = await chai.request(app)
            .post(`/api/questions/${questionIdTwo}/answers`)
            .set('authorization', token)
            .send(answerData[1]);
          expect(res.status).to.equal(statusCodes.created);
          expect(res.body.data).to.be.an('object');
        });

        it('Should return 400 and not post answer with an empty text', async () => {
            const res = await chai.request(app)
            .post(`/api/questions/${questionIdTwo}/answers`)
            .set('authorization', token)
            .send(answerData[2]);
          expect(res.status).to.equal(statusCodes.badRequest);
          expect(res.body).to.have.property('error');
        });
    })

    describe('TEST FOR VOTING ENDPOINTS', () => {
        it('should return 201 and upvote question', async() => {
            const res = await chai.request(app)
            .post(`/api/questions/${questionIdOne}/upvotes`)
            .set('authorization', anotherToken)
          expect(res.status).to.equal(statusCodes.created);
          expect(res.body.data).to.be.an('object');
        })

        it('should return 200 and downvote question', async() => {
            const res = await chai.request(app)
            .post(`/api/questions/${questionIdOne}/downvotes`)
            .set('authorization', anotherToken)
          expect(res.status).to.equal(statusCodes.success);
          expect(res.body.data).to.be.an('object');
        })

        it('should return 400 and not downvote a question the user is yet to upvote', async() => {
            const res = await chai.request(app)
            .post(`/api/questions/${questionIdTwo}/downvotes`)
            .set('authorization', anotherToken)
          expect(res.status).to.equal(statusCodes.badRequest);
          expect(res.body).to.have.a.property('error');
        })
    })
  });