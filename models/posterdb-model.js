const mongoose = require('mongoose');
// const moment = require('moment-timezone');
const posterDbSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },


}, { timestamps: true });


const PosterDbModel = mongoose.model('filesDbReceived', posterDbSchema);

module.exports = PosterDbModel;