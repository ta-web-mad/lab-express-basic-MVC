const mongoose = require('mongoose')

const coasterSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    length: { type: Number },
    inversions: { type: Number },
    imageUrl: { type: String },
})

const Coaster = mongoose.model('coaster', coasterSchema)

module.exports = Coaster