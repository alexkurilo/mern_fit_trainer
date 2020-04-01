const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    img: {
        type: String,
    },
});

module.exports = model('User', schema);