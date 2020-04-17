const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe } = require("mocha");
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Auth test', () => {

    let doctorId, token, refreshToken;

    before(done => {

        doctorId = null;
        token = null;
        refreshToken = null;

        done();
    });

    it('Create a new doctor', done => {

        chai
            .request('http://localhost:8000')
            .post('/api/doctor')
            .send({
                email: "mocha_test@test.com",
                password: "password",
                firstName: "Test",
                lastName: "Account",
                cityOrRegion: "Zagreb",
                country: "Croatia"
            })
            .end((err, res) => {

                const { _id } = res.body;
                doctorId = _id;

                expect(err).to.be.null;
                res.should.have.status(201);

                const testResponse = {
                    _id: 'string',
                    email: 'string',
                    password: 'string',
                    firstName: 'string',
                    lastName: 'string',
                    cityOrRegion: 'string',
                    country: 'string'
                };

                for( const [key, type] of Object.entries(testResponse) ) {

                    res.body.should.have.property(key);
                    res.body[key].should.be.a(type);
                }

                done();
            });
    });

    it('Authenticate', done => {

        chai
            .request('http://localhost:8000')
            .post(`/api/auth/login`)
            .send({
                email: "mocha_test@test.com",
                password: "password"
            })
            .end((err, res) => {

                expect(err).to.be.null;
                res.should.have.status(201);

                res.body.should.have.property('token');

                token = res.body.token.token;
                refreshToken = res.body.token.refreshToken;

                done();
            });
    });

    it('Get all doctors', done => {

        chai
            .request('http://localhost:8000')
            .get(`/api/doctor`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {

                expect(err).to.be.null;
                res.should.have.status(200);

                for(const [_, doctor] of Object.entries(res.body)) {

                    const testResponse = {
                        _id: 'string',
                        email: 'string',
                        password: 'string',
                        firstName: 'string',
                        lastName: 'string',
                        cityOrRegion: 'string',
                        country: 'string'
                    };

                    for( const [key, type] of Object.entries(testResponse) ) {

                        doctor.should.have.property(key);
                        doctor[key].should.be.a(type);
                    }
                }

                done();
            });
    });

    it('Refresh token', done => {

        chai
            .request('http://localhost:8000')
            .post(`/api/auth/refresh-token`)
            .send({
                refreshToken: refreshToken
            })
            .end((err, res) => {

                expect(err).to.be.null;
                res.should.have.status(201);

                res.body.should.have.property('token');

                token = res.body.token.token;
                refreshToken = res.body.token.refreshToken;

                done();
            });
    });

    it('Get all doctors', done => {

        chai
            .request('http://localhost:8000')
            .get(`/api/doctor`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {

                expect(err).to.be.null;
                res.should.have.status(200);

                for(const [_, doctor] of Object.entries(res.body)) {

                    const testResponse = {
                        _id: 'string',
                        email: 'string',
                        password: 'string',
                        firstName: 'string',
                        lastName: 'string',
                        cityOrRegion: 'string',
                        country: 'string'
                    };

                    for( const [key, type] of Object.entries(testResponse) ) {

                        doctor.should.have.property(key);
                        doctor[key].should.be.a(type);
                    }
                }

                done();
            });
    });

    it('Delete doctor', done => {

        chai
            .request('http://localhost:8000')
            .delete(`/api/doctor/${doctorId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {

                //expect(err).to.be.null;
                res.should.have.status(204);

                done();
            });

    });
});