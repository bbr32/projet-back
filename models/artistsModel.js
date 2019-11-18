const mongoose = require('mongoose');


const artistSchema = new mongoose.Schema({
    name: String,
    birth: String,
    followers: Number,
    albums: [String]
});

module.exports = mongoose.model('Artist', artistSchema);