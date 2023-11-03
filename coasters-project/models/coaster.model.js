const { Schema, model } = require('mongoose')

const coasterSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    inversions: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
})

const Coaster = model('coaster', coasterSchema)

module.exports = Coaster
