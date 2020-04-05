const jwt      = require('jsonwebtoken');
const passport = require('passport');

const secretKey = process.env.SECRET_KEY;
/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      summary: Authenticate doctor
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
 *          201:
 *              description: User authenticated
 *              schema:
 *                  type: object
 *                  properties:
 *                      user:
 *                          type: object
 *                          properties:
 *                              _id:
 *                                  type: string
 *                                  example: 5e88faa643b9c63d5312e672
 *                              email:
 *                                  type: string
 *                                  example: example@gmail.com
 *                              password:
 *                                  type: string
 *                                  example: password
 *                              firstName:
 *                                  type: string
 *                                  example: Pero
 *                              lastName:
 *                                  type: string
 *                                  example: Peric
 *                              cityOrRegion:
 *                                  type: string
 *                                  example: Zagreb
 *                              hospitalName:
 *                                  type: string
 *                                  example: KBC Rebro
 *                              country:
 *                                  type: string
 *                                  example: Croatia
 *                      token:
 *                          type: string
 *                          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTg5MTg5NGUwNmZjYjE4NTFmMzFhYzkiLCJmaXJzdE5hbWUiOiJQZXJvIiwibGFzdE5hbWUiOiJQZXJpYyIsImVtYWlsIjoiZXhhbXBsZUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRNSGZ1WWZURy9ObEpteUZGeDdBVzJ1TU16NHpYNFpSQ3pEOGRqNlpGUEhIUHhTbEZydVhXbSIsImNpdHlPclJlZ2lvbiI6IlphZ3JlYiIsImhvc3BpdGFsTmFtZSI6IktCQyBSZWJybyIsImNvdW50cnkiOiJDcm9hdGlhIiwiX192IjowLCJpYXQiOjE1ODYwNDMxMDIsImV4cCI6MTU4NjY0NzkwMn0.1GZGm-s1YlbQi4FDHutY4xP71BC5XP48gVSY9q0xGH8
 *
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