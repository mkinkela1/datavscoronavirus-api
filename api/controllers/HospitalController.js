const Hospital = require('../models/hospital');
const Mongoose = require('mongoose');

/**
 * Create hospital
 *
 * @param req
 * @param res
 * @param next
 */
exports.createHospital = (req, res, next) => {

    const { name, address, numberOfBeds } = req.body;

    const hospital = new Hospital({
        _id: new Mongoose.Types.ObjectId(),
        name,
        address,
        numberOfBeds
    });

    hospital
        .save()
        .then(r => res.status(201).json(r))
        .catch(e => res.status(500).json(e));
};

/**
 * Get hospital data by id
 *
 * @param req
 * @param res
 * @param next
 */
exports.getHospitalById = (req, res, next) => {

    const { hospitalId } = req.params;

    Hospital
        .findOne({ _id: hospitalId })
        .exec()
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e));
};

/**
 * Get all hospitals
 *
 * @param req
 * @param res
 * @param next
 */
exports.getAllHospitals = (req, res, next) => {

    Hospital
        .find({})
        .exec()
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e));
};

/**
 * Update hospital
 *
 * @param req
 * @param res
 * @param next
 */
exports.updateHospital = (req, res, next) => {

    const { hospitalId } = req.params;
    const { name, address, numberOfBeds } = req.body;

    let updateOps = {};
    if(name) updateOps['name'] = name;
    if(address) updateOps['address'] = address;
    if(numberOfBeds) updateOps['numberOfBeds'] = numberOfBeds;

    Hospital
        .findOneAndUpdate(
            { _id: hospitalId },
            updateOps,
            { returnOriginal: false, new: true, upsert: true }
        )
        .exec()
        .then(r => res.status(200).json(r))
        .catch(e => res.status(500).json(e));
}

/**
 * Delete hospital
 *
 * @param req
 * @param res
 * @param next
 */
exports.deleteHospital = (req, res, next) => {

    const { hospitalId } = req.params;

    Hospital
        .deleteOne({ _id: hospitalId })
        .exec()
        .then(() => res.status(204).json())
        .catch(e => res.status(500).json(e));
}