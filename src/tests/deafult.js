import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { statusCodes } from '../utils/statuscode';

const { expect } = chai;


chai.use(chaiHttp);

const url = '/balderdash';


describe('Test for index route', () => {
  describe('GET request to home page', () => {
    it('It should return the page', async () => {
      const res = await chai.request(app)
        .get('/api');
      expect(res.status).to.equal(statusCodes.success);
    });
  });
  it('It should return page not found', async () => {
    const res = await chai.request(app)
      .get(url);
      expect(res.status).to.equal(statusCodes.notFound);
  });
});



