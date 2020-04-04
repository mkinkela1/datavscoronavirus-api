const passport    = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;

const DoctorModel = require('./api/models/doctor');
const secretKey = process.env.SECRET_KEY;

const bcrypt = require('bcryptjs');

passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, cb) {

        //Assume there is a DB module pproviding a global UserModel
        return DoctorModel
            .findOne({
                email
            })
            .then(user => {

                if (!user || !bcrypt.compareSync(password, user.password)) {
                    return cb(null, false, {message: 'Incorrect email or password.'});
                }

                return cb(null, user, {
                    message: 'Logged In Successfully'
                });
            })
            .catch(err => {
                return cb(err);
            });
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : secretKey
    },
    function (jwtPayload, cb) {

        //find the user in db if needed
        return DoctorModel
            .findOne(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));