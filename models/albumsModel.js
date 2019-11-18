const mongoose = require('mongoose');


const albumSchema = new mongoose.Schema({
    title: String,
    year: Number,
    genre: String,
    tracks: [String]
});

module.exports = mongoose.model('Album', albumSchema);