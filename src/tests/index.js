import chai from 'chai';
import fs from 'fs';
import chaiHttp from 'chai-http';
import app from '../app';


const { expect } = chai;


chai.use(chaiHttp);

describe('Test for ENTRY endpoint', () => {
        it('should return 200 when the home route is visited', async() => {
            const res = await chai.request(app)
                .get('/')
                expect(res.status).to.equal(200);
                console.log('RES',res.body.data)
        })

        //anoter GET test
        it('should return 201 and create user with multiple image upload', async() => {
            const res = await chai.request(app)
                .post('/users')
                .set('content-type', 'multipart/form-data')
                .field('email', 'busybody@gmail.com')
                .field('firstname', 'busy')
                .field('lastname', 'body')
                .attach('image', fs.readFileSync(`${__dirname}/file.png`), 'tests/file.png')
                .attach('image', fs.readFileSync(`${__dirname}/chris1.pdf`), 'tests/chris1.pdf')
                expect(res.status).to.equal(201);
                console.log('RES2', res.body.data)
        })
})