const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('Patient test', () => {

    let patientId;

    before(done => {
        patientId = null;
    });
});