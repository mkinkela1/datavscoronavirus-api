const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe } = require("mocha");
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Patient relevant data test', () => {

    let doctorId, token, patientId, patientRelevantDataId;

    before(done => {

        doctorId = null;
        token = null;
        patientId = null;
        patientRelevantDataId = null;

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

    it('Create patient relevant data', done => {

        chai
            .request('http://localhost:8000')
            .post(`/api/patient-relevant-data/patient/${patientId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                travelToRiskCountriesInTheLast14Days: true,
                contactInTheLast14DaysWithAPersonWhoHasSymptoms: true,
                haveYouBeenInContactWithPeopleWhoHaveTheCoronaVirusInTheLast14Days: true,
                haveYouEverBeenToAHealthCareFacilityWhereTheDiseaseHasBeenDiagnosedWithANewCoronavirus: true,
                didYouGoForAExaminationSomewhere: true,
                symptoms: [
                    "headache"
                ],
                symptomsDuration: 5,
                highTemperature: true,
                shaking: true,
                lossOfAppetite: true,
                exhaustion: true,
                muscleAchesAndPains: true,
                boneOrJointPain: true,
                cough: true,
                expectoration: true,
                shortnessOfBreath: true,
                choking: true,
                fatigue: true,
                chestPressure: true,
                chestPain: true,
                sneezing: true,
                nasalCongestion: true,
                secretionFromTheNose: true,
                bleedingFromTheNose: true,
                eyesPain: true,
                redEyes: true,
                throatProblems: true,
                throatSecretion: true,
                headache: true,
                abdominalPain: true,
                nausea: true,
                vomit: true,
                diarrhea: true,
                backPain: true,
                urinaryProblems: true,
                rash: true,
                enlargedLymphNodes: true,
                neuroInterferences: true,
                increasedBloodPressure: true,
                positiveToCoronavirus: true,
                curedOfCoronavirus: true
            })
            .end((err, res) => {

                expect(err).to.be.null;
                res.should.have.status(201);

                const patientRelevantData = res.body.patientRelevantData[0];
                patientRelevantDataId = patientRelevantData._id;

                const testResponse = {
                    travelToRiskCountriesInTheLast14Days: { type: 'boolean', value: true },
                    contactInTheLast14DaysWithAPersonWhoHasSymptoms: { type: 'boolean', value: true },
                    haveYouBeenInContactWithPeopleWhoHaveTheCoronaVirusInTheLast14Days: { type: 'boolean', value: true },
                    haveYouEverBeenToAHealthCareFacilityWhereTheDiseaseHasBeenDiagnosedWithANewCoronavirus: { type: 'boolean', value: true },
                    didYouGoForAExaminationSomewhere: { type: 'boolean', value: true },
                    symptoms: { type: 'array' },
                    symptomsDuration: { type: 'number', value: 5 },
                    highTemperature: { type: 'boolean', value: true },
                    shaking: { type: 'boolean', value: true },
                    lossOfAppetite: { type: 'boolean', value: true },
                    exhaustion: { type: 'boolean', value: true },
                    muscleAchesAndPains: { type: 'boolean', value: true },
                    boneOrJointPain: { type: 'boolean', value: true },
                    cough: { type: 'boolean', value: true },
                    expectoration: { type: 'boolean', value: true },
                    shortnessOfBreath: { type: 'boolean', value: true },
                    choking: { type: 'boolean', value: true },
                    fatigue: { type: 'boolean', value: true },
                    chestPressure: { type: 'boolean', value: true },
                    chestPain: { type: 'boolean', value: true },
                    sneezing: { type: 'boolean', value: true },
                    nasalCongestion: { type: 'boolean', value: true },
                    secretionFromTheNose: { type: 'boolean', value: true },
                    bleedingFromTheNose: { type: 'boolean', value: true },
                    eyesPain: { type: 'boolean', value: true },
                    redEyes: { type: 'boolean', value: true },
                    throatProblems: { type: 'boolean', value: true },
                    throatSecretion: { type: 'boolean', value: true },
                    headache: { type: 'boolean', value: true },
                    abdominalPain: { type: 'boolean', value: true },
                    nausea: { type: 'boolean', value: true },
                    vomit: { type: 'boolean', value: true },
                    diarrhea: { type: 'boolean', value: true },
                    backPain: { type: 'boolean', value: true },
                    urinaryProblems: { type: 'boolean', value: true },
                    rash: { type: 'boolean', value: true },
                    enlargedLymphNodes: { type: 'boolean', value: true },
                    neuroInterferences: { type: 'boolean', value: true },
                    increasedBloodPressure: { type: 'boolean', value: true },
                    positiveToCoronavirus: { type: 'boolean', value: true },
                    curedOfCoronavirus: { type: 'boolean', value: true }
                };

                for( const [key, { type, value }] of Object.entries(testResponse) ) {

                    patientRelevantData.should.have.property(key);
                    patientRelevantData[key].should.be.a(type);

                    if(value !== undefined)
                        expect(patientRelevantData[key]).to.equal(value);
                }

                done();
            });
    });

    it('Get patient\'s all relevant data', done => {

        chai
            .request('http://localhost:8000')
            .get(`/api/patient-relevant-data/patient/${patientId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {

                expect(err).to.be.null;
                res.should.have.status(200);

                res.body.should.be.a('array');

                done();
            });
    });

    it('Get patient relevant data by id', done => {

        chai
            .request('http://localhost:8000')
            .get(`/api/patient-relevant-data/${patientRelevantDataId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {

                expect(err).to.be.null;
                res.should.have.status(200);

                done();
            });
    });

    it('Delete patient relevant data', done => {

        chai
            .request('http://localhost:8000')
            .delete(`/api/patient-relevant-data/${patientRelevantDataId}`)
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