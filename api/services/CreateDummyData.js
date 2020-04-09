const Mongoose = require('mongoose');

const Patient = require('../models/patient');
const WarningScore = require('../models/warningScore');
const DummyData = require('./GetDummyData');
const CalculateScore = require('./CalculateScore');

exports.createDummyPatients = () => {

    for(let users = 0; users < 5; users++) {

        const patient = new Patient(DummyData.getDummyDataForPatients());

        patient
            .save()
            .then(r => {

                for(let warnings = 0; warnings < 50; warnings += 1) {
                    let body = DummyData.getDummyDataForWarningScore();
                    const score = CalculateScore(body);

                    body = {
                        _id: new Mongoose.Types.ObjectId(),
                        score,
                        ...body
                    };

                    const warningScore = new WarningScore(body);

                    warningScore.save(error => {

                        if(error) throw error;

                        Patient
                            .findOneAndUpdate(
                                {_id: r._id},
                                {$push: {warningScores: warningScore}},
                                {returnOriginal: false, new: true, upsert: true}
                            )
                            .populate('WarningScore')
                            .exec();

                    })
                }
            })
    }
};

require('make-runnable');