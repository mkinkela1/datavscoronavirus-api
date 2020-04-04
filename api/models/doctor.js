const mongoose = require('mongoose');

const validateEmail = (email) => {

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};

const doctorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: { type: String, required: true },
    cityOrRegion: { type: String, required: false },
    hospitalName: { type: String, required: false },
    country: { type: String, required: false }
});

module.exports = mongoose.model('Doctor', doctorSchema);