const env = require('../.env');
env.environment = 'test';
const Team = require('../app/models/teamModel');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const status = require('../app/helpers/statuses');
const messages = require('../app/helpers/messages');

chai.use(chaiHttp);
should;

describe('Team', () => {
    before((done) => {
        Team.deleteOne({}, (err) => {
            done();
        });
    });
    /*
    * Test the /POST route
    */
    describe('POST /api/v1/team/add', () => {

        it('should require authorization', (done) => {
            let team = {
                team_name: "Team Name",
                manager: "Ole Gunnar Solskjær",
                website: "http://www.teamweb.com/",
                stadium: "Old Trafford"
            }
            chai.request(server)
                .post('/api/v1/team/add')
                .send(team)
                .end((err, res) => {
                    res.should.have.status(status.unauthorized);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Please specify an authorization header');
                    done();
                });
        });
    });


    describe('PUT /api/v1/team/update/:slug', () => {
        it('It should not be found because there is no authorization', (done) => {
            let team = {
                team_name: "Team Name",
                manager: "Team Manager",
                website: "http://www.teamweb.com/",
                stadium: "Old Trafford"
            }
            chai.request(server)
                .post('/api/v1/fixture/team/:slug')
                .send(team)
                .end((err, res) => {
                    res.should.have.status(status.notfound);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('DELETE /api/v1/team/delete/:slug', () => {
        it('It should not be found because there is no authorization', (done) => {
            chai.request(server)
                .delete('/api/v1/team/delete/:slug')
                .end((err, res) => {
                    res.should.have.status(status.unauthorized);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('GET /api/v1/team/edit/:slug', () => {
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




