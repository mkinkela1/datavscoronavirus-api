const jwt      = require('jsonwebtoken');
const passport = require('passport');

const secretKey = process.env.SECRET_KEY;

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
                res.status(500).send(err);
            }

            const token = jwt.sign(user.toJSON(), secretKey, {
                expiresIn: 604800
            });

            return res.status(201).json({user, token});
        });
    })(req, res);
};