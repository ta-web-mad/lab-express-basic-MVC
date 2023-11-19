const { Schema, model } = require('mongoose')

const coasterSquema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    length: {
        type: Number
    },
    inversions: {
        type: Number
    },
    imageUrl: {
        type: String
    }
})

const Coaster = model('coaster', coasterSquema)

module.exports = Coaster