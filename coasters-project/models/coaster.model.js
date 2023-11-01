const mongoose = require('mongoose')

const coasterSchema = mongoose.Schema({
    title: String,
    description: String,
    length: Number,
    inversions: Number,
    imageUrl: String
})

const Coaster = mongoose.model('coaster', coasterSchema)

module.exports = Coaster