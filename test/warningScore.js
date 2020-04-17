const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe } = require("mocha");
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('warning score test', () => {

    let doctorId, token, patientId, warningScoreId;

    before(done => {

        doctorId = null;
        token = null;
        patientId = null;
        warningScoreId = null;

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

    it('Create patient', done => {

        chai
            .request('http://localhost:8000')
            .post(`/api/patient`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                assignedDoctor: "5e891894e06fcb1851f31ac9",
                firstName: "Pero",
                lastName: "Peric",
                dateOfBirth: "03.05.1995.",
                sex: "M",
                address: "Neka random ulica",
                contact: 12345678908634,
                drugAllergy: true,
                smoking: true,
                coronaryHeartDisease: true,
                heartArrhythmia: true,
                heartFailure: true,
                lungDisease: true,
                asthma: true,
                chronicKidneyDisease: true,
                diabetes: true,
                heartStroke: true,
                malignantDisease: true,
                chronicLiverDisease: true,
                inflamatoryBowelDisease: true,
                reuma: true,
                hiv: true,
                medications: [
                    "wrG"
                ],
                operations: [
                    "wrG"
                ]
            })
            .end((err, res) => {

                expect(err).to.be.null;
                res.should.have.status(201);

                patientId = res.body._id;

                const testResponse = {
                    _id: { type: 'string' },
                    assignedDoctor: { type: 'string', value: "5e891894e06fcb1851f31ac9"},
                    firstName: { type: 'string', value: "Pero" },
                    lastName: { type: 'string', value: "Peric" },
                    dateOfBirth: { type: 'string', value: "1995-03-04T23:00:00.000Z" },
                    sex: { type: 'string', value: "M" },
                    address: { type: 'string', value: "Neka random ulica" },
                    contact: { type: 'string', value: '12345678908634' },
                    drugAllergy: { type: 'boolean', value: true },
                    smoking: { type: 'boolean', value: true },
                    coronaryHeartDisease: { type: 'boolean', value: true },
                    heartArrhythmia: { type: 'boolean', value: true },
                    heartFailure: { type: 'boolean', value: true },
                    lungDisease: { type: 'boolean', value: true },
                    asthma: { type: 'boolean',value:  true },
                    chronicKidneyDisease: { type: 'boolean', value: true },
                    diabetes: { type: 'boolean', value: true },
                    heartStroke: { type: 'boolean', value: true },
                    malignantDisease: { type: 'boolean', value: true },
                    chronicLiverDisease: { type: 'boolean', value: true },
                    inflamatoryBowelDisease: { type: 'boolean', value: true },
                    reuma: { type: 'boolean', value: true },
                    hiv: { type: 'boolean', value: true },
                    medications: { type: 'array' },
                    operations: { type: 'array' }
                };

                for( const [key, { type, value }] of Object.entries(testResponse) ) {

                    res.body.should.have.property(key);
                    res.body[key].should.be.a(type);

                    if(value !== undefined)
                        expect(res.body[key]).to.equal(value);
                }

                done();
            });
    });

    it('Create warning score', done => {

        chai
            .request('http://localhost:8000')
            .post(`/api/warning-score/patient/${patientId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                years: 30,
                numberOfRespirations: 30,
                oxygenSaturation: 30,
                anyAdditionalO2: true,
                onRespirator: true,
                systolicPressure: 30,
                heartRate: 15,
                stateOfConsciousness: "Confused",
                bodyTemperature: 39.1
            })
            .end((err, res) => {

                expect(err).to.be.null;
                res.should.have.status(201);

                res.body.should.have.property('warningScores');
                res.body['warningScores'].should.be.a('array');

                warningScoreId = res.body['warningScores'].pop()._id;

                done();
            });
    });

    it('Get warning score', done => {

        chai
            .request('http://localhost:8000')
            .get(`/api/warning-score/${warningScoreId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {

                expect(err).to.be.null;
                res.should.have.status(200);

                const responseTest = {
                    _id: { type: 'string' },
                    score: { type: 'number', value: 4 },
                    years: { type: 'number', value: 30 },
                    numberOfRespirations: { type: 'number', value: 30 },
                    oxygenSaturation: { type: 'number', value: 30 },
                    anyAdditionalO2: { type: 'boolean', value: true },
                    onRespirator: { type: 'boolean', value: true },
                    systolicPressure: { type: 'number', value: 30 },
                    heartRate: { type: 'number', value: 15 },
                    stateOfConsciousness: { type: 'string', value: 'Confused' },
                    bodyTemperature: { type: 'number', value: 39.1 },
                    timestamp: { type: 'string' },
                };


                for(const [key, { type, value }] of Object.entries(responseTest)) {

                    res.body.should.have.property(key);
                    res.body[key].should.be.a(type);

                    if(value !== undefined)
                        expect(res.body[key]).to.equal(value);
                }

                done();
            });
    });

    it('Update warning score', done => {

        chai
            .request('http://localhost:8000')
            .put(`/api/warning-score/${warningScoreId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                years: 30,
                numberOfRespirations: 30,
                oxygenSaturation: 30,
                anyAdditionalO2: false,
                onRespirator: true,
                systolicPressure: 30,
                heartRate: 15,
                stateOfConsciousness: "Normal",
                bodyTemperature: 35
            })
            .end((err, res) => {

                expect(err).to.be.null;
                res.should.have.status(200);

                const responseTest = {
                    _id: { type: 'string' },
                    score: { type: 'number', value: 4 },
                    years: { type: 'number', value: 30 },
                    numberOfRespirations: { type: 'number', value: 30 },
                    oxygenSaturation: { type: 'number', value: 30 },
                    anyAdditionalO2: { type: 'boolean', value: false },
                    onRespirator: { type: 'boolean', value: true },
                    systolicPressure: { type: 'number', value: 30 },
                    heartRate: { type: 'number', value: 15 },
                    stateOfConsciousness: { type: 'string', value: 'Normal' },
                    bodyTemperature: { type: 'number', value: 35 },
                    timestamp: { type: 'string' },
                };


                for(const [key, { type, value }] of Object.entries(responseTest)) {

                    res.body.should.have.property(key);
                    res.body[key].should.be.a(type);

                    if(value !== undefined)
                        expect(res.body[key]).to.equal(value);
                }

                done();
            });
    });

    it('Delete warning score', done => {

        chai
            .request('http://localhost:8000')
            .delete(`/api/warning-score/${warningScoreId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {

                expect(err).to.be.null;
                res.should.have.status(204);

                done();
            });
    });

    it('Delete patient', done => {

        chai
            .request('http://localhost:8000')
            .delete(`/api/patient/${patientId}`)
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