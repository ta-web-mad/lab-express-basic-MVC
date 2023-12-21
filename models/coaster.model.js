const mongoose = require('mongoose')
const Schema = mongoose.Schema

const coasterSchema = new Schema({
    title: {
        type: String,
        required: [true, 'It must have a title']
    },
    description: {
        type: String,
    },
    length: {
        type: Number,
        required: [true, 'It must have a length']
    },
    inversion: {
        type: Number,
    },
    imageURL: {
        type: String,
    }
})

const Coaster = mongoose.model('coaster', coasterSchema)

module.exports = Coaster