const {Schema, model} = require('mongoose');

const schema = new Schema({
    user_id: {
        type: String,
    },
    date:{
        type: String,
    },
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    index: {
        type: Number,
    },
});

module.exports = model('UserDayExercise', schema);