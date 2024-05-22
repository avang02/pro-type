const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typetestSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    quote: {type: String, required: true},
    wordcount: {type: Number, required: true},
    charcount: {type: Number, required: true},
    wpm: {type: Number, required: true},
    accuracy: {type: Number, required: true},
    points: {type: Number, required: true},
  }, {
    timestamps: true
})

module.exports = mongoose.model('TypeTest', typetestSchema);