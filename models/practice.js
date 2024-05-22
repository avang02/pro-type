const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const practiceSchema = new Schema({
    level: {type: Number, default: 1},
    wpm: {type: Number, default: 0},
    accuracy: {type: Number, default: 0},
}, {
    timestamps: true
});

module.exports = mongoose.model('Practice', practiceSchema);