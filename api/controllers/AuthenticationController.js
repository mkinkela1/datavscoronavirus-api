const jwt      = require('jsonwebtoken');
const passport = require('passport');

const secretKey = process.env.SECRET_KEY;

const Doctor = require('./../models/doctor');
const Mailer = require('./../services/ForgotPassword');

/**
 * User authentication
 *
 * @param req
 * @param res
 * @param next
 */
exports.auth = (req, res, next) => {

    passport.authenticate('login', {session: false}, (err, user, info) => {

        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user   : user
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.status(500).json(err);
            }

            const token = jwt.sign(user.toJSON(), secretKey, {
                expiresIn: 604800
            });

            return res.status(201).json({user, token});
        });
    })(req, res);
};

/**
 * Forgot password
 *
 * @param req
 * @param res
 * @param next
 */
exports.forgotPassword = (req, res, next) => {

    const { email } = req.body;

    Doctor
        .findOne({ email })
        .then(r => {

            if(r === null)
                res.status(404).json('Not found');
            else {

                Mailer
                    .sendEmail()
                    .then(() => res.status(201).json(r));
            }
        })
        .catch(e => res.status(500).json(e));
};

/**
 * Reset password
 *
 * @param req
 * @param res
 * @param next
 */
exports.resetPassword = (req, res, next) => {};