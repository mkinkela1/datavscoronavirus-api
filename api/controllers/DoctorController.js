const Doctor = require('../models/doctor');
const Mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Mailer = require('../services/AccountCredentials');

/**
 * Create a new doctor
 *
 * @param req
 * @param res
 * @param next
 */
exports.createDoctor = (req, res, next) => {

    const { firstName, lastName, email, password, cityOrRegion, hospital, country } = req.body;

    Doctor
        .findOne({ email })
        .exec()
        .then(r => {

            if(r && r._id)
                res.status(409).json('Already exists');
            else {

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (e, hash) => {

                        if(e)
                            return res.status(500).json(e);
                        else {

                            const doctor = new Doctor({
                                _id: new Mongoose.Types.ObjectId(),
                                firstName,
                                lastName,
                                email,
                                password: hash,
                                cityOrRegion,
                                hospital,
                                country
                            });

                            doctor
                                .save()
                                .then(r => {

                                    Mailer
                                        .sendEmail(doctor, password)
                                        .then(() => res.status(201).json(r));
                                })
                                .catch(e => res.status(500).json(e))
                        }
                    })
                });
            }
        })
        .catch(e => res.status(500).json(e));
};

/**
 * Get doctor by Id
 *
 * @param req
 * @param res
 * @param next
 */
exports.getDoctorById = (req, res, next) => {

    const { doctorId } = req.params;

    Doctor
        .findOne({ _id: doctorId })
        .populate('hospital')
        .then(r => {
            res.status(200).json(r)
        })
        .catch(e => res.status(500).json(e));
};

/**
 * Get all doctors
 *
 * @param req
 * @param res
 * @param next
 */
exports.getDoctors = (req, res, next) => {

    Doctor
        .find({})
        .populate('hospital')
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e));
};

/**
 * Delete doctor
 *
 * @param req
 * @param res
 * @param next
 */
exports.deleteDoctor = (req, res, next) => {

    const { doctorId } = req.params;

    Doctor
        .findOneAndDelete({ _id: doctorId })
        .exec()
        .then(() => res.status(204).json())
        .catch(e => res.status(500).json(e));
};

/**
 * Edit doctor
 *
 * @param req
 * @param res
 * @param next
 */
exports.editDoctor = (req, res, next) => {

    const { doctorId } = req.params;
    const { body } = req;

    if(body['password'])
        delete body['password'];

    Doctor
        .findOneAndUpdate(
            { _id: doctorId },
            body,
            { returnOriginal: false, new: true, upsert: true }
        )
        .exec()
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e));
};