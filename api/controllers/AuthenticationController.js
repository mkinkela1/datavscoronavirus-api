const jwt      = require('jsonwebtoken');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const {TOKEN_SECRET_KEY, TOKEN_LIFE, REFRESH_TOKEN_SECRET_KEY, REFRESH_TOKEN_LIFE, RESET_PASSWORD_TOKEN_SECRET_KEY, RESET_PASSWORD_TOKEN_LIFE} = process.env;

const Doctor = require('./../models/doctor');
const Mailer = require('./../services/ForgotPassword');
const TokenBlacklist = require('./../models/tokenBlacklist');
const Mongoose = require("mongoose");

const { RefreshToken } = require("../services/refreshToken");
const RefreshTokenService = new RefreshToken();

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
                user   : user,
                err
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.status(500).json(err);
            }

            const token = jwt.sign(user.toJSON(), TOKEN_SECRET_KEY, { expiresIn: TOKEN_LIFE });
            const refreshToken = jwt.sign(user.toJSON(), REFRESH_TOKEN_SECRET_KEY, { expiresIn: REFRESH_TOKEN_LIFE });

            RefreshTokenService.addToken(refreshToken, user);

            return res.status(201).json({
                user,
                token: {
                    token,
                    refreshToken
                }
            });
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

                const data = {
                    _id: r._id,
                    firstName: r.firstName,
                    lastName: r.lastName
                };

                const resetPasswordToken = jwt.sign(data, RESET_PASSWORD_TOKEN_SECRET_KEY, { expiresIn: RESET_PASSWORD_TOKEN_LIFE });

                Doctor
                    .findOneAndUpdate(
                        { email },
                        { resetPasswordToken },
                        { returnOriginal: false, new: true, upsert: true }
                    ).then(doctor => {

                        Mailer
                            .sendEmail(email, resetPasswordToken)
                            .then(() => res.status(201).json(r));
                    });
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
exports.resetPassword = (req, res, next) => {

    const { resetPasswordToken, newPassword } = req.body;

    Doctor
        .findOne({ resetPasswordToken })
        .then(doctor => {
            if(doctor === null)
                return res.status(404).json('Doctor not found');

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newPassword, salt, (e, hash) => {

                    if(e)
                        return res.status(500).json(e);
                    else {

                        Doctor
                            .findOneAndUpdate(
                                { _id: doctor._id },
                                { password: hash, resetPasswordToken: null },
                                { returnOriginal: false, new: true, upsert: true }
                            )
                            .then(r => res.status(200).json(r))
                            .catch(e => res.status(500).json(e));
                    }
                })
            });

        })
        .catch(e => res.status(500).json(e));
};

/**
 * Refresh tokens
 *
 * @param req
 * @param res
 * @param next
 */
exports.refreshToken = (req, res, next) => {

    let { refreshToken } = req.body;

    const user = RefreshTokenService.validateToken(refreshToken);

    if(user) {

        RefreshTokenService.removeToken(refreshToken);

        const token = jwt.sign(user.toJSON(), TOKEN_SECRET_KEY, { expiresIn: TOKEN_LIFE });
        refreshToken = jwt.sign(user.toJSON(), REFRESH_TOKEN_SECRET_KEY, { expiresIn: REFRESH_TOKEN_LIFE });

        RefreshTokenService.addToken(refreshToken, user);

        return res.status(201).json({
            user,
            token: {
                token,
                refreshToken
            }
        });
    } else {

        return res.status(401).json('Refresh token not valid');
    }

};

/**
 * Store tokens that are not expired to blacklist
 *
 * @param req
 * @param res
 * @param next
 */
exports.logout = (req, res, next) => {

    const { token, refreshToken } = req.body;

    let tokenList = [];
    if(token)
        tokenList.push({ _id: new Mongoose.Types.ObjectId(), token });
    if(refreshToken)
        tokenList.push({ _id: new Mongoose.Types.ObjectId(), token: refreshToken });

    TokenBlacklist
        .create(tokenList)
        .then(r => res.status(201).json(r))
        .catch(e => res.status(500).json(e));
};