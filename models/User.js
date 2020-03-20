const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    fitPlans: [{
        type: Types.ObjectId,
        ref: 'Plan'
    }]
});

module.exports = model('User', schema);