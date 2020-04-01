const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    quantity: {
        type: Number,
    },
});

module.exports = model('CommonExercise', schema);