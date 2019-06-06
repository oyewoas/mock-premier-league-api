const env = require('../.env');
env.environment = 'test';
const Fixture = require('../app/models/fixtureModel');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const status = require('../app/helpers/statuses');
const messages = require('../app/helpers/messages');

chai.use(chaiHttp);
should;

describe('Fixture', () => {
    before((done) => {
        Fixture.deleteOne({}, (err) => {
            done();
        });
    });
    /*
    * Test the /POST route
    */
    describe('POST /api/v1/fixture/add', () => {

        it('should require authorization', (done) => {
            let fixture = {
                home_team: "Sevilla",
                away_team: "Liverpool",
                match_date: "12-06-2019",
                match_week: 1,
                match_time: "13:00",
                match_stadium: "Wembley"
            }
            chai.request(server)
                .post('/api/v1/fixture/add')
                .send(fixture)
                .end((err, res) => {
                    res.should.have.status(status.unauthorized);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Please specify an authorization header');
                    done();
                });
        });
    });


    describe('PUT /api/v1/fixture/update/:slug', () => {
        it('It should not be found because there is no authorization', (done) => {
            let fixture = {
                home_team: "Sevilla",
                away_team: "Liverpool",
                match_date: "12-06-2019",
                match_week: 1,
                match_time: "13:00",
                match_stadium: "Wembley"
            }
            chai.request(server)
                .post('/api/v1/fixture/update/:slug')
                .send(fixture)
                .end((err, res) => {
                    res.should.have.status(status.notfound);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('DELETE /api/v1/fixture/delete/:slug', () => {
        it('It should not be found because there is no authorization', (done) => {
            chai.request(server)
                .delete('/api/v1/fixture/delete/:slug')
                .end((err, res) => {
                    res.should.have.status(status.unauthorized);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('GET /api/v1/fixture/edit/:slug', () => {
        it('It should not be found because there is no authorization', (done) => {
            chai.request(server)
                .delete('/api/v1/fixture/edit/:slug')
                .end((err, res) => {
                    res.should.have.status(status.notfound);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });


})




