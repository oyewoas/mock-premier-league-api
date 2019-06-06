const env = require('../.env');
env.environment = 'test';
const User = require('../app/models/userModel');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const status = require('../app/helpers/statuses');
const messages = require('../app/helpers/messages');

chai.use(chaiHttp);
should;

    describe('User', () => {
        beforeEach((done) => {
            User.deleteOne({}, (err) => {
                done();
            });
        });
        /*
        * Test the /POST route
        */
        describe('POST /api/v1/user/signup', () => {
            it('should respond with a success message along with a single user that was added', (done) => {
                let user = {
                    first_name: 'samuel',
                    last_name: 'david',
                    email: 'david@email.com',
                    password: 'password'
                }
                chai.request(server)
                    .post('/api/v1/user/signup')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(status.ok);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql(messages.signUp.success);
                        res.body.data.should.have.property('token');
                        res.body.data.user.should.have.property('_id');
                        res.body.data.user.should.have.property('first_name');
                        res.body.data.user.should.have.property('last_name');
                        res.body.data.user.should.have.property('email');
                        res.body.data.user.should.have.property('date_created');
                        done();
                    });
            });
        });


        describe('POST /api/v1/user/signin', () => {
            it('should respond with a success message along with a signed in user', (done) => {
                let user = {
                    email: 'david@email.com',
                    password: 'password'
                }
                chai.request(server)
                    .post('/api/v1/user/signin')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(status.ok);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql(messages.signIn.success);
                        res.body.data.should.have.property('token');
                        done();
                    });
            });
        });
    })

