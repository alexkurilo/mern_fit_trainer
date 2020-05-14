const {Schema, model} = require('mongoose');

const schema = new Schema({
    user_id: {
        type: String,
    },
    date:{
        type: String,
    },
    exercises: [{
        type: String,
    }],

});

module.exports = model('UserDayPlans', schema);