const mongoose = require('mongoose');

const tokenBlacklist = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    token: { type: String, required: true }
});

module.exports = mongoose.model('TokenBlacklist', tokenBlacklist);