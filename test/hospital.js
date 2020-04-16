const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe } = require("mocha");
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Hospital test', () => {

    let doctorId, token, hospitalId;

    before(done => {

        doctorId = null;
        token = null;
        hospitalId = null;

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
                hospitalName: "KBC Rebro",
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
                    hospitalName: 'string',
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
                res.body.token.should.be.a('string');

                token = res.body.token;

                done();
            });
    });

    it('Create a new hospital', done => {

        chai
            .request('http://localhost:8000')
            .post('/api/hospital')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "KBC Rebro",
                address: "Kišpatićeva ul. 12, 10000, Zagreb",
                numberOfBeds: 1800
            })
            .end((err, res) => {

                const { _id } = res.body;
                hospitalId = _id;

                expect(err).to.be.null;
                res.should.have.status(201);

                const testResponse = {
                    _id: { type: 'string' },
                    name: { type: 'string', value: 'KBC Rebro' },
                    address: { type: 'string', value: 'Kišpatićeva ul. 12, 10000, Zagreb' },
                    numberOfBeds: { type: 'number', value: 1800 },
                };

                for( const [key, {type, value}] of Object.entries(testResponse) ) {

                    res.body.should.have.property(key);
                    res.body[key].should.be.a(type);

                    if(value)
                        expect(res.body[key]).to.equal(value);
                }

                done();
            });
    });

    it('Get all hospitals', done => {

        chai
            .request('http://localhost:8000')
            .get(`/api/hospital`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {

                expect(err).to.be.null;
                res.should.have.status(200);

                done();
            });
    });

    it('Get all hospitals', done => {

        chai
            .request('http://localhost:8000')
            .get(`/api/hospital/${hospitalId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {

                expect(err).to.be.null;
                res.should.have.status(200);

                done();
            });
    });

    it('Delete hospital', done => {

        chai
            .request('http://localhost:8000')
            .delete(`/api/hospital/${hospitalId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {

                expect(err).to.be.null;
                res.should.have.status(204);

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