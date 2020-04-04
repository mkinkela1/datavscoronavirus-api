const User = require('../models/doctor');
const Mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const saltRounds = process.env.SALT_ROUNDS;

/**
 * @swagger
 * /doctor:
 *  post:
 *      summary: Create a new doctor
 *      tags:
 *          - Doctors
 *      parameters:
 *          - name: body
 *            in: body
 *            required: true
 *            schema:
 *              type: object
 *              required:
 *                  - email
 *                  - password
 *                  - firstName
 *                  - lastName
 *              properties:
 *                  email:
 *                      type: string
 *                      example: example@gmail.com
 *                  password:
 *                      type: string
 *                      example: password
 *                  firstName:
 *                      type: string
 *                      example: Pero
 *                  lastName:
 *                      type: string
 *                      example: Peric
 *                  cityOrRegion:
 *                      type: string
 *                      example: Zagreb
 *                  hospitalName:
 *                      type: string
 *                      example: KBC Rebro
 *                  country:
 *                      type: string
 *                      example: Croatia
 *      responses:
 *          201:
 *              description: User created
 *              schema:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                          example: 5e88faa643b9c63d5312e672
 *                      email:
 *                          type: string
 *                          example: example@gmail.com
 *                      password:
 *                          type: string
 *                          example: password
 *                      firstName:
 *                          type: string
 *                          example: Pero
 *                      lastName:
 *                          type: string
 *                          example: Peric
 *                      cityOrRegion:
 *                          type: string
 *                          example: Zagreb
 *                      hospitalName:
 *                          type: string
 *                          example: KBC Rebro
 *                      country:
 *                          type: string
 *                          example: Croatia
 * @param req
 * @param res
 * @param next
 */
exports.createDoctor = (req, res, next) => {

    const { firstName, lastName, email, password, cityOrRegion, hospitalName, country } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (e, hash) => {

            if(e)
                return res.status(500).json(e);
            else {

                const user = new User({
                    _id: new Mongoose.Types.ObjectId(),
                    firstName,
                    lastName,
                    email,
                    password: hash,
                    cityOrRegion,
                    hospitalName,
                    country
                });

                user
                    .save()
                    .then(r => res.status(201).json(r))
                    .catch(e => res.status(500).json(e))
            }
        })
    });

};