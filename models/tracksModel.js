const mongoose = require('mongoose');


const trackSchema = new mongoose.Schema({
    title: String,
    duration: Number,
    listenings: Number,
    likes: Number,
    featuring: [String]
});

module.exports = mongoose.model('Track', trackSchema);