const { Schema, model } = require('mongoose')

const coasterSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    },
    length: {
        type: Number,
    },
    inversions: {
        type: Number,
    },
    imageUrl: {
        type: String,
    },
});

const Coaster = model('coaster', coasterSchema)

module.exports = Coaster