const jwt      = require('jsonwebtoken');
const passport = require('passport');

const secretKey = process.env.SECRET_KEY;
/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: Authenticate user
 *      tags:
 *          - Auth
 *      parameters:
 *          - name: body
 *            in: body
 *            required: true
 *            schema:
 *              type: object
 *              required:
 *                  - email
 *                  - password
 *              properties:
 *                  email:
 *                      type: string
 *                      example: example@gmail.com
 *                  password:
 *                      type: string
 *                      example: password
 *      responses:
 *          400:
 *              description: Error
 *              schema:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: Incorrect email or password.
 *                      user:
 *                          example: false
 *
 *
 * @param req
 * @param res
 * @param next
 */
exports.auth = (req, res, next) => {

    passport.authenticate('login', {session: false}, (err, user, info) => {
        console.log(err);
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