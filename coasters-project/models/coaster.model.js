const { Schema, model } = require('mongoose')

const coasterSchema = new Schema({
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

const Coaster = model('Coaster', coasterSchema)

module.exports = Coaster