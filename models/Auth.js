const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
    },
    client_id: {
        type: String,
    },
    type: {
        type: String,
    },
});

module.exports = model('Auth', schema);