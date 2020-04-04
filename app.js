const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerDoc = require('./swaggerDoc');
const cors = require('cors');
const passport = require('passport');

app.use(cors());

require('dotenv').config();
require('./passport');

swaggerDoc(app);

const mongoDbString = process.env.DATABASE_URL;

mongoose.connect(
    mongoDbString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method==='OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }

    next();
});

/*
* import routers here
*/

const doctor = require('./api/routes/DoctorRoutes');
const auth = require('./api/routes/AuthRoutes');

app.use('/api/doctor', doctor);
app.use('/api/auth', auth);

app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;