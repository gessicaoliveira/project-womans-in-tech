const mongoose = require('mongoose');

const WomanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type:String,
        required: true
    },
    tinybio: {
        type:String,
        required: true
    },
    quote: {
        type:String,
        required: true
    }
});

module.exports = mongoose.model('woman', WomanSchema);